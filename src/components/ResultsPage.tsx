
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { Results, ResultCategory } from '../utils/resultsCalculator';
import { CheckCircle } from 'lucide-react';

interface ResultsPageProps {
  results: Results;
  email: string;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ results, email }) => {
  // Prepare data for category bar chart
  const categoryData = results.categories.map(category => ({
    name: category.name,
    score: category.percentage,
  }));

  // Calculate colors based on percentage
  const getBarColor = (percentage: number) => {
    if (percentage < 40) return '#FF4D4F';
    if (percentage < 70) return '#FAAD14';
    return '#52C41A';
  };

  // Prepare data for readiness pie chart
  const pieData = [
    { name: 'Your Score', value: results.percentage },
    { name: 'Room for Growth', value: 100 - results.percentage }
  ];
  
  const COLORS = ['#007AFF', '#F5F7FA'];

  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-10">
        <div className="inline-block mb-4 p-2 rounded-full bg-blue-50">
          <CheckCircle className="w-8 h-8 text-quiz-accent" />
        </div>
        <h2 className="text-2xl font-medium mb-2">Your AI Readiness Results</h2>
        <p className="text-quiz-gray">
          Results have been sent to <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="glass rounded-2xl p-6 mb-8 shadow-sm">
        <h3 className="text-xl font-medium mb-4">Overall Readiness: {results.readinessLevel}</h3>
        <p className="mb-6 text-quiz-gray">
          Your organization scored {results.percentage}% on the AI Readiness Assessment, 
          indicating you are at the <strong>{results.readinessLevel}</strong> stage.
        </p>

        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 mb-8 shadow-sm">
        <h3 className="text-xl font-medium mb-4">Category Breakdown</h3>
        
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 mb-8 shadow-sm">
        <h3 className="text-xl font-medium mb-4">Key Recommendations</h3>
        <ul className="space-y-2">
          {results.overallRecommendations.map((recommendation, index) => (
            <li key={index} className="flex">
              <span className="text-quiz-accent mr-2">•</span>
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {results.categories.map((category, index) => (
          <div key={index} className="glass rounded-2xl p-6 shadow-sm">
            <h4 className="text-lg font-medium mb-2">{category.name}</h4>
            <div className="flex items-center mb-3">
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mr-3">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-in-out"
                  style={{ 
                    width: `${category.percentage}%`,
                    backgroundColor: getBarColor(category.percentage)
                  }}
                />
              </div>
              <span className="text-quiz-gray text-sm whitespace-nowrap">{category.percentage}%</span>
            </div>
            <p className="text-sm text-quiz-gray mb-3">{category.description}</p>
            {category.recommendations.length > 0 && (
              <div>
                <h5 className="text-sm font-medium mb-1">Recommendations:</h5>
                <ul className="text-sm space-y-1">
                  {category.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="flex">
                      <span className="text-quiz-accent mr-2">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center text-quiz-gray text-sm mt-8">
        <p>This assessment provides a snapshot of your organization's AI readiness.</p>
        <p>For a more detailed analysis, consider consulting with an AI strategy expert.</p>
      </div>
    </div>
  );
};

export default ResultsPage;
