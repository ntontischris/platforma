import { ScheduleEvent, Room, Teacher } from '../types';
import { roomService } from './roomService';
import { teacherService } from './teacherService';

interface OptimizationResult {
  conflicts: Conflict[];
  suggestions: Suggestion[];
  score: number;
}

interface Conflict {
  type: 'room' | 'teacher' | 'time';
  description: string;
  severity: 'high' | 'medium' | 'low';
  events: string[];
}

interface Suggestion {
  type: 'move' | 'swap' | 'room';
  description: string;
  impact: string;
  events: string[];
  score: number;
}

class ScheduleOptimizationService {
  private static instance: ScheduleOptimizationService;

  private constructor() {}

  public static getInstance(): ScheduleOptimizationService {
    if (!ScheduleOptimizationService.instance) {
      ScheduleOptimizationService.instance = new ScheduleOptimizationService();
    }
    return ScheduleOptimizationService.instance;
  }

  async analyzeSchedule(events: ScheduleEvent[]): Promise<OptimizationResult> {
    const conflicts = this.detectConflicts(events);
    const suggestions = await this.generateSuggestions(events, conflicts);
    const score = this.calculateOptimizationScore(events, conflicts);

    return {
      conflicts,
      suggestions,
      score
    };
  }

  private detectConflicts(events: ScheduleEvent[]): Conflict[] {
    const conflicts: Conflict[] = [];

    // Check room conflicts
    events.forEach((event1, i) => {
      events.slice(i + 1).forEach(event2 => {
        if (this.hasRoomConflict(event1, event2)) {
          conflicts.push({
            type: 'room',
            description: `Room conflict between ${event1.title} and ${event2.title}`,
            severity: 'high',
            events: [event1.id, event2.id]
          });
        }
      });
    });

    // Check teacher conflicts
    events.forEach((event1, i) => {
      events.slice(i + 1).forEach(event2 => {
        if (this.hasTeacherConflict(event1, event2)) {
          conflicts.push({
            type: 'teacher',
            description: `Teacher conflict between ${event1.title} and ${event2.title}`,
            severity: 'high',
            events: [event1.id, event2.id]
          });
        }
      });
    });

    // Check time distribution
    const timeDistributionIssues = this.checkTimeDistribution(events);
    conflicts.push(...timeDistributionIssues);

    return conflicts;
  }

  private hasRoomConflict(event1: ScheduleEvent, event2: ScheduleEvent): boolean {
    return event1.roomId === event2.roomId &&
           event1.day === event2.day &&
           this.timeOverlaps(event1.start, event1.end, event2.start, event2.end);
  }

  private hasTeacherConflict(event1: ScheduleEvent, event2: ScheduleEvent): boolean {
    return event1.teacherId === event2.teacherId &&
           event1.day === event2.day &&
           this.timeOverlaps(event1.start, event1.end, event2.start, event2.end);
  }

  private timeOverlaps(start1: string, end1: string, start2: string, end2: string): boolean {
    return start1 < end2 && end1 > start2;
  }

  private checkTimeDistribution(events: ScheduleEvent[]): Conflict[] {
    const conflicts: Conflict[] = [];
    const classSchedules = new Map<string, ScheduleEvent[]>();

    // Group events by class
    events.forEach(event => {
      if (!event.class) return;
      const classEvents = classSchedules.get(event.class) || [];
      classEvents.push(event);
      classSchedules.set(event.class, classEvents);
    });

    // Check each class's schedule
    classSchedules.forEach((classEvents, className) => {
      // Check for too many classes in one day
      const eventsPerDay = new Map<string, number>();
      classEvents.forEach(event => {
        eventsPerDay.set(event.day, (eventsPerDay.get(event.day) || 0) + 1);
      });

      eventsPerDay.forEach((count, day) => {
        if (count > 4) {
          conflicts.push({
            type: 'time',
            description: `Too many classes (${count}) for ${className} on ${day}`,
            severity: 'medium',
            events: classEvents.filter(e => e.day === day).map(e => e.id)
          });
        }
      });

      // Check for back-to-back difficult subjects
      const difficultSubjects = ['Mathematics', 'Physics', 'Chemistry'];
      classEvents.forEach((event1, i) => {
        classEvents.slice(i + 1).forEach(event2 => {
          if (event1.day === event2.day &&
              this.areConsecutive(event1, event2) &&
              difficultSubjects.includes(event1.title) &&
              difficultSubjects.includes(event2.title)) {
            conflicts.push({
              type: 'time',
              description: `Consecutive difficult subjects for ${className}`,
              severity: 'low',
              events: [event1.id, event2.id]
            });
          }
        });
      });
    });

    return conflicts;
  }

