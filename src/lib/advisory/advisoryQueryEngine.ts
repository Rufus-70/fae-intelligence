// Advisory Query Engine for Natural Language Business Consulting
// Processes natural language queries and provides expert business recommendations

import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

interface AdvisoryRecommendation {
  query: string;
  industry?: string;
  pain_points_identified: any[];
  recommended_solutions: any[];
  suggested_tools: any[];
  implementation_plan: {
    phases: Array<{
      name: string;
      duration: string;
      activities: string[];
      deliverables: string[];
      cost_estimate?: string;
    }>;
    total_timeline: string;
    success_factors: string[];
    risk_factors: string[];
  };
  roi_projection: {
    implementation_cost: string;
    annual_savings: string;
    payback_period: string;
    three_year_roi: string;
  };
  next_steps: string[];
  confidence_score: number;
}

interface QueryAnalysis {
  intent: 'identify_pain_points' | 'request_solutions' | 'find_tools' | 'cost_analysis' | 'implementation_plan' | 'general_advisory';
  extracted_topics: string[];
  industry_hints: string[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
  budget_hints: string[];
}

export class AdvisoryQueryEngine {
  
  async getAdvisoryRecommendations(userQuery: string, industry?: string): Promise<AdvisoryRecommendation> {
    try {
      console.log('Processing advisory query:', userQuery);
      
      // Analyze the query to understand intent and extract key information
      const queryAnalysis = await this.analyzeQuery(userQuery);
      console.log('Query analysis:', queryAnalysis);
      
      // Route to appropriate handler based on intent
      switch (queryAnalysis.intent) {
        case 'identify_pain_points':
          return await this.identifyPainPoints(userQuery, industry);
          
        case 'request_solutions':
          return await this.recommendSolutions(userQuery, industry);
          
        case 'find_tools':
          return await this.suggestTools(userQuery, industry);
          
        case 'cost_analysis':
          return await this.provideCostAnalysis(userQuery, industry);
          
        case 'implementation_plan':
          return await this.createImplementationPlan(userQuery, industry);
          
        default:
          return await this.generalAdvisoryResponse(userQuery, industry);
      }
    } catch (error) {
      console.error('Error processing advisory query:', error);
      return this.generateErrorResponse(userQuery, error.message);
    }
  }
  
