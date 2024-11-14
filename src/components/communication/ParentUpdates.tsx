import React, { useState } from 'react';
import { Mail, Bell, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Message, communicationService } from '../../services/communicationService';
import LoadingSpinner from '../LoadingSpinner';

interface Props {
  studentId: string;
}

const ParentUpdates: React.FC<Props> = ({ studentId }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const generateUpdate = async () => {
    setLoading(true);
    try {
      const update = await communicationService.generateParentUpdate(studentId);
      setMessage(update);
    } catch (error) {
      console.error('Error generating update:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityIcon = (priority: Message['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Bell className="w-4 h-4 text-yellow-500" />;
      default:
        return <Mail className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">AI Ενημέρωση Γονέων</h3>
        </div>
        {!message && (
          <Button onClick={generateUpdate} disabled={loading}>
            {loading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            Δημιουργία Ενημέρωσης
          </Button>
        )}
      </div>

      {message && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getPriorityIcon(message.priority)}
              <span className="text-sm font-medium capitalize">
                {message.priority} Priority
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {message.createdAt.toLocaleDateString('el-GR')}
            </span>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <pre className="whitespace-pre-wrap font-sans text-gray-700">
              {message.content}
            </pre>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setMessage(null)}>
              Επαναδημιουργία
            </Button>
            <Button>
              <Mail className="w-4 h-4 mr-2" />
              Αποστολή
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ParentUpdates;