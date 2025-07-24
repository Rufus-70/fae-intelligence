'use client'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { ArrowRight, Search, Brain, Globe, Users, Settings, Star, Zap, FileText, Database } from 'lucide-react'

export default function AIResearchPlatformsPage() {
  return (
    <Container className="py-8">
      <div className="mb-6">
        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
          Advanced Level
        </div>
        <h1 className="text-4xl font-bold mb-4">Understanding Perplexity Spaces and Gemini Gems</h1>
        <p className="text-lg text-gray-700 mb-6">
          Master advanced AI research platforms to enhance manufacturing intelligence, market research, and competitive analysis capabilities.
        </p>
      </div>

      <div className="prose lg:prose-xl max-w-none">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Search className="h-6 w-6 mr-2 text-blue-600" />
          Module Objectives
        </h2>
        <p>By the end of this module, you will be able to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Navigate and utilize Perplexity Spaces for research projects</li>
          <li>Create and manage Gemini Gems for specialized tasks</li>
          <li>Develop research workflows using both platforms</li>
          <li>Integrate research findings into manufacturing decisions</li>
          <li>Build custom AI assistants for specific business needs</li>
          <li>Collaborate effectively using shared research spaces</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Globe className="h-6 w-6 mr-2 text-purple-600" />
          1. Introduction to Advanced Research Platforms
        </h2>
        
        <p>Modern AI research platforms go beyond simple chatbots to provide specialized environments for deep research, analysis, and collaboration.</p>
        
        <h3 className="text-xl font-semibold mb-2">Platform Comparison Overview</h3>
        
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Perplexity Spaces
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Real-time web search integration</li>
              <li>• Source citation and verification</li>
              <li>• Collaborative research workspaces</li>
              <li>• Industry-specific information gathering</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Gemini Gems
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Custom AI assistant creation</li>
              <li>• Specialized knowledge domains</li>
              <li>• Persistent context and memory</li>
              <li>• Integration with Google Workspace</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Manufacturing Applications</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Market Intelligence:</strong> Track industry trends, competitor activities, regulatory changes</li>
          <li><strong>Technical Research:</strong> Investigate new technologies, materials, and processes</li>
          <li><strong>Supplier Analysis:</strong> Research vendor capabilities, market position, financial stability</li>
          <li><strong>Compliance Monitoring:</strong> Stay current with changing regulations and standards</li>
          <li><strong>Innovation Tracking:</strong> Monitor emerging technologies and best practices</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Search className="h-6 w-6 mr-2 text-blue-600" />
          2. Mastering Perplexity Spaces
        </h2>

        <h3 className="text-xl font-semibold mb-2">What are Perplexity Spaces?</h3>
        <p><strong>Perplexity Spaces</strong> are collaborative research environments that combine AI-powered search with real-time web access, source verification, and team collaboration features.</p>

        <h4 className="text-lg font-semibold mb-1">Key Features</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Real-Time Search:</strong> Access to current web information and recent developments</li>
          <li><strong>Source Citations:</strong> Every response includes verifiable source links</li>
          <li><strong>Collaborative Workspaces:</strong> Shared research projects with team members</li>
          <li><strong>Research Threads:</strong> Organized conversation history around specific topics</li>
          <li><strong>Export Capabilities:</strong> Save and share research findings in various formats</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Setting Up Your Research Space</h3>

        <h4 className="text-lg font-semibold mb-1">Initial Configuration</h4>
        <ol className="list-decimal list-inside ml-4">
          <li>Create Perplexity Pro account for Spaces access</li>
          <li>Set up your first Space with descriptive naming</li>
          <li>Configure research focus areas and topics</li>
          <li>Invite relevant team members</li>
          <li>Establish research protocols and guidelines</li>
        </ol>

        <h4 className="text-lg font-semibold mb-1">Space Organization Strategies</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Project-Based Spaces:</strong> Separate spaces for major initiatives</li>
          <li><strong>Topic-Focused Spaces:</strong> Ongoing research areas (regulations, technology, competition)</li>
          <li><strong>Time-Sensitive Spaces:</strong> Urgent research needs or crisis response</li>
          <li><strong>Archive Spaces:</strong> Completed research for future reference</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Advanced Research Techniques</h3>

        <h4 className="text-lg font-semibold mb-1">Manufacturing Industry Research Queries</h4>

        <div className="space-y-4 my-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Competitive Intelligence</h5>
            <p className="text-sm italic">"Research [Competitor Name]'s recent product launches, market expansion, and manufacturing investments in the past 12 months. Include analysis of their strategic direction and potential impact on our market position."</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Technology Assessment</h5>
            <p className="text-sm italic">"Analyze the current state of [Technology/Process] adoption in manufacturing, including leading vendors, implementation costs, ROI data, and case studies from similar companies in our industry."</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Regulatory Monitoring</h5>
            <p className="text-sm italic">"Track recent changes to [Specific Regulation] requirements, including implementation timelines, compliance costs, and industry responses. Identify any upcoming changes or proposed modifications."</p>
          </div>
        </div>

        <h4 className="text-lg font-semibold mb-1">Research Validation Techniques</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Source Diversity:</strong> Verify information across multiple independent sources</li>
          <li><strong>Publication Credibility:</strong> Prioritize peer-reviewed, industry publications</li>
          <li><strong>Recency Verification:</strong> Confirm currency of information and check for updates</li>
          <li><strong>Expert Opinions:</strong> Seek industry expert perspectives and commentary</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Collaborative Research Workflows</h3>

        <h4 className="text-lg font-semibold mb-1">Team Research Process</h4>
        <ol className="list-decimal list-inside ml-4">
          <li><strong>Research Planning:</strong> Define objectives, scope, and success criteria</li>
          <li><strong>Task Distribution:</strong> Assign specific research areas to team members</li>
          <li><strong>Parallel Investigation:</strong> Conduct simultaneous research streams</li>
          <li><strong>Findings Integration:</strong> Combine insights in shared space</li>
          <li><strong>Analysis and Synthesis:</strong> Develop comprehensive conclusions</li>
          <li><strong>Decision Support:</strong> Create actionable recommendations</li>
        </ol>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Brain className="h-6 w-6 mr-2 text-green-600" />
          3. Creating and Using Gemini Gems
        </h2>

        <h3 className="text-xl font-semibold mb-2">What are Gemini Gems?</h3>
        <p><strong>Gemini Gems</strong> are custom AI assistants that you can create and train for specific tasks, domains, or workflows. They maintain persistent context and can be specialized for your unique business needs.</p>

        <h4 className="text-lg font-semibold mb-1">Core Capabilities</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Custom Instructions:</strong> Define specific behaviors and knowledge domains</li>
          <li><strong>Persistent Memory:</strong> Maintain context across multiple conversations</li>
          <li><strong>Specialized Knowledge:</strong> Focus on particular industries or functions</li>
          <li><strong>Workflow Integration:</strong> Connect with existing business processes</li>
          <li><strong>Team Sharing:</strong> Distribute custom assistants across organizations</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Manufacturing-Specific Gem Examples</h3>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Quality Assurance Specialist
            </h4>
            <ul className="text-sm space-y-1">
              <li>• ISO 9001 and industry standard expertise</li>
              <li>• Root cause analysis guidance</li>
              <li>• Corrective action development</li>
              <li>• Audit preparation assistance</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Maintenance Planner
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Preventive maintenance scheduling</li>
              <li>• Equipment lifecycle management</li>
              <li>• Spare parts optimization</li>
              <li>• Downtime impact analysis</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Regulatory Compliance Advisor
            </h4>
            <ul className="text-sm space-y-1">
              <li>• FDA, OSHA, EPA requirement tracking</li>
              <li>• Compliance gap analysis</li>
              <li>• Documentation requirements</li>
              <li>• Training needs assessment</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Lean Manufacturing Consultant
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Waste identification and elimination</li>
              <li>• Value stream mapping guidance</li>
              <li>• Continuous improvement initiatives</li>
              <li>• Performance metrics development</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Creating Your First Gem</h3>

        <h4 className="text-lg font-semibold mb-1">Step-by-Step Creation Process</h4>
        <ol className="list-decimal list-inside ml-4">
          <li><strong>Define Purpose:</strong> Clearly articulate the Gem's role and responsibilities</li>
          <li><strong>Specify Knowledge Domain:</strong> Identify relevant expertise areas</li>
          <li><strong>Set Behavioral Guidelines:</strong> Define communication style and approach</li>
          <li><strong>Create Context Instructions:</strong> Provide background and constraints</li>
          <li><strong>Test and Refine:</strong> Iterate based on initial interactions</li>
          <li><strong>Deploy and Share:</strong> Make available to relevant team members</li>
        </ol>

        <h4 className="text-lg font-semibold mb-1">Example Gem Configuration</h4>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p><strong>Manufacturing Safety Advisor Gem:</strong></p>
          <p className="text-sm">
            <strong>Role:</strong> You are an expert manufacturing safety advisor with 20+ years of experience in industrial safety management, OSHA compliance, and risk assessment.
          </p>
          <p className="text-sm">
            <strong>Expertise:</strong> OSHA regulations, hazard identification, safety training development, incident investigation, safety program development, PPE selection, and emergency response planning.
          </p>
          <p className="text-sm">
            <strong>Communication Style:</strong> Professional but accessible, emphasizing practical implementation and compliance. Always prioritize worker safety and regulatory compliance.
          </p>
          <p className="text-sm">
            <strong>Output Format:</strong> Provide specific, actionable recommendations with relevant OSHA citations when applicable.
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-2">Advanced Gem Management</h3>

        <h4 className="text-lg font-semibold mb-1">Version Control and Updates</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Regular Reviews:</strong> Assess Gem performance and accuracy monthly</li>
          <li><strong>Knowledge Updates:</strong> Incorporate new regulations, standards, and best practices</li>
          <li><strong>User Feedback:</strong> Collect and integrate user experiences and suggestions</li>
          <li><strong>Performance Metrics:</strong> Track usage patterns and effectiveness</li>
        </ul>

        <h4 className="text-lg font-semibold mb-1">Team Integration Strategies</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Role-Based Access:</strong> Assign Gems based on job functions and responsibilities</li>
          <li><strong>Training Sessions:</strong> Educate teams on effective Gem utilization</li>
          <li><strong>Integration Workflows:</strong> Embed Gems into existing business processes</li>
          <li><strong>Success Metrics:</strong> Measure impact on productivity and decision quality</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Database className="h-6 w-6 mr-2 text-teal-600" />
          4. Building Integrated Research Workflows
        </h2>

        <h3 className="text-xl font-semibold mb-2">Platform Integration Strategies</h3>

        <h4 className="text-lg font-semibold mb-1">Research Workflow Design</h4>
        <ol className="list-decimal list-inside ml-4">
          <li><strong>Initial Research (Perplexity Spaces):</strong> Broad information gathering and source identification</li>
          <li><strong>Analysis and Synthesis (Gemini Gems):</strong> Deep analysis using specialized domain expertise</li>
          <li><strong>Validation and Verification:</strong> Cross-platform fact-checking and source validation</li>
          <li><strong>Decision Support:</strong> Generate actionable recommendations and implementation plans</li>
          <li><strong>Documentation and Sharing:</strong> Create comprehensive reports and distribute findings</li>
        </ol>

        <h3 className="text-xl font-semibold mb-2">Manufacturing Decision Support Examples</h3>

        <h4 className="text-lg font-semibold mb-1">Equipment Purchase Decision</h4>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p><strong>Workflow:</strong></p>
          <ol className="list-decimal list-inside ml-4 text-sm">
            <li><strong>Market Research (Perplexity):</strong> Identify vendors, compare specifications, analyze reviews</li>
            <li><strong>Technical Analysis (Gem):</strong> Manufacturing Equipment Specialist Gem analyzes technical requirements</li>
            <li><strong>Financial Assessment (Gem):</strong> Finance Advisor Gem calculates ROI and total cost of ownership</li>
            <li><strong>Risk Evaluation (Perplexity):</strong> Research vendor stability, support quality, industry reputation</li>
            <li><strong>Recommendation Synthesis:</strong> Combine all analyses into decision matrix</li>
          </ol>
        </div>

        <h4 className="text-lg font-semibold mb-1">Market Entry Analysis</h4>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p><strong>Workflow:</strong></p>
          <ol className="list-decimal list-inside ml-4 text-sm">
            <li><strong>Market Intelligence (Perplexity):</strong> Research market size, growth trends, competitive landscape</li>
            <li><strong>Regulatory Analysis (Gem):</strong> Compliance Advisor Gem identifies regulatory requirements</li>
            <li><strong>Competitive Analysis (Perplexity):</strong> Deep dive on key competitors and market positioning</li>
            <li><strong>Strategic Planning (Gem):</strong> Business Strategy Gem develops entry strategies and timelines</li>
            <li><strong>Risk Assessment:</strong> Combined platform analysis of market entry risks</li>
          </ol>
        </div>

        <h3 className="text-xl font-semibold mb-2">Quality Assurance for Research</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Cross-Platform Verification:</strong> Validate findings across multiple AI platforms</li>
          <li><strong>Human Expert Review:</strong> Have domain experts verify critical conclusions</li>
          <li><strong>Source Quality Assessment:</strong> Evaluate credibility and bias of information sources</li>
          <li><strong>Methodology Documentation:</strong> Record research approaches for reproducibility</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FileText className="h-6 w-6 mr-2 text-indigo-600" />
          5. Practical Implementation Examples
        </h2>

        <h3 className="text-xl font-semibold mb-2">Case Study 1: Sustainability Initiative Research</h3>
        <p><strong>Challenge:</strong> Develop comprehensive sustainability program for manufacturing operations</p>
        
        <h4 className="text-lg font-semibold mb-1">Research Approach:</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Industry Benchmarking (Perplexity):</strong> Research sustainability practices of industry leaders</li>
          <li><strong>Regulatory Requirements (Gem):</strong> Environmental Compliance Gem identifies relevant regulations</li>
          <li><strong>Technology Assessment (Perplexity):</strong> Evaluate available green technologies and solutions</li>
          <li><strong>Cost-Benefit Analysis (Gem):</strong> Financial Analyst Gem calculates investment returns</li>
          <li><strong>Implementation Planning (Gem):</strong> Project Management Gem develops rollout strategy</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Case Study 2: Supply Chain Disruption Response</h3>
        <p><strong>Challenge:</strong> Rapidly assess and respond to critical supplier disruption</p>
        
        <h4 className="text-lg font-semibold mb-1">Crisis Research Protocol:</h4>
        <ol className="list-decimal list-inside ml-4">
          <li><strong>Immediate Impact Assessment (Perplexity):</strong> Research scope and duration of disruption</li>
          <li><strong>Alternative Supplier Research (Perplexity):</strong> Identify potential replacement vendors</li>
          <li><strong>Risk Analysis (Gem):</strong> Supply Chain Risk Gem evaluates various scenarios</li>
          <li><strong>Cost Impact Modeling (Gem):</strong> Finance Advisor Gem calculates financial implications</li>
          <li><strong>Action Plan Development (Gem):</strong> Crisis Management Gem creates response strategy</li>
        </ol>

        <h2 className="text-2xl font-semibold mb-4">Best Practices and Advanced Tips</h2>

        <h3 className="text-xl font-semibold mb-2">Research Efficiency Optimization</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Query Templates:</strong> Develop standardized research question formats</li>
          <li><strong>Source Libraries:</strong> Build curated lists of reliable information sources</li>
          <li><strong>Automation Workflows:</strong> Create repeatable research processes</li>
          <li><strong>Alert Systems:</strong> Set up monitoring for ongoing research topics</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Collaboration Enhancement</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Shared Gem Libraries:</strong> Maintain organization-wide custom assistant repository</li>
          <li><strong>Research Standards:</strong> Establish consistent methodology and documentation practices</li>
          <li><strong>Knowledge Sharing:</strong> Regular sessions to share research findings and insights</li>
          <li><strong>Continuous Improvement:</strong> Regularly evaluate and enhance research capabilities</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Summary & Next Steps</h2>

        <div className="bg-orange-50 p-6 rounded-lg my-6">
          <h4 className="text-lg font-semibold mb-3">What You've Learned</h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Advanced research capabilities of Perplexity Spaces</li>
            <li>Custom AI assistant creation with Gemini Gems</li>
            <li>Integration strategies for comprehensive research workflows</li>
            <li>Manufacturing-specific applications and use cases</li>
            <li>Quality assurance and validation techniques</li>
            <li>Collaborative research and knowledge sharing approaches</li>
          </ul>
        </div>

        <h4 className="text-lg font-semibold mb-3">Implementation Timeline</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Week 1:</strong> Set up Perplexity Spaces and create first research space</li>
          <li><strong>Week 2:</strong> Develop and test first specialized Gemini Gem</li>
          <li><strong>Week 3:</strong> Implement integrated research workflow for current project</li>
          <li><strong>Week 4:</strong> Train team members and establish collaboration protocols</li>
          <li><strong>Ongoing:</strong> Refine processes and expand research capabilities</li>
        </ul>

        <h4 className="text-lg font-semibold mb-3">Recommended Next Module</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Using Perplexity and Gemini as Project Hubs:</strong> Learn team collaboration and project management techniques</li>
        </ul>
      </div>

      <div className="mt-12 p-6 bg-orange-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-orange-800">Ready to Implement Advanced Research Capabilities?</h3>
        <p className="text-orange-700 mb-4">
          Get expert guidance on setting up these advanced AI research platforms for your specific manufacturing intelligence needs.
        </p>
        <Button 
          onClick={() => window.location.href = '/consultation'}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          Schedule Research Strategy Consultation
        </Button>
      </div>

      <div className="mt-8 flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => window.history.back()}
        >
          <ArrowRight className="w-4 h-4 mr-2 transform rotate-180" /> 
          Back to Resources
        </Button>
        <Button 
          onClick={() => window.location.href = '/resources/training/ai-project-hubs'}
        >
          Next: AI Project Hubs 
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Container>
  )
}