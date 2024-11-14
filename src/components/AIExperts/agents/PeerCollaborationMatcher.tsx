import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import Card from '../../ui/Card';
import { Student } from '../../../types';
import { aiService } from '../../../services/aiService';

interface Props {
  student: Student;
}

const PeerCollaborationMatcher: React.FC<Props> = ({ student }) => {
  const [matches, setMatches] = useState<any>(null);

  useEffect(() => {
    const findMatches = async () => {
      const result = await aiService.findPeerMatches(student);
      setMatches(result);
    };
    findMatches();
  }, [student]);

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Users className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Ταίριασμα Συνεργασίας</h3>
      </div>

      {matches && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Προτεινόμενοι Συμμαθητές</h4>
            <div className="space-y-2">
              {matches.peers.map((peer: any) => (
                <div
                  key={peer.id}
                  className="p-3 bg-blue-50 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{peer.name}</h5>
                      <p className="text-sm text-gray-600">
                        Συμβατότητα: {peer.compatibility}%
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {peer.strengths.join(', ')}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {peer.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Προτεινόμενες Δραστηριότητες</h4>
            <div className="space-y-2">
              {matches.activities.map((activity: any, index: number) => (
                <div
                  key={index}
                  className="p-3 bg-green-50 rounded-lg"
                >
                  <h5 className="font-medium">{activity.name}</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-4 text-xs">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {activity.type}
                    </span>
                    <span className="text-gray-500">
                      Διάρκεια: {activity.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-yellow-50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Συμβουλές Συνεργασίας</h4>
            <ul className="space-y-1">
              {matches.tips.map((tip: string, index: number) => (
                <li key={index} className="text-sm text-gray-600">• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PeerCollaborationMatcher;