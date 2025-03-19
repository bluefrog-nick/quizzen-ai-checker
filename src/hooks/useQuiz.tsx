
import { useState, useEffect } from 'react';
import { questions, Question, Option } from '../utils/questions';
import { calculateResults, Results } from '../utils/resultsCalculator';
import { setAiReadinessCookieIfNeeded } from '../utils/cookieHelper';
import { sendResultsEmail } from '../utils/emailService';
import { toast } from '@/components/ui/use-toast';

export type QuizState = 'intro' | 'question' | 'email' | 'results';

export const useQuiz = () => {
  const [state, setState] = useState<QuizState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, Option>>(new Map());
  const [email, setEmail] = useState('');
  const [results, setResults] = useState<Results | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Initialize user cookie on first load
  useEffect(() => {
    const id = setAiReadinessCookieIfNeeded();
    setUserId(id);
    console.log('User ID:', id);
  }, []);

  const startQuiz = () => {
    setState('question');
  };

  const handleSelectOption = (option: Option) => {
    const newAnswers = new Map(answers);
    newAnswers.set(questions[currentQuestionIndex].id, option);
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setState('email');
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateAndDisplayResults = async (userEmail: string) => {
    setEmail(userEmail);
    setIsSubmitting(true);
    
    try {
      // Calculate results
      const calculatedResults = calculateResults(answers);
      setResults(calculatedResults);
      
      // Send email with results
      const emailSent = await sendResultsEmail(userEmail, calculatedResults);
      
      if (emailSent) {
        toast({
          title: "Results sent!",
          description: `Your AI readiness assessment has been sent to ${userEmail}`,
        });
      } else {
        toast({
          title: "Couldn't send email",
          description: "There was a problem sending your results. Please try again later.",
          variant: "destructive",
        });
      }
      
      // Change to results state
      setState('results');
    } catch (error) {
      console.error('Error calculating results:', error);
      toast({
        title: "Something went wrong",
        description: "There was a problem processing your results. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setAnswers(new Map());
    setCurrentQuestionIndex(0);
    setResults(null);
    setState('intro');
  };

  const currentQuestion: Question = questions[currentQuestionIndex];
  const currentAnswer: Option | null = answers.get(currentQuestion.id) || null;
  const canContinue = !!currentAnswer;
  const progress = {
    current: currentQuestionIndex + 1,
    total: questions.length
  };

  return {
    state,
    currentQuestion,
    currentAnswer,
    canContinue,
    progress,
    isSubmitting,
    email,
    results,
    userId,
    startQuiz,
    handleSelectOption,
    goToNextQuestion,
    goToPreviousQuestion,
    calculateAndDisplayResults,
    resetQuiz
  };
};
