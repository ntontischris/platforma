import React, { useState } from 'react';
import { Brain, CheckCircle, AlertTriangle, Edit2, Save } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Assignment } from '../../services/assignmentService';
import { assignmentService } from '../../services/assignmentService';
import LoadingSpinner from '../LoadingSpinner';

interface Props {
  assignment: Assignment;
  onGradingComplete: (result: any) => void;
}

const AssignmentGrader: React.FC<Props> = ({ assignment, onGradingComplete }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedResult, setEditedResult] = useState<any>(null);
  const [userNotes, setUserNotes] = useState('');

  const handleGrade = async () => {
    setLoading(true);
    try {
      const gradingResult = await assignmentService.gradeAssignment(assignment);
      setResult(gradingResult);
      setEditedResult(gradingResult);
      onGradingComplete(gradingResult);
    } catch (error) {
      console.error('Error grading assignment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdits = () => {
    setResult({
      ...editedResult,
      userNotes,
      lastModified: new Date(),
      modifiedByUser: true
    });
    setIsEditing(false);
    onGradingComplete({
      ...editedResult,
      userNotes,
      lastModified: new Date(),
      modifiedByUser: true
    });
  };

  const handleGradeChange = (newGrade: number) => {
    setEditedResult({
      ...editedResult,
      grade: Math.max(0, Math.min(10, newGrade))
    });
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">AI Αξιολόγηση Εργασίας</h3>
        </div>
        {!result && (
          <Button onClick={handleGrade} disabled={loading}>
            {loading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <CheckCircle className="w-4 h-4 mr-2" />
            )}
            Αξιολόγηση
          </Button>
        )}
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Βαθμός</h4>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedResult.grade}
                    onChange={(e) => handleGradeChange(parseFloat(e.target.value))}
                    min="0"
                    max="10"
                    step="0.1"
                    className="w-20"
                  />
                ) : (
                  <div className="text-2xl font-bold text-blue-600">
                    {result.grade.toFixed(1)}
                  </div>
                )}
              </div>
              {result.modifiedByUser && (
                <div className="text-xs text-gray-500 mt-1">
                  Τροποποιήθηκε: {result.lastModified.toLocaleString()}
                </div>
              )}
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">Κατάσταση</h4>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Αξιολογήθηκε</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Δυνατά Σημεία</h4>
            <div className="space-y-1">
              {(isEditing ? editedResult : result).strengths.map((strength: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  {isEditing ? (
                    <Input
                      value={strength}
                      onChange={(e) => {
                        const newStrengths = [...editedResult.strengths];
                        newStrengths[index] = e.target.value;
                        setEditedResult({ ...editedResult, strengths: newStrengths });
                      }}
                    />
                  ) : (
                    <span>{strength}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Προτάσεις Βελτίωσης</h4>
            <div className="space-y-1">
              {(isEditing ? editedResult : result).improvements.map((improvement: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 text-yellow-600">
                  <AlertTriangle className="w-4 h-4" />
                  {isEditing ? (
                    <Input
                      value={improvement}
                      onChange={(e) => {
                        const newImprovements = [...editedResult.improvements];
                        newImprovements[index] = e.target.value;
                        setEditedResult({ ...editedResult, improvements: newImprovements });
                      }}
                    />
                  ) : (
                    <span>{improvement}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Σχόλια Καθηγητή</h4>
            {isEditing ? (
              <Input
                isTextArea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Προσθέστε τα σχόλιά σας..."
              />
            ) : (
              <p className="text-gray-600 whitespace-pre-line">
                {result.userNotes || 'Δεν υπάρχουν σχόλια'}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Ακύρωση
                </Button>
                <Button onClick={handleSaveEdits}>
                  <Save className="w-4 h-4 mr-2" />
                  Αποθήκευση
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Επεξεργασία
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default AssignmentGrader;