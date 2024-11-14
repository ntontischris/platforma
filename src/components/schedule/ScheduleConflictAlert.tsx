import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Button from '../ui/Button';

interface Conflict {
  id: string;
  type: 'room' | 'teacher' | 'time';
  description: string;
  severity: 'high' | 'medium' | 'low';
  affectedEvents: string[];
}

const ScheduleConflictAlert = () => {
  const [conflicts, setConflicts] = React.useState<Conflict[]>([
    {
      id: '1',
      type: 'room',
      description: 'Αίθουσα 101 έχει διπλή κράτηση την Τρίτη στις 10:00',
      severity: 'high',
      affectedEvents: ['Μαθηματικά Β2', 'Φυσική Γ1']
    },
    {
      id: '2',
      type: 'teacher',
      description: 'Ο καθηγητής Γ. Παπαδόπουλος έχει επικάλυψη μαθημάτων την Τετάρτη',
      severity: 'medium',
      affectedEvents: ['Μαθηματικά Α1', 'Μαθηματικά Β1']
    }
  ]);

  const handleResolve = (conflictId: string) => {
    setConflicts(conflicts.filter(c => c.id !== conflictId));
  };

  const getSeverityColor = (severity: Conflict['severity']) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50 text-red-800';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'low':
        return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
          Συγκρούσεις Προγράμματος
        </h3>
        <span className="text-sm text-gray-500">
          {conflicts.length} {conflicts.length === 1 ? 'σύγκρουση' : 'συγκρούσεις'}
        </span>
      </div>

      <div className="space-y-4">
        {conflicts.map((conflict) => (
          <div
            key={conflict.id}
            className={`p-4 rounded-lg border ${getSeverityColor(conflict.severity)}`}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="font-medium">{conflict.description}</p>
                <div className="text-sm space-y-1">
                  <p className="font-medium">Επηρεαζόμενα μαθήματα:</p>
                  {conflict.affectedEvents.map((event, index) => (
                    <p key={index}>• {event}</p>
                  ))}
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleResolve(conflict.id)}
              >
                <X className="w-4 h-4 mr-2" />
                Επίλυση
              </Button>
            </div>
          </div>
        ))}

        {conflicts.length === 0 && (
          <div className="text-center p-4 bg-green-50 text-green-700 rounded-lg">
            Δεν υπάρχουν συγκρούσεις στο πρόγραμμα!
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleConflictAlert;