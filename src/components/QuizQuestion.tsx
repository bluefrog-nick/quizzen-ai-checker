
import React from 'react';
import { Question, Option } from '../utils/questions';

interface QuizQuestionProps {
  question: Question;
  selectedOption: Option | null;
  onSelectOption: (option: Option) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  selectedOption, 
  onSelectOption 
}) => {
  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-medium text-quiz-dark mb-6">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectOption(option)}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              selectedOption?.id === option.id
                ? 'border-quiz-accent bg-blue-50 shadow-sm'
                : 'border-gray-200 hover:border-quiz-accent hover:bg-blue-50/50'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                selectedOption?.id === option.id
                  ? 'border-quiz-accent bg-quiz-accent'
                  : 'border-gray-300'
              }`}>
                {selectedOption?.id === option.id && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span>{option.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
