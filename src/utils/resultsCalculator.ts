
import { Option } from './questions';

export interface ResultCategory {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  description: string;
  recommendations: string[];
}

export interface Results {
  totalScore: number;
  maxScore: number;
  percentage: number;
  readinessLevel: string;
  categories: ResultCategory[];
  overallRecommendations: string[];
}

// Define category mappings
const categoryMap: Record<number, string> = {
  1: 'Data Infrastructure',
  2: 'Data Quality',
  3: 'Technical Expertise', 
  4: 'Automation',
  5: 'Leadership Support',
  6: 'Investment',
  7: 'Change Management',
  8: 'Ethics and Governance',
  9: 'Strategic Alignment',
  10: 'Use Case Understanding',
  11: 'Customer Data',
  12: 'IT Infrastructure',
  13: 'Innovation Culture',
  14: 'Cross-departmental Collaboration',
  15: 'Workforce Readiness'
};

// Group questions into categories for the report
const categoryGroups = {
  'Infrastructure & Data': [1, 2, 12],
  'Skills & Expertise': [3, 13, 15],
  'Strategy & Leadership': [5, 6, 9],
  'Processes & Operations': [4, 7, 14],
  'AI Readiness & Planning': [8, 10, 11]
};

export const calculateResults = (answers: Map<number, Option>): Results => {
  const totalPossibleScore = 75; // 15 questions × max value of 5
  
  // Calculate total score
  let totalScore = 0;
  answers.forEach((option) => {
    totalScore += option.value;
  });
  
  // Calculate percentage
  const percentage = Math.round((totalScore / totalPossibleScore) * 100);
  
  // Determine readiness level
  let readinessLevel = '';
  if (percentage < 20) {
    readinessLevel = 'Early Exploration';
  } else if (percentage < 40) {
    readinessLevel = 'Foundation Building';
  } else if (percentage < 60) {
    readinessLevel = 'Developing Capability';
  } else if (percentage < 80) {
    readinessLevel = 'Advanced Implementation';
  } else {
    readinessLevel = 'AI-Driven Organization';
  }
  
  // Calculate category scores
  const categories: ResultCategory[] = [];
  
  Object.entries(categoryGroups).forEach(([categoryName, questionIds]) => {
    const categoryQuestions = questionIds.filter(id => answers.has(id));
    const maxScore = categoryQuestions.length * 5;
    let score = 0;
    
    categoryQuestions.forEach(id => {
      if (answers.has(id)) {
        score += answers.get(id)!.value;
      }
    });
    
    const categoryPercentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    
    // Generate recommendations based on score
    const recommendations: string[] = [];
    if (categoryPercentage < 40) {
      if (categoryName === 'Infrastructure & Data') {
        recommendations.push('Invest in centralizing your data and ensuring data quality.');
        recommendations.push('Implement basic data governance practices and standards.');
      } else if (categoryName === 'Skills & Expertise') {
        recommendations.push('Start upskilling existing staff with basic AI concepts and training.');
        recommendations.push('Consider partnering with external experts for initial projects.');
      } else if (categoryName === 'Strategy & Leadership') {
        recommendations.push('Educate leadership on AI benefits and potential use cases.');
        recommendations.push('Start small with proof-of-concept projects that demonstrate value.');
      } else if (categoryName === 'Processes & Operations') {
        recommendations.push('Identify manual processes that could benefit from basic automation.');
        recommendations.push('Implement change management processes for technology adoption.');
      } else if (categoryName === 'AI Readiness & Planning') {
        recommendations.push('Develop an initial AI strategy with clear objectives.');
        recommendations.push('Identify and prioritize potential use cases specific to your business.');
      }
    } else if (categoryPercentage < 70) {
      if (categoryName === 'Infrastructure & Data') {
        recommendations.push('Enhance your data pipeline and analytics capabilities.');
        recommendations.push('Implement more advanced data integration across systems.');
      } else if (categoryName === 'Skills & Expertise') {
        recommendations.push('Develop specialized AI skills through targeted hiring or training.');
        recommendations.push('Create a center of excellence to share AI knowledge across teams.');
      } else if (categoryName === 'Strategy & Leadership') {
        recommendations.push('Integrate AI initiatives into your broader business strategy.');
        recommendations.push('Allocate dedicated budgets for AI initiatives with clear ROI measures.');
      } else if (categoryName === 'Processes & Operations') {
        recommendations.push('Expand automation to more complex processes and workflows.');
        recommendations.push('Strengthen cross-functional collaboration on AI projects.');
      } else if (categoryName === 'AI Readiness & Planning') {
        recommendations.push('Establish AI governance frameworks and ethical guidelines.');
        recommendations.push('Develop more sophisticated customer data strategies.');
      }
    } else {
      if (categoryName === 'Infrastructure & Data') {
        recommendations.push('Implement advanced data science platforms and real-time analytics.');
        recommendations.push('Develop predictive capabilities and automated decision-making systems.');
      } else if (categoryName === 'Skills & Expertise') {
        recommendations.push('Maintain cutting-edge expertise through continuous learning programs.');
        recommendations.push('Expand AI capabilities across the entire organization.');
      } else if (categoryName === 'Strategy & Leadership') {
        recommendations.push('Position AI as a core competitive advantage in your market.');
        recommendations.push('Explore new business models enabled by advanced AI capabilities.');
      } else if (categoryName === 'Processes & Operations') {
        recommendations.push('Implement AI-driven process optimization and intelligent automation.');
        recommendations.push('Develop agile frameworks for rapid AI deployment and iteration.');
      } else if (categoryName === 'AI Readiness & Planning') {
        recommendations.push('Lead industry standards in AI ethics and responsible deployment.');
        recommendations.push('Develop advanced AI capabilities for personalization and prediction.');
      }
    }
    
    categories.push({
      name: categoryName,
      score,
      maxScore,
      percentage: categoryPercentage,
      description: getCategoryDescription(categoryName, categoryPercentage),
      recommendations
    });
  });
  
  // Generate overall recommendations
  const overallRecommendations = generateOverallRecommendations(percentage, categories);
  
  return {
    totalScore,
    maxScore: totalPossibleScore,
    percentage,
    readinessLevel,
    categories,
    overallRecommendations
  };
};

