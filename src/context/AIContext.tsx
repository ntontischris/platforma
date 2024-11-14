import React, { createContext, useContext, ReactNode } from 'react';
import { useAI } from '../hooks/useAI';

const AIContext = createContext<ReturnType<typeof useAI> | null>(null);

export function useAIContext() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAIContext must be used within an AIProvider');
  }
  return context;
}

interface AIProviderProps {
  children: ReactNode;
}

export function AIProvider({ children }: AIProviderProps) {
  const ai = useAI();

  return (
    <AIContext.Provider value={ai}>
      {children}
    </AIContext.Provider>
  );
}