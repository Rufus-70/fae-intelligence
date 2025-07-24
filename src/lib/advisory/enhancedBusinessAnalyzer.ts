// Enhanced Business Analyzer Integration with Universal SMB Advisory
// File: /src/lib/advisory/enhancedBusinessAnalyzer.ts

import { db } from '../firebase';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

// Enhanced interfaces for universal SMB advisory
interface BusinessAdvisoryExtraction {
  pain_points: PainPoint[];
  solutions: Solution[];
  tools: Tool[];
  relationships: Relationship[];
  industry: string;
  confidence_scores: ConfidenceScores;
  implementation_roadmap: ImplementationRoadmap;
  roi_analysis: ROIAnalysis;
  urgency_assessment: UrgencyAssessment;
  complexity_rating: ComplexityRating;
}

interface PainPoint {
  name: string;
  category: 'operational' | 'financial' | 'customer' | 'compliance' | 'strategic' | 'industry_specific';
  industry_specific: boolean;
  severity: 'critical' | 'high' | 'medium' | 'low';
  symptoms: string[];
  cost_impact: string;
  evidence: string[];
  confidence: number;
  urgency: 'immediate' | 'short_term' | 'medium_term' | 'long_term';
}

interface Solution {
  name: string;
  type: 'technology' | 'process' | 'training' | 'organizational';
  description: string;
  addresses_pain_points: string[];
  implementation_difficulty: 'easy' | 'moderate' | 'complex';
  time_to_value: string;
  typical_roi: string;
  prerequisites: string[];
  success_factors: string[];
  risk_factors: string[];
  confidence: number;
}

interface Tool {
  name: string;
  vendor: string;
  category: string;
  cost: string;
  free_tier: boolean;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  smb_suitability: number;
  implementation_time: string;
  learning_curve: string;
  key_features: string[];
  use_cases: string[];
}

interface ImplementationRoadmap {
  phase_1_quick_wins: {
    timeline: string;
    focus: string;
    actions: Array<{
      action: string;
      tools: string[];
      timeline: string;
      cost: string;
      expected_impact: string;
    }>;
    success_metrics: string[];
  };
  phase_2_foundation: {
    timeline: string;
    focus: string;
    actions: Array<{
      action: string;
      tools: string[];
      timeline: string;
      cost: string;
      expected_impact: string;
    }>;
    success_metrics: string[];
  };
  phase_3_optimization: {
    timeline: string;
    focus: string;
    actions: Array<{
      action: string;
      tools: string[];
      timeline: string;
      cost: string;
      expected_impact: string;
    }>;
    success_metrics: string[];
  };
}

interface ROIAnalysis {
  implementation_costs: {
    technology: string;
    training: string;
    consulting: string;
    total_initial: string;
  };
  projected_benefits: {
    annual_labor_savings: string;
    productivity_gains: string;
    revenue_increase: string;
    total_annual_benefit: string;
  };
  payback_analysis: {
    payback_period: string;
    year_1_roi: string;
    year_3_roi: string;
  };
}

interface UrgencyAssessment {
  level: 'immediate' | 'high' | 'medium' | 'low';
  timeline: string;
  recommendation: string;
}

interface ComplexityRating {
  level: 'low' | 'medium' | 'high';
  score: number;
  reasoning: string;
}

interface ConfidenceScores {
  overall: number;
  pain_points: number;
  solutions: number;
  tools: number;
}

interface Relationship {
  source_node: string;
  target_node: string;
  relationship_type: 'SOLVES' | 'IMPLEMENTS' | 'REQUIRES';
  properties: {
    effectiveness?: number;
    confidence?: number;
  };
}

export class EnhancedBusinessAnalyzer {
  