  private async analyzeQuery(userQuery: string): Promise<QueryAnalysis> {
    const analysisPrompt = `
      Analyze this business query and determine the primary intent and extract key information:
      
      Query: "${userQuery}"
      
      Determine:
      1. Primary intent:
         - identify_pain_points: User is describing problems or asking about issues
         - request_solutions: User wants solutions to a specific problem
         - find_tools: User is looking for specific tools or technologies
         - cost_analysis: User wants to understand costs, ROI, or budget
         - implementation_plan: User wants step-by-step guidance
         - general_advisory: General business advice request
      
      2. Extracted topics: Key business concepts, problems, or areas mentioned
      3. Industry hints: Any industry-specific terms or context
      4. Urgency level: How urgent does this seem (low/medium/high/critical)
      5. Budget hints: Any budget constraints or cost considerations mentioned
      
      Return JSON format:
      {
        "intent": "string",
        "extracted_topics": ["string"],
        "industry_hints": ["string"],
        "urgency": "low|medium|high|critical",
        "budget_hints": ["string"]
      }
    `;
    
    try {
      const response = await this.callGemini(analysisPrompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Query analysis failed, using fallback:', error);
      return this.fallbackQueryAnalysis(userQuery);
    }
  }
  
  private fallbackQueryAnalysis(userQuery: string): QueryAnalysis {
    const query = userQuery.toLowerCase();
    
    let intent: QueryAnalysis['intent'] = 'general_advisory';
    
    if (query.includes('problem') || query.includes('issue') || query.includes('challenge')) {
      intent = 'identify_pain_points';
    } else if (query.includes('how to') || query.includes('solution') || query.includes('fix')) {
      intent = 'request_solutions';
    } else if (query.includes('tool') || query.includes('software') || query.includes('system')) {
      intent = 'find_tools';
    } else if (query.includes('cost') || query.includes('budget') || query.includes('roi')) {
      intent = 'cost_analysis';
    } else if (query.includes('implement') || query.includes('plan') || query.includes('steps')) {
      intent = 'implementation_plan';
    }
    
    return {
      intent,
      extracted_topics: this.extractTopics(userQuery),
      industry_hints: this.extractIndustryHints(userQuery),
      urgency: this.assessUrgency(userQuery),
      budget_hints: this.extractBudgetHints(userQuery)
    };
  }
  
  async recommendSolutions(userQuery: string, industry?: string): Promise<AdvisoryRecommendation> {
    const solutionPrompt = `
      As an expert business consultant with 30+ years of experience, provide comprehensive recommendations for this business challenge:
      
      Challenge: "${userQuery}"
      Industry: ${industry || 'General SMB'}
      
      Provide detailed recommendations including:
      
      1. PAIN POINTS IDENTIFIED:
         - Primary business problems
         - Root causes
         - Impact assessment
         - Urgency level
      
      2. RECOMMENDED SOLUTIONS:
         - Specific solutions for each pain point
         - Implementation approach
         - Expected outcomes
         - Success factors
      
      3. SUGGESTED TOOLS:
         - Specific software/tools for each solution
         - Cost ranges (free/low/medium/high)
         - Implementation complexity
         - SMB suitability (1-10 scale)
      
      4. IMPLEMENTATION PLAN:
         - Phase-by-phase breakdown
         - Timeline for each phase
         - Resource requirements
         - Key milestones
      
      5. ROI PROJECTION:
         - Implementation costs
         - Expected savings/benefits
         - Payback period
         - 3-year ROI estimate
      
      6. NEXT STEPS:
         - Immediate actions to take
         - Priority order
         - Success metrics
      
      Focus on practical, cost-effective solutions suitable for SMBs.
      
      Return detailed JSON response with this structure:
      {
        "pain_points_identified": [{"name": "string", "severity": "high|medium|low", "cost_impact": "string"}],
        "recommended_solutions": [{"name": "string", "type": "technology|process|training", "roi": "string", "timeline": "string"}],
        "suggested_tools": [{"name": "string", "vendor": "string", "cost": "string", "complexity": "easy|moderate|complex"}],
        "implementation_plan": {"phases": [{"name": "string", "duration": "string", "activities": ["string"]}], "total_timeline": "string"},
        "roi_projection": {"implementation_cost": "string", "annual_savings": "string", "payback_period": "string"},
        "next_steps": ["string"],
        "confidence_score": 85
      }
    `;
    
    try {
      const response = await this.callGemini(solutionPrompt);
      const recommendations = JSON.parse(response);
      
      return {
        query: userQuery,
        industry,
        ...recommendations
      };
    } catch (error) {
      console.error('Solution recommendation failed:', error);
      return this.generateFallbackRecommendation(userQuery, industry);
    }
  }
  
  async suggestTools(userQuery: string, industry?: string): Promise<AdvisoryRecommendation> {
    const toolPrompt = `
      Recommend specific tools and technologies for this business need:
      
      Request: "${userQuery}"
      Industry: ${industry || 'General SMB'}
      
      For each recommended tool, provide:
      - Tool name and vendor
      - Exact cost (free/monthly/annual pricing)
      - Key features that address the need
      - Implementation difficulty (1-10 scale)
      - Learning curve timeline
      - Integration requirements
      - SMB suitability score (1-10)
      - Alternative options
      - Setup checklist
      
      Prioritize tools that are:
      - Cost-effective for SMBs
      - Easy to implement
      - Have good customer support
      - Integrate well with common business tools
      
      Return detailed JSON with tool recommendations.
    `;
    
    const response = await this.callGemini(toolPrompt);
    const tools = JSON.parse(response);
    
    return {
      query: userQuery,
      industry,
      pain_points_identified: [],
      recommended_solutions: [],
      suggested_tools: tools.tools || tools,
      implementation_plan: {
        phases: [],
        total_timeline: '2-8 weeks',
        success_factors: ['Proper training', 'Data migration', 'User adoption'],
        risk_factors: ['Integration challenges', 'Learning curve', 'Cost overruns']
      },
      roi_projection: {
        implementation_cost: 'Varies by tool selection',
        annual_savings: 'Tool-dependent',
        payback_period: '3-12 months',
        three_year_roi: '150-400%'
      },
      next_steps: ['Evaluate top 3 tools', 'Request demos', 'Check integration requirements'],
      confidence_score: 80
    };
  }
  
  async createImplementationPlan(userQuery: string, industry?: string): Promise<AdvisoryRecommendation> {
    const planPrompt = `
      Create a detailed implementation plan for this business initiative:
      
      Initiative: "${userQuery}"
      Industry: ${industry || 'General SMB'}
      
      Include:
      1. Phase-by-phase breakdown with timelines
      2. Resource requirements for each phase
      3. Risk mitigation strategies
      4. Success metrics and KPIs
      5. Budget allocation and cost estimates
      6. Change management considerations
      7. Training and adoption strategies
      
      Format as actionable project plan suitable for SMB implementation.
      Return detailed JSON response.
    `;
    
    const response = await this.callGemini(planPrompt);
    const plan = JSON.parse(response);
    
    return {
      query: userQuery,
      industry,
      pain_points_identified: plan.challenges || [],
      recommended_solutions: plan.solutions || [],
      suggested_tools: plan.tools || [],
      implementation_plan: plan.implementation_plan || {
        phases: [
          {
            name: 'Discovery & Planning',
            duration: '1-2 weeks',
            activities: ['Requirements gathering', 'Stakeholder interviews', 'Solution design'],
            deliverables: ['Requirements document', 'Implementation plan', 'Resource allocation']
          }
        ],
        total_timeline: '8-16 weeks',
        success_factors: ['Executive sponsorship', 'Clear communication', 'Proper training'],
        risk_factors: ['Scope creep', 'Resource constraints', 'User resistance']
      },
      roi_projection: plan.roi_projection || {
        implementation_cost: '$5,000-25,000',
        annual_savings: '$15,000-75,000',
        payback_period: '4-8 months',
        three_year_roi: '300-500%'
      },
      next_steps: plan.next_steps || ['Form project team', 'Secure budget approval', 'Begin discovery phase'],
      confidence_score: 85
    };
  }
  
  async generalAdvisoryResponse(userQuery: string, industry?: string): Promise<AdvisoryRecommendation> {
    return this.recommendSolutions(userQuery, industry);
  }
  
  async identifyPainPoints(userQuery: string, industry?: string): Promise<AdvisoryRecommendation> {
    return this.recommendSolutions(userQuery, industry);
  }
  
  async provideCostAnalysis(userQuery: string, industry?: string): Promise<AdvisoryRecommendation> {
    return this.recommendSolutions(userQuery, industry);
  }
  
  private async callGemini(prompt: string): Promise<string> {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { 
            temperature: 0.1, 
            maxOutputTokens: 4096,
            responseMimeType: "application/json"
          }
        })
      }
    );
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }
  
  private extractTopics(query: string): string[] {
    const topics = [];
    const businessTerms = [
      'customer service', 'inventory', 'cash flow', 'efficiency', 'quality',
      'scheduling', 'communication', 'automation', 'training', 'sales'
    ];
    
    for (const term of businessTerms) {
      if (query.toLowerCase().includes(term)) {
        topics.push(term);
      }
    }
    
    return topics;
  }
  
  private extractIndustryHints(query: string): string[] {
    const industries = [];
    const industryTerms = {
      'restaurant': ['restaurant', 'food', 'dining', 'kitchen', 'menu'],
      'retail': ['retail', 'store', 'shop', 'inventory', 'sales'],
      'manufacturing': ['manufacturing', 'production', 'factory', 'assembly'],
      'healthcare': ['healthcare', 'medical', 'patient', 'clinic'],
      'professional_services': ['consulting', 'legal', 'accounting', 'advisory']
    };
    
    for (const [industry, terms] of Object.entries(industryTerms)) {
      if (terms.some(term => query.toLowerCase().includes(term))) {
        industries.push(industry);
      }
    }
    
    return industries;
  }
  
  private assessUrgency(query: string): 'low' | 'medium' | 'high' | 'critical' {
    const urgentWords = ['urgent', 'asap', 'immediately', 'crisis', 'emergency'];
    const highPriorityWords = ['important', 'priority', 'soon', 'quickly'];
    
    const queryLower = query.toLowerCase();
    
    if (urgentWords.some(word => queryLower.includes(word))) {
      return 'critical';
    } else if (highPriorityWords.some(word => queryLower.includes(word))) {
      return 'high';
    } else if (queryLower.includes('when possible') || queryLower.includes('eventually')) {
      return 'low';
    }
    
    return 'medium';
  }
  
  private extractBudgetHints(query: string): string[] {
    const budgetHints = [];
    const budgetTerms = [
      'free', 'low cost', 'budget', 'affordable', 'cheap', 'expensive',
      'investment', 'roi', 'return on investment'
    ];
    
    for (const term of budgetTerms) {
      if (query.toLowerCase().includes(term)) {
        budgetHints.push(term);
      }
    }
    
    return budgetHints;
  }
  
  private generateFallbackRecommendation(userQuery: string, industry?: string): AdvisoryRecommendation {
    return {
      query: userQuery,
      industry,
      pain_points_identified: [
        {
          name: 'Business Challenge Identified',
          severity: 'medium',
          cost_impact: 'Varies by situation'
        }
      ],
      recommended_solutions: [
        {
          name: 'Process Analysis and Improvement',
          type: 'process',
          roi: '150-300%',
          timeline: '4-12 weeks'
        }
      ],
      suggested_tools: [
        {
          name: 'Business Process Analysis',
          vendor: 'Various',
          cost: 'Low to Medium',
          complexity: 'moderate'
        }
      ],
      implementation_plan: {
        phases: [
          {
            name: 'Assessment',
            duration: '2 weeks',
            activities: ['Current state analysis', 'Problem identification'],
            deliverables: ['Assessment report']
          }
        ],
        total_timeline: '8-12 weeks',
        success_factors: ['Clear objectives', 'Stakeholder buy-in'],
        risk_factors: ['Resource constraints', 'Change resistance']
      },
      roi_projection: {
        implementation_cost: '$2,000-15,000',
        annual_savings: '$10,000-50,000',
        payback_period: '3-6 months',
        three_year_roi: '200-400%'
      },
      next_steps: [
        'Define specific objectives',
        'Conduct detailed assessment',
        'Develop action plan'
      ],
      confidence_score: 70
    };
  }
  
  private generateErrorResponse(userQuery: string, errorMessage: string): AdvisoryRecommendation {
    return {
      query: userQuery,
      pain_points_identified: [],
      recommended_solutions: [],
      suggested_tools: [],
      implementation_plan: {
        phases: [],
        total_timeline: 'Unable to determine',
        success_factors: [],
        risk_factors: ['Analysis error: ' + errorMessage]
      },
      roi_projection: {
        implementation_cost: 'Unable to calculate',
        annual_savings: 'Unable to calculate',
        payback_period: 'Unable to calculate',
        three_year_roi: 'Unable to calculate'
      },
      next_steps: ['Please rephrase your question', 'Contact support if issue persists'],
      confidence_score: 0
    };
  }
}

export default AdvisoryQueryEngine;
