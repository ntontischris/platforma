import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './components/Dashboard';
import Students from './pages/Students';
import AIAnalysis from './pages/AIAnalysis';
import StudentAI from './pages/StudentAI';
import Courses from './pages/Courses';
import Schedule from './pages/Schedule';
import Finance from './pages/Finance';
import Settings from './pages/Settings';
import AIServices from './pages/ai/AIServices';
import TeacherFeatures from './pages/ai/TeacherFeatures';
import StudentFeatures from './pages/ai/StudentFeatures';
import Materials from './pages/Materials';
import AIAssistant from './pages/ai/AIAssistant';
import LearningAnalysis from './pages/ai/LearningAnalysis';
import Performance from './pages/ai/Performance';
import SmartContent from './pages/ai/SmartContent';
import Assessment from './pages/ai/Assessment';
import AdaptiveLearning from './pages/ai/AdaptiveLearning';
import ParentUpdates from './pages/ai/ParentUpdates';
import StudyPlans from './pages/ai/StudyPlans';
import CollaborativeLearning from './pages/ai/CollaborativeLearning';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="students/:id/ai" element={<StudentAI />} />
          
          {/* AI Routes */}
          <Route path="ai" element={<AIServices />} />
          <Route path="ai/assistant" element={<AIAssistant />} />
          <Route path="ai/learning-analysis" element={<LearningAnalysis />} />
          <Route path="ai/performance" element={<Performance />} />
          <Route path="ai/smart-content" element={<SmartContent />} />
          <Route path="ai/assessment" element={<Assessment />} />
          <Route path="ai/adaptive" element={<AdaptiveLearning />} />
          <Route path="ai/parent-updates" element={<ParentUpdates />} />
          <Route path="ai/study-plans" element={<StudyPlans />} />
          <Route path="ai/collaborative" element={<CollaborativeLearning />} />
          <Route path="ai-analysis" element={<AIAnalysis />} />
          <Route path="ai/teacher" element={<TeacherFeatures />} />
          <Route path="ai/student" element={<StudentFeatures />} />
          
          {/* Main Routes */}
          <Route path="courses" element={<Courses />} />
          <Route path="materials" element={<Materials />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="finance" element={<Finance />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;