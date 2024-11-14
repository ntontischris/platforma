import React, { useState } from 'react';
import { FileText, Brain } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import { aiService } from '../../../services/aiService';
import LoadingSpinner from '../../LoadingSpinner';

const ContentGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [type, setType] = useState('notes');
  const [content, setContent] = useState<any>(null);

  const generateContent = async () => {
    setLoading(true);
    try {
      const result = await aiService.generateEducationalContent(topic, type);
      setContent(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">AI Δημιουργία Εκπαιδευτικού Υλικού</h3>
      </div>

      {!content ? (
        <div className="space-y-4">
          <Input
            label="Θέμα"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="π.χ. Η Γαλλική Επανάσταση"
          />
          <Select
            label="Τύπος Υλικού"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={[
              { value: 'notes', label: 'Σημειώσεις' },
              { value: 'presentation', label: 'Παρουσίαση' },
              { value: 'worksheet', label: 'Φύλλο Εργασίας' },
              { value: 'quiz', label: 'Κουίζ' }
            ]}
          />
          <Button onClick={generateContent} disabled={loading || !topic}>
            {loading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <FileText className="w-4 h-4 mr-2" />
            )}
            Δημιουργία Υλικού
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3">Παραγόμενο Υλικό</h4>
            {type === 'notes' && (
              <div className="prose prose-sm max-w-none">
                {content.sections.map((section: any, i: number) => (
                  <div key={i} className="mb-4">
                    <h5 className="font-medium">{section.title}</h5>
                    <p className="text-sm text-gray-600">{section.content}</p>
                  </div>
                ))}
              </div>
            )}
            {type === 'quiz' && (
              <div className="space-y-4">
                {content.questions.map((q: any, i: number) => (
                  <div key={i} className="p-3 bg-white rounded-lg">
                    <div className="font-medium">{q.question}</div>
                    <div className="mt-2 space-y-1">
                      {q.options.map((opt: string, j: number) => (
                        <div key={j} className="text-sm">
                          {String.fromCharCode(65 + j)}. {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setContent(null)}>
              Νέο Υλικό
            </Button>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Λήψη
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ContentGenerator;