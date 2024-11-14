import React from 'react';
import { Brain, BookOpen, Target, Activity, Users, Sparkles, LineChart, MessageSquare, Lightbulb, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';

const AINavigation = () => {
  const features = [
    { 
      icon: Brain, 
      title: 'AI Ανάλυση',
      path: '/ai-analysis',
      description: 'Προηγμένη ανάλυση μαθητών'
    },
    { 
      icon: Sparkles, 
      title: 'Εξατομίκευση',
      path: '/ai/personalization',
      description: 'Προσαρμοσμένη μάθηση'
    },
    { 
      icon: LineChart, 
      title: 'Στόχοι',
      path: '/ai/goals',
      description: 'Παρακολούθηση στόχων'
    },
    { 
      icon: Activity, 
      title: 'Πρόοδος',
      path: '/ai/progress',
      description: 'Ανάλυση προόδου'
    },
    { 
      icon: Users, 
      title: 'Συνεργασία',
      path: '/ai/collaboration',
      description: 'Ομαδική μάθηση'
    },
    { 
      icon: MessageSquare, 
      title: 'Επικοινωνία',
      path: '/ai/communication',
      description: 'AI Υποστήριξη'
    },
    { 
      icon: Lightbulb, 
      title: 'Προτάσεις',
      path: '/ai/suggestions',
      description: 'Έξυπνες προτάσεις'
    },
    { 
      icon: BookOpen, 
      title: 'Υλικό',
      path: '/ai/content',
      description: 'Εκπαιδευτικό υλικό'
    },
    { 
      icon: Target, 
      title: 'Αξιολόγηση',
      path: '/ai/assessment',
      description: 'AI Αξιολόγηση'
    },
    { 
      icon: GitBranch, 
      title: 'Μαθησιακά Μονοπάτια',
      path: '/ai/learning-paths',
      description: 'Προσαρμοστική μάθηση'
    }
  ];

  return (
    <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
      {features.map((feature) => (
        <Link
          key={feature.path}
          to={feature.path}
          className="neon-card p-6 hover:scale-105 transition-transform duration-300 group"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 rounded-lg bg-cyber-dark-700 group-hover:bg-cyber-dark-600 transition-colors">
              <feature.icon className="w-8 h-8 text-neon-primary group-hover:text-neon-secondary transition-colors" />
            </div>
            <h3 className="font-orbitron text-lg text-white group-hover:text-neon-primary transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              {feature.description}
            </p>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default AINavigation;