import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { communicationService } from '../../services/communicationService';
import LoadingSpinner from '../../components/LoadingSpinner';

const ParentUpdates = () => {
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [message, setMessage] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateUpdate = async () => {
    if (!selectedStudent) return;

    setLoading(true);
    setError(null);

    try {
      const update = await communicationService.generateParentUpdate(selectedStudent);
      setMessage(update);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate update');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <MessageSquare className="w-8 h-8 text-neon-primary" />
        <div>
          <h2 className="text-2xl font-bold text-white">Επικοινωνία Γονέων</h2>
          <p className="text-gray-400">
            AI-powered ενημερώσεις και επικοινωνία με γονείς
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Δημιουργία Ενημέρωσης</h3>
          <div className="space-y-4">
            <Select
              label="Επιλογή Μαθητή"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              options={[
                { value: '1', label: 'Γιώργος Παπαδόπουλος' },
                { value: '2', label: 'Μαρία Κωνσταντίνου' },
                { value: '3', label: 'Νίκος Δημητρίου' }
              ]}
            />

            <Button 
              onClick={handleGenerateUpdate} 
              disabled={loading || !selectedStudent}
              className="w-full"
            >
              {loading ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Δημιουργία Ενημέρωσης
            </Button>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </Card>

        {message && (
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Προεπισκόπηση</h3>
            <div className="space-y-4">
              <div className="p-4 bg-cyber-dark-700/50 rounded-lg border border-neon-primary/20">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-gray-400">Προς:</p>
                    <p className="text-white">Γονείς {message.studentName}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    message.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : message.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {message.priority === 'high' ? 'Υψηλή' : 
                     message.priority === 'medium' ? 'Μεσαία' : 
                     'Χαμηλή'} προτεραιότητα
                  </span>
                </div>
                <div className="whitespace-pre-wrap text-gray-300">
                  {message.content}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setMessage(null)}>
                  Επαναδημιουργία
                </Button>
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Αποστολή
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Ιστορικό Επικοινωνίας</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="p-4 bg-cyber-dark-700/50 rounded-lg border border-neon-primary/20"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-medium">Εβδομαδιαία Ενημέρωση</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Προς: Γονείς Μαθητή {i}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date().toLocaleDateString('el-GR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ParentUpdates;