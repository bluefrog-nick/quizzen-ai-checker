
import { supabase } from "@/integrations/supabase/client";
import { Results } from './resultsCalculator';

export const sendResultsEmail = async (email: string, results: Results): Promise<boolean> => {
  try {
    const userId = localStorage.getItem('ai-readiness-cookie') || 'anonymous';
    
    // 1. Store results in Supabase
    const { error: dbError } = await supabase
      .from('quiz_results')
      .insert({
        user_id: userId,
        email,
        results
      });
    
    if (dbError) {
      console.error('Error storing results in database:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }
    
    // 2. Call Supabase Edge Function to send email
    const { error: functionError } = await supabase.functions.invoke('send-results-email', {
      body: { email, results },
    });
    
    if (functionError) {
      console.error('Error calling send-results-email function:', functionError);
      throw new Error(`Function error: ${functionError.message}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error in sendResultsEmail:', error);
    return false;
  }
};
