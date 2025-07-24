'use client'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Globe, Brain, Settings, Target, MessageSquare, FileText, Calendar, CheckCircle } from 'lucide-react'

export default function AIProjectHubsPage() {
  return (
    <Container className="py-8">
      <div className="mb-6">
        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
          Advanced Level
        </div>
        <h1 className="text-4xl font-bold mb-4">Using Perplexity and Gemini as Project Hubs</h1>
        <p className="text-lg text-gray-700 mb-6">
          Transform AI research platforms into comprehensive team collaboration centers for manufacturing projects and business initiatives.
        </p>
      </div>

      <div className="prose lg:prose-xl max-w-none">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Target className="h-6 w-6 mr-2 text-blue-600" />
          Module Objectives
        </h2>
        <p>By the end of this module, you will be able to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Set up project-specific collaboration hubs using AI platforms</li>
          <li>Manage team workflows and communication through AI assistants</li>
          <li>Create persistent project knowledge bases</li>
          <li>Coordinate cross-functional manufacturing projects</li>
          <li>Establish project governance and documentation standards</li>
          <li>Scale collaboration approaches across multiple initiatives</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Users className="h-6 w-6 mr-2 text-green-600" />
          1. Project Hub Fundamentals
        </h2>
        
        <p>AI project hubs combine the research capabilities of platforms like Perplexity and Gemini with structured project management approaches to create comprehensive collaboration environments.</p>
        
        <h3 className="text-xl font-semibold mb-2">Hub Architecture Overview</h3>
        
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Perplexity Project Spaces
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Real-time market and technical research</li>
              <li>• Collaborative investigation workflows</li>
              <li>• External information integration</li>
              <li>• Source verification and citation</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Gemini Project Assistants
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Custom project management Gems</li>
              <li>• Specialized domain expertise</li>
              <li>• Persistent project context</li>
              <li>• Workflow automation support</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Manufacturing Project Applications</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>New Product Development:</strong> Research, design, and launch coordination</li>
          <li><strong>Process Improvement:</strong> Lean initiatives and efficiency projects</li>
          <li><strong>Equipment Implementation:</strong> Installation, commissioning, and training</li>
          <li><strong>Compliance Projects:</strong> Regulatory preparation and audit coordination</li>
          <li><strong>Quality Initiatives:</strong> Problem-solving and corrective action projects</li>
          <li><strong>Strategic Planning:</strong> Market analysis and business development</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Settings className="h-6 w-6 mr-2 text-purple-600" />
          2. Setting Up Project Hubs
        </h2>

        <h3 className="text-xl font-semibold mb-2">Hub Configuration Strategy</h3>

        <h4 className="text-lg font-semibold mb-1">Project Structure Framework</h4>
        <ol className="list-decimal list-inside ml-4">
          <li><strong>Project Definition:</strong> Clear objectives, scope, and success criteria</li>
          <li><strong>Team Composition:</strong> Roles, responsibilities, and access levels</li>
          <li><strong>Hub Architecture:</strong> Platform selection and integration approach</li>
          <li><strong>Workflow Design:</strong> Process flows and collaboration protocols</li>
          <li><strong>Documentation Standards:</strong> Information organization and sharing guidelines</li>
          <li><strong>Success Metrics:</strong> KPIs and progress tracking mechanisms</li>
        </ol>

        <h4 className="text-lg font-semibold mb-1">Platform Assignment Logic</h4>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p><strong>Use Perplexity Spaces for:</strong></p>
          <ul className="list-disc list-inside ml-4 text-sm">
            <li>External research and market intelligence</li>
            <li>Competitive analysis and benchmarking</li>
            <li>Regulatory and compliance research</li>
            <li>Technology assessment and vendor evaluation</li>
          </ul>
          <p className="mt-3"><strong>Use Gemini Gems for:</strong></p>
          <ul className="list-disc list-inside ml-4 text-sm">
            <li>Project coordination and management</li>
            <li>Internal process optimization</li>
            <li>Technical problem-solving</li>
            <li>Team communication and decision support</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mb-2">Hub Setup Checklist</h3>

        <div className="space-y-4 my-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Phase 1: Foundation (Week 1)</h5>
            <ul className="text-sm space-y-1">
              <li>□ Define project charter and objectives</li>
              <li>□ Identify team members and stakeholders</li>
              <li>□ Create Perplexity Space for external research</li>
              <li>□ Develop specialized Gemini Gems for project roles</li>
              <li>□ Establish communication protocols</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Phase 2: Implementation (Week 2)</h5>
            <ul className="text-sm space-y-1">
              <li>□ Configure access permissions and sharing</li>
              <li>□ Upload initial project documentation</li>
              <li>□ Train team members on hub usage</li>
              <li>□ Establish regular review cycles</li>
              <li>□ Begin active project collaboration</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Phase 3: Optimization (Week 3-4)</h5>
            <ul className="text-sm space-y-1">
              <li>□ Refine workflows based on team feedback</li>
              <li>□ Expand Gem capabilities and knowledge</li>
              <li>□ Integrate with existing business systems</li>
              <li>□ Establish performance metrics and tracking</li>
              <li>□ Document best practices and lessons learned</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <MessageSquare className="h-6 w-6 mr-2 text-orange-600" />
          3. Team Workflow Management
        </h2>

        <h3 className="text-xl font-semibold mb-2">Collaborative Work Patterns</h3>

        <h4 className="text-lg font-semibold mb-1">Daily Operations Workflow</h4>
        <ol className="list-decimal list-inside ml-4">
          <li><strong>Morning Briefing (Gemini):</strong> Project Manager Gem provides daily status update</li>
          <li><strong>Task Assignment:</strong> AI assistant distributes work based on priorities and capacity</li>
          <li><strong>Research Activities (Perplexity):</strong> Team conducts external research in shared spaces</li>
          <li><strong>Progress Updates:</strong> Real-time collaboration and information sharing</li>
          <li><strong>End-of-Day Synthesis:</strong> AI compiles daily accomplishments and next steps</li>
        </ol>

        <h4 className="text-lg font-semibold mb-1">Weekly Coordination Cycle</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Monday Planning:</strong> AI-assisted project planning and resource allocation</li>
          <li><strong>Wednesday Check-in:</strong> Mid-week progress review and adjustment</li>
          <li><strong>Friday Review:</strong> Week accomplishments and next week preparation</li>
          <li><strong>Continuous Research:</strong> Ongoing market and technical intelligence gathering</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Role-Specific Hub Usage</h3>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Project Manager Hub Activities</h4>
            <ul className="text-sm space-y-1">
              <li>• Resource allocation and timeline management</li>
              <li>• Risk assessment and mitigation planning</li>
              <li>• Stakeholder communication coordination</li>
              <li>• Progress tracking and reporting</li>
            </ul>
          </div>
          
          <div className="bg-teal-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Technical Team Hub Activities</h4>
            <ul className="text-sm space-y-1">
              <li>• Technical research and problem-solving</li>
              <li>• Design collaboration and review</li>
              <li>• Specification development and validation</li>
              <li>• Testing and quality assurance coordination</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Business Team Hub Activities</h4>
            <ul className="text-sm space-y-1">
              <li>• Market research and competitive analysis</li>
              <li>• Financial modeling and cost analysis</li>
              <li>• Regulatory compliance and documentation</li>
              <li>• Customer feedback and requirements gathering</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Leadership Hub Activities</h4>
            <ul className="text-sm space-y-1">
              <li>• Strategic oversight and decision support</li>
              <li>• Resource approval and budget management</li>
              <li>• Executive reporting and communication</li>
              <li>• Cross-project coordination and prioritization</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FileText className="h-6 w-6 mr-2 text-red-600" />
          4. Project-Specific Implementation Examples
        </h2>

        <h3 className="text-xl font-semibold mb-2">Case Study 1: New Equipment Installation Project</h3>
        
        <h4 className="text-lg font-semibold mb-1">Project Setup</h4>
        <p><strong>Objective:</strong> Install and commission new CNC machining center within 12 weeks</p>
        
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p><strong>Hub Configuration:</strong></p>
          <ul className="list-disc list-inside ml-4 text-sm">
            <li><strong>Perplexity Space:</strong> "CNC Installation Research" - vendor comparisons, technical specifications, installation best practices</li>
            <li><strong>Project Manager Gem:</strong> Specialized in manufacturing equipment installations with timeline and resource management</li>
            <li><strong>Technical Specialist Gem:</strong> CNC machining expert for technical decision support</li>
            <li><strong>Compliance Advisor Gem:</strong> Safety and regulatory requirements for equipment installation</li>
          </ul>
        </div>

        <h4 className="text-lg font-semibold mb-1">Weekly Collaboration Pattern</h4>
        <ol className="list-decimal list-inside ml-4">
          <li><strong>Week 1-2:</strong> Vendor research and selection (Perplexity-heavy)</li>
          <li><strong>Week 3-4:</strong> Technical planning and preparation (Gemini-focused)</li>
          <li><strong>Week 5-8:</strong> Installation coordination (Both platforms)</li>
          <li><strong>Week 9-12:</strong> Commissioning and training (Gemini-heavy)</li>
        </ol>

        <h3 className="text-xl font-semibold mb-2">Case Study 2: Quality Improvement Initiative</h3>
        
        <h4 className="text-lg font-semibold mb-1">Project Setup</h4>
        <p><strong>Objective:</strong> Reduce defect rate by 50% within 6 months using Lean Six Sigma approaches</p>
        
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p><strong>Hub Configuration:</strong></p>
          <ul className="list-disc list-inside ml-4 text-sm">
            <li><strong>Perplexity Space:</strong> "Quality Best Practices Research" - industry benchmarks, case studies, methodology research</li>
            <li><strong>Six Sigma Black Belt Gem:</strong> DMAIC methodology guidance and statistical analysis support</li>
            <li><strong>Process Improvement Gem:</strong> Root cause analysis and corrective action development</li>
            <li><strong>Change Management Gem:</strong> Employee engagement and training coordination</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mb-2">Case Study 3: Market Expansion Research</h3>
        
        <h4 className="text-lg font-semibold mb-1">Project Setup</h4>
        <p><strong>Objective:</strong> Evaluate feasibility of entering European markets within 18 months</p>
        
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p><strong>Hub Configuration:</strong></p>
          <ul className="list-disc list-inside ml-4 text-sm">
            <li><strong>Perplexity Space:</strong> "European Market Research" - regulatory requirements, market analysis, competitor research</li>
            <li><strong>Market Research Analyst Gem:</strong> Market sizing, customer analysis, and competitive positioning</li>
            <li><strong>International Business Gem:</strong> Regulatory compliance, cultural considerations, and business development</li>
            <li><strong>Financial Analyst Gem:</strong> Investment analysis, risk assessment, and ROI modeling</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Calendar className="h-6 w-6 mr-2 text-indigo-600" />
          5. Project Governance and Documentation
        </h2>

        <h3 className="text-xl font-semibold mb-2">Documentation Standards</h3>

        <h4 className="text-lg font-semibold mb-1">Required Project Documentation</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Project Charter:</strong> Objectives, scope, success criteria, resource allocation</li>
          <li><strong>Research Archive:</strong> All Perplexity investigations with source citations</li>
          <li><strong>Decision Log:</strong> Key decisions with supporting analysis and rationale</li>
          <li><strong>Risk Register:</strong> Identified risks, impact assessment, mitigation strategies</li>
          <li><strong>Lessons Learned:</strong> Insights for future project improvement</li>
        </ul>

        <h4 className="text-lg font-semibold mb-1">AI-Assisted Documentation Workflow</h4>
        <ol className="list-decimal list-inside ml-4">
          <li><strong>Automated Summaries:</strong> Gemini generates daily and weekly project summaries</li>
          <li><strong>Research Compilation:</strong> Perplexity findings automatically organized and cited</li>
          <li><strong>Decision Documentation:</strong> AI captures decision rationale and supporting data</li>
          <li><strong>Progress Reports:</strong> Automated status reports for stakeholders</li>
          <li><strong>Archive Management:</strong> Systematic organization of project knowledge</li>
        </ol>

        <h3 className="text-xl font-semibold mb-2">Performance Tracking and KPIs</h3>

        <h4 className="text-lg font-semibold mb-1">Hub Effectiveness Metrics</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Collaboration Efficiency:</strong> Time to decision, information sharing speed</li>
          <li><strong>Research Quality:</strong> Source credibility, finding accuracy, insight generation</li>
          <li><strong>Team Engagement:</strong> Hub usage patterns, participation levels</li>
          <li><strong>Project Outcomes:</strong> Timeline adherence, budget performance, quality metrics</li>
        </ul>

        <h4 className="text-lg font-semibold mb-1">Continuous Improvement Process</h4>
        <ol className="list-decimal list-inside ml-4">
          <li><strong>Weekly Reviews:</strong> Team feedback on hub effectiveness</li>
          <li><strong>Monthly Analysis:</strong> Performance metrics review and optimization</li>
          <li><strong>Quarterly Assessment:</strong> Comprehensive evaluation and strategic adjustments</li>
          <li><strong>Best Practice Sharing:</strong> Cross-project learning and standardization</li>
        </ol>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
          6. Scaling and Advanced Implementation
        </h2>

        <h3 className="text-xl font-semibold mb-2">Multi-Project Coordination</h3>

        <h4 className="text-lg font-semibold mb-1">Portfolio Management Approach</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Resource Sharing:</strong> Cross-project Gem utilization and expertise sharing</li>
          <li><strong>Knowledge Transfer:</strong> Research findings applicable across multiple initiatives</li>
          <li><strong>Dependency Management:</strong> Cross-project impact analysis and coordination</li>
          <li><strong>Strategic Alignment:</strong> Portfolio-level decision support and prioritization</li>
        </ul>

        <h4 className="text-lg font-semibold mb-1">Enterprise Integration</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>ERP Integration:</strong> Connect hub activities with business systems</li>
          <li><strong>Communication Platforms:</strong> Integration with existing collaboration tools</li>
          <li><strong>Document Management:</strong> Seamless connection with corporate repositories</li>
          <li><strong>Reporting Systems:</strong> Automated feeding of executive dashboards</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Advanced Collaboration Features</h3>

        <h4 className="text-lg font-semibold mb-1">Cross-Functional Team Support</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Role-Based Views:</strong> Customized hub interfaces for different functions</li>
          <li><strong>Automated Workflows:</strong> AI-driven task routing and coordination</li>
          <li><strong>Expert Networks:</strong> AI-facilitated connection with subject matter experts</li>
          <li><strong>Decision Frameworks:</strong> Structured decision-making with AI support</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Best Practices and Success Factors</h2>

        <h3 className="text-xl font-semibold mb-2">Critical Success Factors</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Leadership Support:</strong> Executive sponsorship and resource allocation</li>
          <li><strong>Team Training:</strong> Comprehensive education on hub capabilities and usage</li>
          <li><strong>Clear Governance:</strong> Well-defined roles, responsibilities, and processes</li>
          <li><strong>Continuous Improvement:</strong> Regular evaluation and optimization of approaches</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Common Pitfalls to Avoid</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Tool Overload:</strong> Using too many platforms without clear purpose</li>
          <li><strong>Insufficient Training:</strong> Team members not fully utilizing hub capabilities</li>
          <li><strong>Poor Integration:</strong> Disconnected from existing business processes</li>
          <li><strong>Lack of Structure:</strong> Unclear workflows and collaboration protocols</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Summary & Next Steps</h2>

        <div className="bg-orange-50 p-6 rounded-lg my-6">
          <h4 className="text-lg font-semibold mb-3">What You've Learned</h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Project hub architecture and configuration strategies</li>
            <li>Team workflow management using AI platforms</li>
            <li>Role-specific collaboration patterns and responsibilities</li>
            <li>Real-world implementation examples and case studies</li>
            <li>Project governance and documentation standards</li>
            <li>Scaling approaches for enterprise implementation</li>
          </ul>
        </div>

        <h4 className="text-lg font-semibold mb-3">Implementation Roadmap</h4>
        <ol className="list-decimal list-inside ml-4">
          <li><strong>Pilot Project (Month 1):</strong> Select small project for initial hub implementation</li>
          <li><strong>Team Training (Month 2):</strong> Comprehensive training on hub usage and workflows</li>
          <li><strong>Process Refinement (Month 3):</strong> Optimize based on pilot project learnings</li>
          <li><strong>Scaled Deployment (Month 4-6):</strong> Roll out to additional projects and teams</li>
          <li><strong>Enterprise Integration (Month 6+):</strong> Connect with broader business systems</li>
        </ol>

        <h4 className="text-lg font-semibold mb-3">Success Measurement</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Project Efficiency:</strong> Faster decision-making and reduced research time</li>
          <li><strong>Quality Improvement:</strong> Better-informed decisions and reduced rework</li>
          <li><strong>Team Satisfaction:</strong> Enhanced collaboration and communication</li>
          <li><strong>Business Impact:</strong> Improved project outcomes and ROI</li>
        </ul>
      </div>

      <div className="mt-12 p-6 bg-orange-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-orange-800">Ready to Transform Your Project Management?</h3>
        <p className="text-orange-700 mb-4">
          Get expert guidance on implementing AI-powered project hubs for your specific manufacturing environment and project portfolio.
        </p>
        <Button 
          onClick={() => window.location.href = '/consultation'}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          Schedule Project Hub Implementation Consultation
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
          onClick={() => window.location.href = '/resources/programming-training/mcp-docker-guide'}
        >
          Next: MCP & Docker Training 
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Container>
  )
}