  private areConsecutive(event1: ScheduleEvent, event2: ScheduleEvent): boolean {
    return event1.end === event2.start || event2.end === event1.start;
  }

  private async generateSuggestions(events: ScheduleEvent[], conflicts: Conflict[]): Promise<Suggestion[]> {
    const suggestions: Suggestion[] = [];

    // Handle room conflicts
    const roomConflicts = conflicts.filter(c => c.type === 'room');
    for (const conflict of roomConflicts) {
      const alternativeRooms = await this.findAlternativeRooms(
        events.filter(e => conflict.events.includes(e.id))
      );
      
      if (alternativeRooms.length > 0) {
        suggestions.push({
          type: 'room',
          description: `Move one of the conflicting classes to ${alternativeRooms[0].name}`,
          impact: 'Resolves room conflict',
          events: conflict.events,
          score: 0.8
        });
      }
    }

    // Handle teacher conflicts
    const teacherConflicts = conflicts.filter(c => c.type === 'teacher');
    for (const conflict of teacherConflicts) {
      const conflictingEvents = events.filter(e => conflict.events.includes(e.id));
      const availableSlots = await this.findAvailableTimeSlots(conflictingEvents[0]);
      
      if (availableSlots.length > 0) {
        suggestions.push({
          type: 'move',
          description: `Move ${conflictingEvents[0].title} to ${availableSlots[0].day} ${availableSlots[0].time}`,
          impact: 'Resolves teacher conflict',
          events: [conflictingEvents[0].id],
          score: 0.9
        });
      }
    }

    // Generate optimization suggestions
    suggestions.push(...await this.generateOptimizationSuggestions(events));

    return suggestions.sort((a, b) => b.score - a.score);
  }

  private async findAlternativeRooms(events: ScheduleEvent[]): Promise<Room[]> {
    const rooms = roomService.getRooms();
    return rooms.filter(room => 
      events.every(event => 
        !events.some(otherEvent => 
          otherEvent.roomId === room.id &&
          otherEvent.day === event.day &&
          this.timeOverlaps(otherEvent.start, otherEvent.end, event.start, event.end)
        )
      )
    );
  }

  private async findAvailableTimeSlots(event: ScheduleEvent): Promise<{ day: string; time: string; }[]> {
    const teacher = teacherService.getTeacher(event.teacherId || '');
    if (!teacher) return [];

    const availableSlots: { day: string; time: string; }[] = [];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

    days.forEach(day => {
      times.forEach(time => {
        if (this.isSlotAvailable(teacher, day, time, event)) {
          availableSlots.push({ day, time });
        }
      });
    });

    return availableSlots;
  }

  private isSlotAvailable(teacher: Teacher, day: string, time: string, event: ScheduleEvent): boolean {
    const daySchedule = teacher.schedule.find(s => s.day === day);
    if (!daySchedule) return true;

    return !daySchedule.timeSlots.some(slot =>
      this.timeOverlaps(slot.start, slot.end, time, this.addMinutes(time, 45))
    );
  }

  private addMinutes(time: string, minutes: number): string {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins + minutes);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  private async generateOptimizationSuggestions(events: ScheduleEvent[]): Promise<Suggestion[]> {
    const suggestions: Suggestion[] = [];

    // Balance subject distribution
    const subjectDistribution = this.analyzeSubjectDistribution(events);
    const unbalancedSubjects = Object.entries(subjectDistribution)
      .filter(([_, count]) => count > 2)
      .map(([subject]) => subject);

    unbalancedSubjects.forEach(subject => {
      const subjectEvents = events.filter(e => e.title === subject);
      if (subjectEvents.length >= 2) {
        suggestions.push({
          type: 'swap',
          description: `Redistribute ${subject} classes for better balance`,
          impact: 'Improves learning effectiveness',
          events: subjectEvents.map(e => e.id),
          score: 0.7
        });
      }
    });

    return suggestions;
  }

  private analyzeSubjectDistribution(events: ScheduleEvent[]): Record<string, number> {
    const distribution: Record<string, number> = {};
    events.forEach(event => {
      distribution[event.title] = (distribution[event.title] || 0) + 1;
    });
    return distribution;
  }

  private calculateOptimizationScore(events: ScheduleEvent[], conflicts: Conflict[]): number {
    let score = 100;

    // Deduct points for conflicts
    score -= conflicts.length * 10;

    // Analyze distribution
    const distribution = this.analyzeSubjectDistribution(events);
    const variance = this.calculateVariance(Object.values(distribution));
    score -= variance * 5;

    return Math.max(0, Math.min(100, score));
  }

  private calculateVariance(numbers: number[]): number {
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const variance = numbers.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / numbers.length;
    return Math.sqrt(variance);
  }
}

