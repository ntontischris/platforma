import React from 'react';
import PersonalizedTutor from '../../components/AIFeatures/StudentFeatures/PersonalizedTutor';
import HomeworkHelper from '../../components/AIFeatures/StudentFeatures/HomeworkHelper';
import ConceptExplainer from '../../components/AIFeatures/StudentFeatures/ConceptExplainer';
import StudyScheduler from '../../components/AIFeatures/StudentFeatures/StudyScheduler';
import SkillAssessment from '../../components/AIFeatures/StudentFeatures/SkillAssessment';
import ProsopikoBoitho from '../../components/AIFeatures/StudentFeatures/ProsopikoBoitho';

const StudentFeatures = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Εργαλεία Μαθητών</h1>
        <p className="text-gray-600 mt-1">
          Εξατομικευμένα AI εργαλεία για την υποστήριξη της μάθησης
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProsopikoBoitho />
        <PersonalizedTutor />
        <HomeworkHelper />
        <ConceptExplainer />
        <StudyScheduler />
        <SkillAssessment />
      </div>
    </div>
  );
};

export default StudentFeatures;