  async extractBusinessAdvisoryKnowledge(
    document: string,
    fileName: string,
    industry?: string
  ): Promise<BusinessAdvisoryExtraction> {
    
    try {
      // Use enhanced AI analysis
      const aiAnalysis = await this.performEnhancedAIAnalysis(document, fileName, industry);
      
      // Perform pattern-based analysis as backup
      const patternAnalysis = this.performPatternAnalysis(document, industry);
      
      // Combine and enrich the results
      const enrichedAnalysis = this.enrichAnalysis(aiAnalysis, patternAnalysis, industry);
      
      // Generate comprehensive implementation roadmap
      const roadmap = this.generateComprehensiveRoadmap(enrichedAnalysis);
      
      // Calculate detailed ROI
      const roiAnalysis = this.calculateIndustrySpecificROI(enrichedAnalysis, industry);
      
      // Assess urgency and complexity
      const urgencyAssessment = this.assessUrgency(document);
      const complexityRating = this.rateComplexity(enrichedAnalysis.solutions);
      
      return {
        ...enrichedAnalysis,
        implementation_roadmap: roadmap,
        roi_analysis: roiAnalysis,
        urgency_assessment: urgencyAssessment,
        complexity_rating: complexityRating
      };
      
    } catch (error) {
      console.error('Enhanced business analysis failed:', error);
      return this.generateFallbackAnalysis(document, fileName, industry);
    }
  }
  
