import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  School, 
  Users, 
  BookOpen, 
  Calendar, 
  Settings, 
  Euro, 
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
  FileText,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import Notifications from './Notifications';

const MainNav = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
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

  const toggleSubmenu = (path: string) => {
    setExpandedItem(expandedItem === path ? null : path);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedItem(null);
  };

  React.useEffect(() => {
    closeMobileMenu();
  }, [location]);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <div key={item.path} className={cn(
          "relative group",
          mobile && "w-full"
        )}>
          {item.submenu ? (
            <div>
              <button
                onClick={() => toggleSubmenu(item.path)}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  expandedItem === item.path
                    ? "bg-neon-primary text-cyber-dark shadow-neon scale-105"
                    : "text-gray-300 hover:text-neon-primary hover:bg-cyber-dark-700"
                )}
              >
                <span className="flex items-center">
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.text}
                </span>
                {expandedItem === item.path ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedItem === item.path && (
                <div className={cn(
                  "mt-2 rounded-lg bg-cyber-dark-800 shadow-neon border border-neon-primary/20",
                  !mobile && "absolute left-0 w-64 z-50",
                  mobile && "w-full"
                )}>
                  {item.submenu.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      className={({ isActive }) => cn(
                        "flex items-center px-4 py-2 text-sm",
                        isActive
                          ? "bg-neon-primary/10 text-neon-primary"
                          : "text-gray-300 hover:bg-cyber-dark-700"
                      )}
                      onClick={mobile ? closeMobileMenu : undefined}
                    >
                      <subItem.icon className="w-4 h-4 mr-2" />
                      {subItem.text}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-neon-primary text-cyber-dark shadow-neon scale-105"
                  : "text-gray-300 hover:text-neon-primary hover:bg-cyber-dark-700",
                mobile && "w-full"
              )}
              onClick={mobile ? closeMobileMenu : undefined}
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.text}
            </NavLink>
          )}
        </div>
      ))}
    </>
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-cyber-dark-900/95 shadow-neon backdrop-blur-lg border-b border-neon-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold neon-text">
                EduManager
              </h1>
            </NavLink>
            <button
              className="lg:hidden ml-4 p-2 rounded-lg text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <div className="flex items-baseline space-x-4">
              <NavLinks />
            </div>
            <Notifications />
            <div className="flex items-center space-x-3 border-l border-neon-primary/20 pl-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-8 h-8 rounded-lg border-2 border-neon-primary/30 shadow-neon"
              />
              <div>
                <p className="text-sm font-medium text-white">Γιώργος Παπαδόπουλος</p>
                <p className="text-xs text-neon-primary">Διαχειριστής</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-40 transform transition-transform duration-300",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={closeMobileMenu}
        />

        {/* Menu */}
        <div className="relative w-64 max-w-sm h-full bg-cyber-dark-800 shadow-lg">
          <div className="h-full overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Μενού</h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg text-gray-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                <NavLinks mobile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;