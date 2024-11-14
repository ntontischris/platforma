import React, { useState } from 'react';
import { Calendar, Clock, Users, Brain, AlertTriangle, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { aiService } from '../services/aiService';
import ScheduleConflictAlert from '../components/schedule/ScheduleConflictAlert';
import ScheduleOptimizer from '../components/schedule/ScheduleOptimizer';
import RoomAllocation from '../components/schedule/RoomAllocation';
import TeacherAvailability from '../components/schedule/TeacherAvailability';
import WeeklySchedule from '../components/schedule/WeeklySchedule';
import ScheduleAnalytics from '../components/schedule/ScheduleAnalytics';
import ScheduleBuilder from '../components/schedule/ScheduleBuilder';

const Schedule = () => {
  const [selectedView, setSelectedView] = useState('week');
  const [showOptimizer, setShowOptimizer] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Έξυπνο Πρόγραμμα</h1>
          <p className="text-gray-600 mt-1">
            AI-Powered διαχείριση προγράμματος μαθημάτων
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            options={[
              { value: 'day', label: 'Ημερήσια' },
              { value: 'week', label: 'Εβδομαδιαία' },
              { value: 'month', label: 'Μηνιαία' }
            ]}
          />
          <Button onClick={() => setShowBuilder(true)}>
            <Calendar className="w-4 h-4 mr-2" />
            Νέο Πρόγραμμα
          </Button>
          <Button onClick={() => setShowOptimizer(true)}>
            <Brain className="w-4 h-4 mr-2" />
            AI Βελτιστοποίηση
          </Button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center space-x-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Βέλτιστη Κατανομή</p>
              <p className="text-2xl font-bold">95%</p>
              <p className="text-xs text-gray-400">Αποδοτικότητα χρήσης πόρων</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Συγκρούσεις</p>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-gray-400">Απαιτούν προσοχή</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Διαθέσιμοι Καθηγητές</p>
              <p className="text-2xl font-bold">15/18</p>
              <p className="text-xs text-gray-400">Τρέχουσα εβδομάδα</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Schedule Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl">
            <div className="p-6">
              <ScheduleBuilder />
            </div>
            <div className="border-t px-6 py-4 flex justify-end">
              <Button variant="outline" onClick={() => setShowBuilder(false)}>
                Κλείσιμο
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Schedule View */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <WeeklySchedule />
          </Card>
        </div>

        <div className="space-y-6">
          <TeacherAvailability />
          <RoomAllocation />
        </div>
      </div>

      {/* Analytics and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <ScheduleAnalytics />
        </Card>
        <Card>
          <ScheduleConflictAlert />
        </Card>
      </div>

      {/* AI Optimizer Modal */}
      {showOptimizer && (
        <ScheduleOptimizer onClose={() => setShowOptimizer(false)} />
      )}
    </div>
  );
};

export default Schedule;