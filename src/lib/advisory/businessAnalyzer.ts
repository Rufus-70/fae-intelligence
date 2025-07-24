// Business Advisory Knowledge Extractor for Fae Intelligence
// Transforms documents into actionable business intelligence

interface PainPoint {
  name: string;
  category: 'operational' | 'financial' | 'customer' | 'compliance' | 'strategic';
  industry_specific: boolean;
  severity: 'critical' | 'high' | 'medium' | 'low';
  symptoms: string[];
  cost_impact: string;
  evidence: string[];
  confidence: number;
}

interface Solution {
  name: string;
  type: 'technology' | 'process' | 'training' | 'organizational';
  addresses_pain_points: string[];
  implementation_difficulty: 'easy' | 'moderate' | 'complex';
  time_to_value: string;
  typical_roi: string;
  prerequisites: string[];
  evidence: string[];
  confidence: number;
}

interface Tool {
  name: string;
  category: 'software' | 'hardware' | 'methodology' | 'service';
  cost_range: 'free' | 'low' | 'medium' | 'high';
  implements_solutions: string[];
  vendor: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  smb_suitability: number;
  evidence: string[];
  confidence: number;
}

interface BusinessAdvisoryExtraction {
  pain_points: PainPoint[];
  solutions: Solution[];
  tools: Tool[];
  industry: string;
  overall_confidence: number;
}