const getCategoryDescription = (category: string, score: number): string => {
  if (category === 'Infrastructure & Data') {
    if (score < 40) return 'Your data infrastructure needs significant improvement to support AI initiatives.';
    if (score < 70) return 'You have a moderate data foundation but could benefit from further development.';
    return 'Your data infrastructure is well-positioned to support advanced AI applications.';
  } else if (category === 'Skills & Expertise') {
    if (score < 40) return 'Your organization lacks the necessary AI skills and expertise.';
    if (score < 70) return 'You have some AI capabilities but would benefit from more specialized expertise.';
    return 'Your organization has strong AI technical knowledge and capabilities.';
  } else if (category === 'Strategy & Leadership') {
    if (score < 40) return 'Leadership support and strategic alignment for AI is limited.';
    if (score < 70) return 'Your leadership shows moderate support for AI but could be more strategic.';
    return 'AI is well-integrated into your strategy with strong leadership support.';
  } else if (category === 'Processes & Operations') {
    if (score < 40) return 'Your operational processes need significant modernization to support AI.';
    if (score < 70) return 'Your processes have moderate capability for AI integration but could be improved.';
    return 'Your operational processes are well-suited for AI integration and innovation.';
  } else {
    if (score < 40) return 'Your organization needs to develop foundational AI planning and readiness.';
    if (score < 70) return 'You have begun AI planning but need more comprehensive approaches.';
    return 'Your organization demonstrates sophisticated AI readiness and planning.';
  }
};

const generateOverallRecommendations = (
  overallScore: number, 
  categories: ResultCategory[]
): string[] => {
  const recommendations: string[] = [];
  
  if (overallScore < 30) {
    recommendations.push('Start with basic data organization and quality improvements.');
    recommendations.push('Focus on education and awareness about AI potential for your business.');
    recommendations.push('Identify one or two simple use cases where AI could demonstrate value.');
  } else if (overallScore < 50) {
    recommendations.push('Develop a formal AI strategy with clear goals and metrics.');
    recommendations.push('Invest in building basic AI capabilities through training or hiring.');
    recommendations.push('Improve data infrastructure to support more advanced analysis.');
  } else if (overallScore < 70) {
    recommendations.push('Scale successful AI pilots to broader implementation.');
    recommendations.push('Develop more sophisticated data integration and analytics capabilities.');
    recommendations.push('Create formal governance structures for AI deployment.');
  } else {
    recommendations.push('Explore cutting-edge AI applications to maintain competitive advantage.');
    recommendations.push('Focus on continuous innovation and expanding AI capabilities.');
    recommendations.push('Lead your industry in responsible and effective AI deployment.');
  }
  
  // Add weakest category recommendation
  const weakestCategory = [...categories].sort((a, b) => a.percentage - b.percentage)[0];
  recommendations.push(`Prioritize improvements in the "${weakestCategory.name}" category, which shows the most opportunity for growth.`);
  
  return recommendations;
};
