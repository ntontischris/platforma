import React, { useState } from 'react';
import { Brain, MessageSquare, Sparkles, Send } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { generateChatCompletion } from '../../../services/openai';
import LoadingSpinner from '../../LoadingSpinner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ProsopikoBoitho = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await generateChatCompletion(
        'You are a helpful educational AI assistant. Respond in Greek and help students with their studies.',
        input,
        { temperature: 0.7 }
      );

      if (response) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Failed to get AI response:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-neon-primary" />
          <h3 className="text-lg font-semibold text-white">Προσωπικός Βοηθός</h3>
        </div>
        {loading && <Sparkles className="w-5 h-5 text-neon-primary animate-pulse" />}
      </div>

      <div className="h-[400px] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-cyber-dark-700/50 rounded-lg mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-neon-primary/10 ml-12 border border-neon-primary/20'
                    : 'bg-cyber-dark-600 mr-12 border border-neon-secondary/20'
                }`}
              >
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-cyber-dark-600 p-3 rounded-lg mr-12 border border-neon-secondary/20">
                <LoadingSpinner size="sm" />
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Πώς μπορώ να σε βοηθήσω;"
            disabled={loading}
          />
          <Button
            onClick={handleSend}
            disabled={loading || !input.trim()}
          >
            {loading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Αποστολή
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProsopikoBoitho;