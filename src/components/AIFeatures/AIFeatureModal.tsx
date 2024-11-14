import React, { useState } from 'react';
import { Brain, Sparkles } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { generateChatCompletion } from '../../services/openai';
import LoadingSpinner from '../LoadingSpinner';

interface AIFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    title: string;
    type: 'analysis' | 'generation' | 'optimization' | 'recommendation';
    description: string;
  };
}

const AIFeatureModal: React.FC<AIFeatureModalProps> = ({
  isOpen,
  onClose,
  feature
}) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let prompt = '';
      switch (feature.type) {
        case 'analysis':
          prompt = `Analyze the following educational content and provide detailed feedback: ${input}`;
          break;
        case 'generation':
          prompt = `Generate educational content for the following topic: ${input}`;
          break;
        case 'optimization':
          prompt = `Optimize the following educational plan: ${input}`;
          break;
        case 'recommendation':
          prompt = `Provide personalized learning recommendations for: ${input}`;
          break;
      }

      const response = await generateChatCompletion(
        'You are an expert educational AI assistant. Respond in Greek.',
        prompt,
        { temperature: 0.7 }
      );

      if (response) {
        setResult(response);
      }
    } catch (error) {
      console.error('AI Feature Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      );
    }

    if (result) {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-cyber-dark-700/50 rounded-lg border border-neon-primary/20">
            <pre className="whitespace-pre-wrap text-gray-300">{result}</pre>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setResult(null)}>
              Νέα Ανάλυση
            </Button>
            <Button onClick={onClose}>
              Κλείσιμο
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {feature.type === 'analysis' && (
          <Select
            label="Τύπος Ανάλυσης"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            options={[
              { value: 'performance', label: 'Επίδοση' },
              { value: 'behavior', label: 'Συμπεριφορά' },
              { value: 'progress', label: 'Πρόοδος' },
              { value: 'skills', label: 'Δεξιότητες' }
            ]}
          />
        )}

        {feature.type === 'generation' && (
          <Select
            label="Τύπος Περιεχομένου"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            options={[
              { value: 'lesson', label: 'Μάθημα' },
              { value: 'exercise', label: 'Άσκηση' },
              { value: 'test', label: 'Διαγώνισμα' },
              { value: 'notes', label: 'Σημειώσεις' }
            ]}
          />
        )}

        <Input
          label="Περιγραφή"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Περιγράψτε τι θέλετε να αναλύσει το AI..."
          isTextArea
        />

        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Ακύρωση
          </Button>
          <Button onClick={handleSubmit} disabled={!input.trim() || loading}>
            <Brain className="w-4 h-4 mr-2" />
            Έναρξη
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={feature.title}
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-cyber-dark-700 rounded-lg">
            <Sparkles className="w-6 h-6 text-neon-primary" />
          </div>
          <p className="text-gray-300">{feature.description}</p>
        </div>

        {renderContent()}
      </div>
    </Modal>
  );
};

export default AIFeatureModal;