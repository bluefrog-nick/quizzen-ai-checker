
import React from 'react';

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm text-quiz-gray mb-2">
        <span>Question {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-quiz-accent rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
