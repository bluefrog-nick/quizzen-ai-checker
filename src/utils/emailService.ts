
import { Results } from './resultsCalculator';

export const sendResultsEmail = async (email: string, results: Results): Promise<boolean> => {
  try {
    // In a real application, this would send an API request to a backend service
    // that would format and send the email with the assessment results
    
    console.log(`Email would be sent to: ${email}`);
    console.log('Results:', results);
    
    // Simulating a successful email sending with a timeout
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
