import React from 'react';
import { Brain } from 'lucide-react';
import AINavigation from './AINavigation';
import Card from '../ui/Card';

const AIFeaturesOverview = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <div className="p-4 bg-cyber-dark-700 rounded-lg">
          <Brain className="w-12 h-12 text-neon-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">AI Υπηρεσίες</h1>
          <p className="text-gray-400 mt-1">
            Προηγμένες AI λειτουργίες για εξατομικευμένη μάθηση
          </p>
        </div>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stats-card p-6">
            <h3 className="text-lg font-semibold mb-2">AI Αναλύσεις</h3>
            <p className="text-4xl font-bold text-neon-primary">2,458</p>
            <p className="text-sm text-gray-400 mt-2">Τελευταίες 24 ώρες</p>
          </div>
          <div className="stats-card p-6">
            <h3 className="text-lg font-semibold mb-2">Ακρίβεια</h3>
            <p className="text-4xl font-bold text-neon-secondary">98.5%</p>
            <p className="text-sm text-gray-400 mt-2">Μέσος όρος</p>
          </div>
          <div className="stats-card p-6">
            <h3 className="text-lg font-semibold mb-2">Ενεργοί Χρήστες</h3>
            <p className="text-4xl font-bold text-[#0ff]">847</p>
            <p className="text-sm text-gray-400 mt-2">Αυτή τη στιγμή</p>
          </div>
        </div>

        <AINavigation />
      </Card>
    </div>
  );
};

export default AIFeaturesOverview;