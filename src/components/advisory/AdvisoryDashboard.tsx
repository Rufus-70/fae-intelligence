// Advisory Dashboard Component - Business Intelligence Interface
// Provides natural language business consulting interface

'use client';

import React, { useState } from 'react';
import { AdvisoryQueryEngine } from '../../lib/advisory/advisoryQueryEngine';

interface AdvisoryRecommendation {
  query: string;
  industry?: string;
  pain_points_identified: any[];
  recommended_solutions: any[];
  suggested_tools: any[];
  implementation_plan: any;
  roi_projection: any;
  next_steps: string[];
  confidence_score: number;
}

export const AdvisoryDashboard: React.FC = () => {
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('');
  const [recommendations, setRecommendations] = useState<AdvisoryRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const queryEngine = new AdvisoryQueryEngine();
  
  const exampleQueries = [
    "Our restaurant has long wait times during peak dinner hours",
    "We're struggling with cash flow and late customer payments",
    "Manual inventory tracking is causing stockouts and waste",
    "Customer service response times are too slow",
    "Need to automate our booking and scheduling process",
    "High employee turnover is affecting service quality"
  ];
  
  const handleAdvisoryQuery = async () => {
    if (!query.trim()) {
      setError('Please enter a business challenge or question');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Submitting advisory query:', query);
      const result = await queryEngine.getAdvisoryRecommendations(query, industry || undefined);
      setRecommendations(result);
      console.log('Advisory recommendations received:', result);
    } catch (error) {
      console.error('Advisory query failed:', error);
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleExampleQuery = (exampleQuery: string) => {
    setQuery(exampleQuery);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAdvisoryQuery();
    }
  };
  
  return (
    <div className="advisory-dashboard min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🧠 Business Advisory AI
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Get expert business recommendations powered by 30+ years of experience
          </p>
          <p className="text-gray-500">
            Describe your business challenge and get actionable solutions, tools, and implementation plans
          </p>
        </div>
        
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="space-y-4">
            
            {/* Industry Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry (Optional)
              </label>
              <select 
                value={industry} 
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Industry (or leave blank for general advice)</option>
                <option value="restaurant">Restaurant & Food Service</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="professional_services">Professional Services</option>
                <option value="healthcare">Healthcare</option>
                <option value="construction">Construction</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance & Insurance</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            {/* Query Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Challenge or Question
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your business challenge in detail...

Examples:
• 'Our customers wait too long for service during peak hours'
• 'We're losing money on manual processes and inefficiencies'
• 'Cash flow problems from late payments'
• 'Need better inventory management to reduce waste'"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={6}
              />
              <p className="text-sm text-gray-500 mt-2">
                Tip: Be specific about your situation for better recommendations. Press Ctrl+Enter to submit.
              </p>
            </div>
            
            {/* Example Queries */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Try these examples:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {exampleQueries.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleQuery(example)}
                    className="text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              onClick={handleAdvisoryQuery}
              disabled={!query.trim() || loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing your business challenge...
                </span>
              ) : (
                'Get Expert Recommendations'
              )}
            </button>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
          </div>
        </div>
        
        {/* Results Section */}
        {recommendations && (
          <AdvisoryResults recommendations={recommendations} />
        )}
      </div>
    </div>
  );
};

const AdvisoryResults: React.FC<{ recommendations: AdvisoryRecommendation }> = ({ recommendations }) => {
  return (
    <div className="advisory-results space-y-6">
      
      {/* Confidence Score */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Confidence Score:</span>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
              {recommendations.confidence_score}%
            </div>
          </div>
        </div>
        <p className="text-gray-600 mt-2">
          Query: "{recommendations.query}"
          {recommendations.industry && <span className="ml-2 text-blue-600">({recommendations.industry})</span>}
        </p>
      </div>
      
      {/* Pain Points */}
      {recommendations.pain_points_identified && recommendations.pain_points_identified.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            🎯 Pain Points Identified
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.pain_points_identified.map((painPoint, index) => (
              <div key={index} className="border-l-4 border-red-400 bg-red-50 p-4 rounded">
                <h4 className="font-semibold text-gray-800">{painPoint.name}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Severity: <span className={`font-medium ${
                    painPoint.severity === 'critical' ? 'text-red-600' :
                    painPoint.severity === 'high' ? 'text-orange-600' :
                    painPoint.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>{painPoint.severity}</span>
                </p>
                {painPoint.cost_impact && (
                  <p className="text-sm text-gray-600 mt-1">
                    Cost Impact: {painPoint.cost_impact}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Recommended Solutions */}
      {recommendations.recommended_solutions && recommendations.recommended_solutions.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            💡 Recommended Solutions
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.recommended_solutions.map((solution, index) => (
              <div key={index} className="border-l-4 border-green-400 bg-green-50 p-4 rounded">
                <h4 className="font-semibold text-gray-800">{solution.name}</h4>
                <div className="mt-2 space-y-1 text-sm">
                  {solution.type && (
                    <p className="text-gray-600">
                      Type: <span className="font-medium">{solution.type}</span>
                    </p>
                  )}
                  {solution.roi && (
                    <p className="text-gray-600">
                      Expected ROI: <span className="font-medium text-green-600">{solution.roi}</span>
                    </p>
                  )}
                  {solution.timeline && (
                    <p className="text-gray-600">
                      Timeline: <span className="font-medium">{solution.timeline}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Suggested Tools */}
      {recommendations.suggested_tools && recommendations.suggested_tools.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            🛠️ Suggested Tools & Technologies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.suggested_tools.map((tool, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-800">{tool.name}</h4>
                {tool.vendor && (
                  <p className="text-sm text-gray-600 mt-1">by {tool.vendor}</p>
                )}
                <div className="mt-2 space-y-1 text-sm">
                  {tool.cost && (
                    <p className="text-gray-600">
                      Cost: <span className="font-medium">{tool.cost}</span>
                    </p>
                  )}
                  {tool.complexity && (
                    <p className="text-gray-600">
                      Complexity: <span className="font-medium">{tool.complexity}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Next Steps */}
      {recommendations.next_steps && recommendations.next_steps.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            🚀 Next Steps
          </h3>
          <div className="space-y-3">
            {recommendations.next_steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Take Action</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            💬 Schedule Consultation
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            📄 Download Report
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            🔄 Ask Follow-up Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryDashboard;