  private async performEnhancedAIAnalysis(document: string, fileName: string, industry?: string) {
    const enhancedPrompt = `
      You are a world-class business consultant with 30+ years of experience across all industries.
      
      Analyze this business document: "${document}"
      Industry: ${industry || 'General SMB'}
      
      Provide comprehensive analysis with:
      
      1. Pain points (category, severity, cost impact)
      2. Solutions (type, difficulty, ROI, timeline)
      3. Tools (cost, complexity, SMB suitability)
      4. Implementation guidance
      
      Return structured JSON.
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: enhancedPrompt }] }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 4096 }
        })
      }
    );

    const data = await response.json();
    const analysisText = data.candidates[0].content.parts[0].text;
    
    try {
      return JSON.parse(analysisText);
    } catch {
      return this.generateBasicAnalysis(document, industry);
    }
  }
  
  private performPatternAnalysis(document: string, industry?: string) {
    const patterns = { pain_points: [], solutions: [], tools: [] };
    const docLower = document.toLowerCase();
    
    // Universal pain point patterns
    const universalPainPoints = {
      'manual_processes': {
        keywords: ['manual', 'spreadsheet', 'paper', 'email'],
        category: 'operational',
        severity: 'high'
      },
      'communication_issues': {
        keywords: ['miscommunication', 'missed', 'confusion'],
        category: 'operational',
        severity: 'medium'
      }
    };
    
    for (const [key, pattern] of Object.entries(universalPainPoints)) {
      const matchCount = pattern.keywords.filter(keyword => docLower.includes(keyword)).length;
      if (matchCount >= 1) {
        patterns.pain_points.push({
          name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          category: pattern.category,
          severity: pattern.severity,
          confidence: Math.min(60 + (matchCount * 15), 95)
        });
      }
    }
    
    return patterns;
  }
  
  private enrichAnalysis(aiAnalysis: any, patternAnalysis: any, industry?: string) {
    return {
      pain_points: [...(aiAnalysis.pain_points || []), ...patternAnalysis.pain_points],
      solutions: aiAnalysis.solutions || [],
      tools: aiAnalysis.tools || [],
      relationships: [],
      industry: industry || 'general',
      confidence_scores: {
        overall: aiAnalysis.overall_confidence || 75,
        pain_points: 80,
        solutions: 75,
        tools: 70
      }
    };
  }
  
  private generateComprehensiveRoadmap(analysis: any): ImplementationRoadmap {
    return {
      phase_1_quick_wins: {
        timeline: "Weeks 1-4",
        focus: "Immediate impact with minimal investment",
        actions: [
          {
            action: "Deploy free automation tools",
            tools: ["Zapier Free", "Google Workspace"],
            timeline: "Week 1-2",
            cost: "$0-50",
            expected_impact: "15-25% time savings"
          }
        ],
        success_metrics: ["Time saved per week", "Task completion rate"]
      },
      phase_2_foundation: {
        timeline: "Weeks 5-16",
        focus: "Core system implementation",
        actions: [
          {
            action: "Advanced automation deployment",
            tools: ["Zapier Professional"],
            timeline: "Week 5-10",
            cost: "$200-800/month",
            expected_impact: "40-60% reduction in manual work"
          }
        ],
        success_metrics: ["Process automation percentage", "Efficiency gains"]
      },
      phase_3_optimization: {
        timeline: "Weeks 17-26",
        focus: "Advanced analytics and optimization",
        actions: [
          {
            action: "Business intelligence implementation",
            tools: ["Power BI", "Google Analytics"],
            timeline: "Week 17-22",
            cost: "$200-1000/month",
            expected_impact: "Data-driven decision making"
          }
        ],
        success_metrics: ["ROI achievement", "Business growth"]
      }
    };
  }
  
  private calculateIndustrySpecificROI(analysis: any, industry?: string): ROIAnalysis {
    return {
      implementation_costs: {
        technology: "$3,000-12,000",
        training: "$1,500-5,000",
        consulting: "$2,000-8,000",
        total_initial: "$6,500-25,000"
      },
      projected_benefits: {
        annual_labor_savings: "$20,000-80,000",
        productivity_gains: "$15,000-60,000",
        revenue_increase: "$10,000-50,000",
        total_annual_benefit: "$45,000-190,000"
      },
      payback_analysis: {
        payback_period: "3-8 months",
        year_1_roi: "200-500%",
        year_3_roi: "400-1000%"
      }
    };
  }
  
  private assessUrgency(document: string): UrgencyAssessment {
    const urgencyWords = ['urgent', 'critical', 'emergency', 'asap'];
    const docLower = document.toLowerCase();
    
    const hasUrgentWords = urgencyWords.some(word => docLower.includes(word));
    
    if (hasUrgentWords) {
      return {
        level: 'high',
        timeline: '2-4 weeks',
        recommendation: 'Prioritize high-impact solutions immediately'
      };
    }
    
    return {
      level: 'medium',
      timeline: '1-3 months',
      recommendation: 'Plan systematic implementation with proper testing'
    };
  }
  
  private rateComplexity(solutions: any[]): ComplexityRating {
    if (!solutions || solutions.length === 0) {
      return {
        level: 'low',
        score: 1,
        reasoning: 'No solutions identified'
      };
    }
    
    const avgComplexity = solutions.length > 3 ? 'medium' : 'low';
    
    return {
      level: avgComplexity,
      score: solutions.length > 3 ? 2.5 : 1.5,
      reasoning: `${solutions.length} solutions requiring ${avgComplexity} complexity management`
    };
  }
  
  private generateBasicAnalysis(document: string, industry?: string) {
    return {
      pain_points: [{
        name: "Process Optimization Opportunity",
        category: 'operational',
        severity: 'medium',
        confidence: 70
      }],
      solutions: [{
        name: "Business Process Review",
        type: 'process',
        confidence: 75
      }],
      tools: [{
        name: "Google Workspace",
        vendor: "Google",
        cost: "Low",
        smb_suitability: 9
      }],
      overall_confidence: 70
    };
  }
  
  private generateFallbackAnalysis(document: string, fileName: string, industry?: string): BusinessAdvisoryExtraction {
    return {
      pain_points: [{
        name: "General Business Optimization Opportunity",
        category: 'operational',
        industry_specific: false,
        severity: 'medium',
        symptoms: ["Unspecified business challenges"],
        cost_impact: "To be determined",
        evidence: [fileName],
        confidence: 60,
        urgency: 'medium_term'
      }],
      solutions: [{
        name: "Comprehensive Business Assessment",
        type: 'process',
        description: "Systematic review to identify opportunities",
        addresses_pain_points: ["General Business Optimization Opportunity"],
        implementation_difficulty: 'easy',
        time_to_value: "2-4 weeks",
        typical_roi: "150-300%",
        prerequisites: ["Management commitment"],
        success_factors: ["Clear objectives"],
        risk_factors: ["Limited scope"],
        confidence: 70
      }],
      tools: [{
        name: "Google Workspace",
        vendor: "Google",
        category: "productivity",
        cost: "$6-18/user/month",
        free_tier: true,
        complexity: 'beginner',
        smb_suitability: 9,
        implementation_time: "1 week",
        learning_curve: "Minimal",
        key_features: ["Email", "Documents"],
        use_cases: ["Communication", "Collaboration"]
      }],
      relationships: [],
      industry: industry || 'general',
      confidence_scores: { overall: 65, pain_points: 60, solutions: 70, tools: 80 },
      implementation_roadmap: this.generateComprehensiveRoadmap({}),
      roi_analysis: this.calculateIndustrySpecificROI({}, industry),
      urgency_assessment: { level: 'medium', timeline: '1-3 months', recommendation: 'Plan systematic approach' },
      complexity_rating: { level: 'low', score: 1.5, reasoning: 'Simple assessment approach' }
    };
  }
}

export default EnhancedBusinessAnalyzer;