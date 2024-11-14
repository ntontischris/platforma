// Previous imports remain the same...
import { 
  School, 
  Users, 
  BookOpen, 
  Calendar, 
  Settings, 
  Euro, 
  Menu, 
  X, 
  Brain,
  GraduationCap,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bot,
  Target,
  LineChart,
  Zap,
  FileText
} from 'lucide-react';

// ... rest of the imports

const Sidebar = () => {
  // ... previous state declarations

  const menuItems = [
    { icon: School, text: 'Επισκόπηση', path: '/' },
    { icon: Users, text: 'Μαθητές', path: '/students' },
    { 
      icon: Brain, 
      text: 'AI Υπηρεσίες', 
      path: '/ai',
      submenu: [
        { icon: Bot, text: 'Προσωπικός Βοηθός', path: '/ai/assistant' },
        { icon: Target, text: 'Ανάλυση Μάθησης', path: '/ai/learning-analysis' },
        { icon: LineChart, text: 'Πρόβλεψη Επίδοσης', path: '/ai/performance' },
        { icon: Sparkles, text: 'Έξυπνο Περιεχόμενο', path: '/ai/smart-content' },
        { icon: Zap, text: 'Αυτόματη Αξιολόγηση', path: '/ai/assessment' },
        { icon: GraduationCap, text: 'Προσαρμοστική Μάθηση', path: '/ai/adaptive' },
        { icon: MessageSquare, text: 'Επικοινωνία Γονέων', path: '/ai/parent-updates' },
        { icon: BookOpen, text: 'Πλάνα Μελέτης', path: '/ai/study-plans' },
        { icon: Users, text: 'Συνεργατική Μάθηση', path: '/ai/collaborative' },
        { icon: Brain, text: 'AI Ανάλυση', path: '/ai-analysis' }
      ]
    },
    { icon: BookOpen, text: 'Μαθήματα', path: '/courses' },
    { icon: FileText, text: 'Εκπαιδευτικό Υλικό', path: '/materials' },
    { icon: Calendar, text: 'Πρόγραμμα', path: '/schedule' },
    { icon: Euro, text: 'Οικονομικά', path: '/finance' },
    { icon: Settings, text: 'Ρυθμίσεις', path: '/settings' },
  ];

  // ... rest of the component remains the same
};

export default Sidebar;