export const extractBusinessAdvisoryKnowledge = async (
  document: string,
  fileName: string
): Promise<BusinessAdvisoryExtraction> => {
  
  const advisoryPrompt = `
    You are an expert business consultant with 30+ years of experience helping SMBs across all industries.
    
    Analyze this business document and extract the following information:
    
    1. BUSINESS PAIN POINTS:
       - What problems, challenges, or inefficiencies are mentioned?
       - What symptoms of larger issues are described?
       - What costs, delays, or frustrations are noted?
       
    2. BUSINESS SOLUTIONS:
       - What approaches, methods, or strategies are proposed?
       - What improvements or fixes are suggested?
       - What best practices are mentioned?
       
    3. TOOLS & TECHNOLOGIES:
       - What specific software, hardware, or methodologies are referenced?
       - What vendors, products, or services are mentioned?
       - What systems or platforms are discussed?
       
    4. INDUSTRY CONTEXT:
       - What industry does this document relate to?
       - What industry-specific terms or processes are mentioned?
       
    5. RELATIONSHIPS:
       - Which solutions address which pain points?
       - Which tools implement which solutions?
       - What are the cause-effect relationships?
       - What are the success factors and prerequisites?
    
    For each extraction, provide:
    - Confidence score (1-100)
    - Supporting evidence (exact quotes from document)
    - Severity/impact assessment
    - Industry relevance
    
    Return a structured JSON response with the following format:
    {
      "pain_points": [
        {
          "name": "string",
          "category": "operational|financial|customer|compliance|strategic",
          "industry_specific": true|false,
          "severity": "critical|high|medium|low",
          "symptoms": ["string"],
          "cost_impact": "string",
          "evidence": ["string"],
          "confidence": number
        }
      ],
      "solutions": [
        {
          "name": "string",
          "type": "technology|process|training|organizational",
          "addresses_pain_points": ["string"],
          "implementation_difficulty": "easy|moderate|complex",
          "time_to_value": "string",
          "typical_roi": "string",
          "prerequisites": ["string"],
          "evidence": ["string"],
          "confidence": number
        }
      ],
      "tools": [
        {
          "name": "string",
          "category": "software|hardware|methodology|service",
          "cost_range": "free|low|medium|high",
          "implements_solutions": ["string"],
          "vendor": "string",
          "complexity": "beginner|intermediate|advanced",
          "smb_suitability": number,
          "evidence": ["string"],
          "confidence": number
        }
      ],
      "industry": "string",
      "overall_confidence": number
    }
    
    Document: ${document}
    File Name: ${fileName}
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: advisoryPrompt }]
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 4096,
            responseMimeType: "application/json"
          }
        })
      }
    );

    const data = await response.json();
    const analysisText = data.candidates[0].content.parts[0].text;
    
    return JSON.parse(analysisText);
    
  } catch (error) {
    console.error('Business advisory analysis failed:', error);
    return generateFallbackAnalysis(document, fileName);
  }
};

const generateFallbackAnalysis = (document: string, fileName: string): BusinessAdvisoryExtraction => {
  // Fallback pattern-based analysis if AI fails
  const commonPainPoints = detectCommonPainPoints(document);
  const commonSolutions = detectCommonSolutions(document);
  const commonTools = detectCommonTools(document);
  
  return {
    pain_points: commonPainPoints,
    solutions: commonSolutions,
    tools: commonTools,
    industry: detectIndustry(document),
    overall_confidence: 60
  };
};

const detectCommonPainPoints = (document: string): PainPoint[] => {
  const painPoints: PainPoint[] = [];
  const text = document.toLowerCase();
  
  // Detect process inefficiencies
  if (text.includes('manual') || text.includes('slow') || text.includes('inefficient')) {
    painPoints.push({
      name: 'Manual Process Inefficiencies',
      category: 'operational',
      industry_specific: false,
      severity: 'medium',
      symptoms: ['Manual data entry', 'Slow processing', 'Human error'],
      cost_impact: '$2000-10000/month in lost productivity',
      evidence: ['Document mentions manual or slow processes'],
      confidence: 70
    });
  }
  
  // Detect customer service issues
  if (text.includes('customer') && (text.includes('complaint') || text.includes('wait') || text.includes('delay'))) {
    painPoints.push({
      name: 'Customer Service Issues',
      category: 'customer',
      industry_specific: false,
      severity: 'high',
      symptoms: ['Customer complaints', 'Long wait times', 'Service delays'],
      cost_impact: '$500-5000 per lost customer',
      evidence: ['Customer service issues mentioned'],
      confidence: 75
    });
  }
  
  // Detect financial issues
  if (text.includes('cash flow') || text.includes('payment') || text.includes('cost')) {
    painPoints.push({
      name: 'Financial Management Issues',
      category: 'financial',
      industry_specific: false,
      severity: 'high',
      symptoms: ['Cash flow problems', 'Late payments', 'Cost overruns'],
      cost_impact: 'Opportunity cost of capital',
      evidence: ['Financial issues mentioned'],
      confidence: 80
    });
  }
  
  return painPoints;
};

const detectCommonSolutions = (document: string): Solution[] => {
  const solutions: Solution[] = [];
  const text = document.toLowerCase();
  
  if (text.includes('automat') || text.includes('software') || text.includes('system')) {
    solutions.push({
      name: 'Process Automation',
      type: 'technology',
      addresses_pain_points: ['Manual Process Inefficiencies'],
      implementation_difficulty: 'moderate',
      time_to_value: '2-8 weeks',
      typical_roi: '200-500%',
      prerequisites: ['Process documentation', 'Change management'],
      evidence: ['Automation or technology mentioned'],
      confidence: 75
    });
  }
  
  if (text.includes('crm') || text.includes('customer management') || text.includes('service')) {
    solutions.push({
      name: 'Customer Relationship Management',
      type: 'technology',
      addresses_pain_points: ['Customer Service Issues'],
      implementation_difficulty: 'easy',
      time_to_value: '1-4 weeks',
      typical_roi: '150-400%',
      prerequisites: ['Customer data cleanup', 'Staff training'],
      evidence: ['CRM or customer management mentioned'],
      confidence: 80
    });
  }
  
  return solutions;
};

const detectCommonTools = (document: string): Tool[] => {
  const tools: Tool[] = [];
  const text = document.toLowerCase();
  
  // Common tools mentioned
  const toolMentions = [
    { name: 'Excel', vendor: 'Microsoft', category: 'software' as const },
    { name: 'QuickBooks', vendor: 'Intuit', category: 'software' as const },
    { name: 'Salesforce', vendor: 'Salesforce', category: 'software' as const },
    { name: 'HubSpot', vendor: 'HubSpot', category: 'software' as const },
    { name: 'Slack', vendor: 'Slack', category: 'software' as const },
    { name: 'Asana', vendor: 'Asana', category: 'software' as const },
    { name: 'Shopify', vendor: 'Shopify', category: 'software' as const }
  ];
  
  for (const tool of toolMentions) {
    if (text.includes(tool.name.toLowerCase())) {
      tools.push({
        name: tool.name,
        category: tool.category,
        cost_range: 'low',
        implements_solutions: ['Process Automation'],
        vendor: tool.vendor,
        complexity: 'beginner',
        smb_suitability: 8,
        evidence: [`${tool.name} mentioned in document`],
        confidence: 85
      });
    }
  }
  
  return tools;
};

const detectIndustry = (document: string): string => {
  const text = document.toLowerCase();
  
  const industryKeywords = {
    'restaurant': ['restaurant', 'food', 'dining', 'kitchen', 'menu', 'chef'],
    'retail': ['retail', 'store', 'shop', 'inventory', 'merchandise', 'sales'],
    'manufacturing': ['manufacturing', 'production', 'factory', 'assembly', 'quality control'],
    'healthcare': ['healthcare', 'medical', 'patient', 'clinic', 'hospital', 'treatment'],
    'professional_services': ['consulting', 'legal', 'accounting', 'advisory', 'professional'],
    'construction': ['construction', 'building', 'contractor', 'project', 'site']
  };
  
  for (const [industry, keywords] of Object.entries(industryKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return industry;
    }
  }
  
  return 'general';
};
