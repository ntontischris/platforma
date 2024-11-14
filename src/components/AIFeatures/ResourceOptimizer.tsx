import React, { useState, useEffect } from 'react';
import { BarChart2, Maximize } from 'lucide-react';
import Card from '../ui/Card';
import { aiService } from '../../services/aiService';
import LoadingSpinner from '../LoadingSpinner';

const ResourceOptimizer = () => {
  const [optimization, setOptimization] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptimization = async () => {
      try {
        const resources = [
          { type: 'classroom', capacity: 30, availability: 0.8 },
          { type: 'lab', capacity: 20, availability: 0.6 },
          // Add more resources
        ];

        const demands = [
          { type: 'classroom', required: 25, priority: 0.9 },
          { type: 'lab', required: 15, priority: 0.7 },
          // Add more demands
        ];

        const result = await aiService.optimizeResourceAllocation(resources, demands);
        setOptimization(result);
      } catch (error) {
        console.error('Error fetching resource optimization:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptimization();
  }, []);

  if (loading) {
    return (
      <Card>
        <div className="flex justify-center items-center h-48">
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Maximize className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Βελτιστοποίηση Πόρων</h3>
      </div>

      {optimization && (
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Αποδοτικότητα Κατανομής</h4>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${optimization.efficiency * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">
                {(optimization.efficiency * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Κατανομή Πόρων</h4>
            <div className="space-y-2">
              {optimization.allocation.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium">{item.resource}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {item.utilization}% χρήση
                    </span>
                  </div>
                  <BarChart2 className="w-4 h-4 text-blue-600" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Προτάσεις Βελτιστοποίησης</h4>
            <div className="space-y-2">
              {optimization.recommendations.map((rec: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 text-sm text-gray-600"
                >
                  <span className="text-blue-600">•</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ResourceOptimizer;