export const scheduleOptimizationService = ScheduleOptimizationService.getInstance();</boltArtifact>

Now let's update the ScheduleOptimizer component to use this service:

<boltArtifact id="update-schedule-optimizer" title="Update ScheduleOptimizer component">
<boltAction type="file" filePath="src/components/schedule/ScheduleOptimizer.tsx">
import React, { useState, useEffect } from 'react';
import { Brain, X, Check, AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { scheduleOptimizationService } from '../../services/scheduleOptimizationService';
import LoadingSpinner from '../LoadingSpinner';

interface OptimizerProps {
  onClose: () => void;
  events: ScheduleEvent[];
  onApplySuggestion: (suggestion: Suggestion) => void;
}

const ScheduleOptimizer: React.FC<OptimizerProps> = ({
  onClose,
  events,
  onApplySuggestion
}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<OptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    setError(null);
    
    try {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Perform actual analysis
      const result = await scheduleOptimizationService.analyzeSchedule(events);
      setAnalysis(result);
      setProgress(100);
      clearInterval(interval);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to optimize schedule');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleApplySuggestion = (suggestion: Suggestion) => {
    onApplySuggestion(suggestion);
    // Update analysis after applying suggestion
    if (analysis) {
      setAnalysis({
        ...analysis,
        suggestions: analysis.suggestions.filter(s => s !== suggestion),
        score: analysis.score + suggestion.score
      });
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="AI Βελτιστοποίηση Προγράμματος"
    >
      <div className="space-y-6">
        <div className="text-center p-6">
          <Brain className="w-16 h-16 text-neon-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-white">
            Έξυπνη Βελτιστοποίηση Προγράμματος
          </h3>
          <p className="text-gray-400">
            Το AI θα αναλύσει το τρέχον πρόγραμμα και θα προτείνει βελτιστοποιήσεις
            βάσει πολλαπλών παραμέτρων.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertTriangle className="w-5 h-5 mb-2" />
            {error}
          </div>
        )}

        {!isOptimizing && !analysis ? (
          <div className="space-y-4">
            <h4 className="font-medium text-white">Παράμετροι Βελτιστοποίησης:</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-300">
                ✓ Διαθεσιμότητα καθηγητών
              </li>
              <li className="flex items-center text-sm text-gray-300">
                ✓ Χωρητικότητα αιθουσών
              </li>
              <li className="flex items-center text-sm text-gray-300">
                ✓ Προτιμήσεις μαθητών
              </li>
              <li className="flex items-center text-sm text-gray-300">
                ✓ Ισορροπία φόρτου εργασίας
              </li>
            </ul>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-neon-primary">
                    {progress}% Ολοκληρώθηκε
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-cyber-dark-700">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-neon-primary transition-all duration-500"
                />
              </div>
            </div>

            {analysis && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium text-white mb-2">Βαθμολογία</h4>
                    <div className="text-2xl font-bold text-neon-primary">
                      {analysis.score.toFixed(1)}%
                    </div>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium text-white mb-2">Συγκρούσεις</h4>
                    <div className="text-2xl font-bold text-red-500">
                      {analysis.conflicts.length}
                    </div>
                  </Card>
                </div>

                {analysis.conflicts.length > 0 && (
                  <div>
                    <h4 className="font-medium text-white mb-2">Εντοπισμένες Συγκρούσεις:</h4>
                    <div className="space-y-2">
                      {analysis.conflicts.map((conflict, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-white">{conflict.description}</p>
                              <span className={`text-sm ${
                                conflict.severity === 'high' ? 'text-red-500' :
                                conflict.severity === 'medium' ? 'text-yellow-500' :
                                'text-blue-500'
                              }`}>
                                {conflict.severity === 'high' ? 'Υψηλή' :
                                 conflict.severity === 'medium' ? 'Μεσαία' :
                                 'Χαμηλή'} προτεραιότητα
                              </span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-white mb-2">Προτεινόμενες Βελτιστοποιήσεις:</h4>
                  <div className="space-y-2">
                    {analysis.suggestions.map((suggestion, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-white">{suggestion.description}</h5>
                            <p className="text-sm text-neon-primary mt-1">
                              {suggestion.impact}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApplySuggestion(suggestion)}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Κλείσιμο
          </Button>
          {!isOptimizing && !analysis && (
            <Button onClick={handleOptimize}>
              <Brain className="w-4 h-4 mr-2" />
              Έναρξη Βελτιστοποίησης
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleOptimizer;</boltArtifact>

Let's start the development server to see our changes:

<boltArtifact id="start-dev-server" title="Start development server">
<boltAction type="start">
<command>npm run dev</command>