import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAINavigation = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState<string | null>(null);

  const navigateToFeature = useCallback((path: string) => {
    setCurrentFeature(path);
    navigate(path);
  }, [navigate]);

  const goBack = useCallback(() => {
    setCurrentFeature(null);
    navigate('/ai');
  }, [navigate]);

  return {
    currentFeature,
    navigateToFeature,
    goBack
  };
};