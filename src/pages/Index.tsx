
import React from 'react';
import Layout from '@/components/Layout';
import QuizProgress from '@/components/QuizProgress';
import QuizQuestion from '@/components/QuizQuestion';
import EmailForm from '@/components/EmailForm';
import ResultsPage from '@/components/ResultsPage';
import { useQuiz } from '@/hooks/useQuiz';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';

const Index = () => {
  const {
    state,
    currentQuestion,
    currentAnswer,
    canContinue,
    progress,
    isSubmitting,
    email,
    results,
    startQuiz,
    handleSelectOption,
    goToNextQuestion,
    goToPreviousQuestion,
    calculateAndDisplayResults
  } = useQuiz();

  return (
    <Layout>
      {state === 'intro' && (
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <div className="inline-block mb-4 p-3 rounded-full bg-blue-50">
              <div className="w-12 h-12 rounded-full bg-quiz-accent flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="white"/>
                  <path d="M21 12C21 12 18 18 12 18C6 18 3 12 3 12C3 12 6 6 12 6C18 6 21 12 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-medium mb-4">AI Readiness Assessment</h1>
            <p className="text-quiz-gray max-w-lg mx-auto mb-8">
              Discover how prepared your organization is to implement and benefit from artificial intelligence technologies.
            </p>
          </div>
          
          <div className="glass rounded-xl p-6 mb-8 max-w-lg mx-auto">
            <h2 className="text-xl font-medium mb-3">What to expect</h2>
            <ul className="text-left space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-quiz-accent mr-2 mt-0.5">•</span>
                <span>15 questions about your organization's readiness for AI</span>
              </li>
              <li className="flex items-start">
                <span className="text-quiz-accent mr-2 mt-0.5">•</span>
                <span>Takes approximately 5 minutes to complete</span>
              </li>
              <li className="flex items-start">
                <span className="text-quiz-accent mr-2 mt-0.5">•</span>
                <span>Receive a detailed assessment of your AI readiness</span>
              </li>
              <li className="flex items-start">
                <span className="text-quiz-accent mr-2 mt-0.5">•</span>
                <span>Get personalized recommendations for improvement</span>
              </li>
            </ul>
            
            <Button 
              onClick={startQuiz} 
              className="w-full py-6 bg-quiz-accent hover:bg-quiz-accent/90 text-white"
            >
              Start Assessment <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-quiz-gray">
            Your responses will be used to calculate your organization's AI readiness score.
          </p>
        </div>
      )}

      {state === 'question' && (
        <div className="w-full max-w-lg mx-auto">
          <QuizProgress 
            currentStep={progress.current} 
            totalSteps={progress.total} 
          />
          
          <QuizQuestion 
            question={currentQuestion} 
            selectedOption={currentAnswer} 
            onSelectOption={handleSelectOption} 
          />
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={goToPreviousQuestion}
              disabled={progress.current === 1}
              className="px-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            
            <Button
              onClick={goToNextQuestion}
              disabled={!canContinue}
              className="bg-quiz-accent hover:bg-quiz-accent/90 text-white px-4"
            >
              {progress.current === progress.total ? 'Finish' : 'Next'} 
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {state === 'email' && (
        <EmailForm 
          onSubmit={calculateAndDisplayResults} 
        />
      )}

      {state === 'results' && results && (
        <ResultsPage 
          results={results} 
          email={email} 
        />
      )}
    </Layout>
  );
};

export default Index;
