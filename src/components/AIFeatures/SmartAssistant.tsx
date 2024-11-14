import React, { useState } from 'react';
import { Brain, MessageCircle, Lightbulb } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

const SmartAssistant = () => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState('');
  const [suggestions] = useState([
    'Πώς μπορώ να βελτιώσω την απόδοση των μαθητών;',
    'Δείξε μου στατιστικά παρακολούθησης',
    'Προτείνετε εκπαιδευτικό υλικό'
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResponse(`Επεξεργάζομαι το ερώτημά σας: "${query}"`);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Παρουσιάστηκε σφάλμα. Παρακαλώ δοκιμάστε ξανά.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="relative">
      <div className="flex items-center space-x-3 mb-4">
        <Brain className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">AI Βοηθός</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Πώς μπορώ να σας βοηθήσω;"
          disabled={isProcessing}
        />

        <Button type="submit" disabled={isProcessing || !query}>
          {isProcessing ? (
            <>
              <MessageCircle className="w-4 h-4 mr-2 animate-spin" />
              Επεξεργασία...
            </>
          ) : (
            <>
              <MessageCircle className="w-4 h-4 mr-2" />
              Αποστολή
            </>
          )}
        </Button>
      </form>

      {response && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">{response}</p>
        </div>
      )}

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
          <Lightbulb className="w-4 h-4 mr-1" />
          Προτάσεις
        </h4>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setQuery(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SmartAssistant;