import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useAINavigation } from '../../hooks/useAINavigation';
import Button from '../ui/Button';

interface AIFeatureLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AIFeatureLayout: React.FC<AIFeatureLayoutProps> = ({ 
  title, 
  description, 
  children 
}) => {
  const { goBack } = useAINavigation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button 
            variant="outline" 
            onClick={goBack}
            className="mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Πίσω
          </Button>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-gray-400 mt-1">{description}</p>
        </div>
      </div>

      <div className="neon-card p-6">
        {children}
      </div>
    </div>
  );
};

export default AIFeatureLayout;