
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

interface EmailFormProps {
  onSubmit: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    onSubmit(email);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-medium mb-3">Almost done!</h2>
        <p className="text-quiz-gray">
          Enter your email to receive your detailed AI readiness assessment results.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-quiz-gray w-5 h-5" />
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`pl-10 py-6 ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-6 bg-quiz-accent hover:bg-quiz-accent/90 text-white"
        >
          Get My Results
        </Button>
        
        <p className="text-center text-xs text-quiz-gray mt-4">
          We'll only use your email to send your assessment results and won't share it with third parties.
        </p>
      </form>
    </div>
  );
};

export default EmailForm;
