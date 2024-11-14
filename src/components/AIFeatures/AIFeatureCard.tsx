import React from 'react';
import { Brain, Sparkles } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../LoadingSpinner';

interface AIFeatureCardProps {
  title: string;
  description: string;
  loading?: boolean;
  onAction?: () => void;
  actionText?: string;
  result?: any;
  children?: React.ReactNode;
}

const AIFeatureCard: React.FC<AIFeatureCardProps> = ({
  title,
  description,
  loading = false,
  onAction,
  actionText = 'Generate',
  result,
  children,
}) => {
  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-neon-primary" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>

      <p className="text-gray-300 mb-4">{description}</p>

      {!result ? (
        <div className="space-y-4">
          {children}
          {onAction && (
            <Button onClick={onAction} disabled={loading}>
              {loading ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              {actionText}
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {typeof result === 'string' ? (
            <p className="text-gray-300">{result}</p>
          ) : (
            <pre className="bg-cyber-dark-700 p-4 rounded-lg overflow-x-auto">
              <code className="text-gray-300">
                {JSON.stringify(result, null, 2)}
              </code>
            </pre>
          )}
          {onAction && (
            <Button variant="outline" onClick={onAction}>
              Try Again
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default AIFeatureCard;