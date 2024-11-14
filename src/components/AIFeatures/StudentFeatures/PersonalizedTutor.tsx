import React, { useState } from 'react';
import { Brain, MessageSquare } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { useAIFeatures } from '../../../hooks/useAIFeatures';
import LoadingSpinner from '../../LoadingSpinner';

const PersonalizedTutor = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<any[]>([]);
  const { loading, getFeedback } = useAIFeatures();

  const askQuestion = async () => {
    if (!question.trim()) return;

    const response = await getFeedback({ type: 'question', content: question }, {
      context: 'tutoring',
    });

    if (response) {
      setConversation([
        ...conversation,
        { type: 'question', content: question },
        { type: 'answer', content: response },
      ]);
      setQuestion('');
    }
  };

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-neon-primary" />
        <h3 className="text-lg font-semibold text-white">AI Προσωπικός Καθηγητής</h3>
      </div>

      <div className="space-y-4">
        <div className="h-96 overflow-y-auto space-y-4 p-4 bg-cyber-dark-700 rounded-lg">
          {conversation.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg ${
                msg.type === 'question'
                  ? 'bg-neon-primary/10 ml-12 border border-neon-primary/20'
                  : 'bg-cyber-dark-600 mr-12 border border-neon-secondary/20'
              }`}
            >
              <p className="text-sm text-gray-300">{msg.content}</p>
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ρώτησε οτιδήποτε..."
            onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
          />
          <Button onClick={askQuestion} disabled={loading || !question}>
            {loading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <MessageSquare className="w-4 h-4 mr-2" />
            )}
            Αποστολή
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PersonalizedTutor;