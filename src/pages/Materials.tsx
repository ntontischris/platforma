import React from 'react';
import { FileText, Plus } from 'lucide-react';
import MaterialList from '../components/materials/MaterialList';
import Button from '../components/ui/Button';

const Materials = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Εκπαιδευτικό Υλικό</h1>
          <p className="text-gray-400 mt-1">
            Διαχείριση και οργάνωση εκπαιδευτικού περιεχομένου
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stats-card p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-neon-primary/10 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-neon-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Σύνολο Υλικού</p>
              <p className="text-2xl font-bold text-white">156</p>
            </div>
          </div>
        </div>
        
        <div className="stats-card p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-neon-secondary/10 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-neon-secondary" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Νέο Υλικό</p>
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-xs text-gray-400">Τελευταίες 24 ώρες</p>
            </div>
          </div>
        </div>

        <div className="stats-card p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-[#0ff]/10 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-[#0ff]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Προβολές</p>
              <p className="text-2xl font-bold text-white">2.4k</p>
              <p className="text-xs text-gray-400">Αυτό το μήνα</p>
            </div>
          </div>
        </div>
      </div>

      <MaterialList />
    </div>
  );
};

export default Materials;