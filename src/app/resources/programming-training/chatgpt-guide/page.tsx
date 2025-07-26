'use client'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Bot, CheckCircle, AlertTriangle, BookOpen, Download, ExternalLink, Lightbulb, DollarSign, TrendingUp, Award, Target, Zap, MessageSquare, Shield, Code, GitBranch, Database, Settings, Brain } from 'lucide-react'
import Link from 'next/link'

export default function ChatGPTGuidePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <Container>
          <div className="text-center">
            <Bot className="h-16 w-16 text-green-200 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">ChatGPT for Manufacturing Operations</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Master ChatGPT for manufacturing processes, quality control, team training, and operational efficiency.
              Learn prompt engineering techniques specifically designed for industrial applications.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation */}
      <section className="py-4 bg-gray-100">
        <Container>
          <Link href="/resources/programming-training" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Programming Training
          </Link>
        </Container>
      </section>

      {/* Refined Learning Objectives */}
      <section className="py-12 bg-blue-50">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What You Will Learn</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <Target className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Apply Foundational Prompt Engineering</h3>
                <p className="text-gray-700 text-sm">Effectively interact with ChatGPT, tailoring prompts for manufacturing contexts.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <BookOpen className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Generate Manufacturing Documentation</h3>
                <p className="text-gray-700 text-sm">Create accurate SOPs, work instructions, and troubleshooting guides.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Develop Quality Control Procedures</h3>
                <p className="text-gray-700 text-sm">Design precise QC checklists and inspection procedures.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <Shield className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Create Training & Safety Materials</h3>
                <p className="text-gray-700 text-sm">Produce engaging and informative content for manufacturing teams.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <MessageSquare className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Design Communication Templates</h3>
                <p className="text-gray-700 text-sm">Utilize templates for various operational scenarios to enhance clarity.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <AlertTriangle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Identify ChatGPT Limitations</h3>
                <p className="text-gray-700 text-sm">Implement human oversight strategies for safety-critical applications.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <Lightbulb className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Formulate Advanced Prompt Strategies</h3>
                <p className="text-gray-700 text-sm">Address complex problem-solving and multi-faceted tasks.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Outline Implementation Roadmap</h3>
                <p className="text-gray-700 text-sm">Integrate ChatGPT into operations for measurable efficiency gains.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <DollarSign className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Recognize Tangible ROI Opportunities</h3>
                <p className="text-gray-700 text-sm">Identify how ChatGPT reduces time, improves communication, and streamlines operations.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Overview */}
      <section className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why ChatGPT for Manufacturing?</h2>
            <p className="text-lg text-gray-700 mb-8">
              ChatGPT excels at understanding context and generating human-like responses, making it perfect for manufacturing 
              communications, documentation, training materials, and process optimization. This guide focuses on practical 
              applications that deliver immediate value to your operations.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-600">
                    <CheckCircle className="h-6 w-6 mr-2" />
                    Best Use Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Process documentation and SOPs <span className="text-sm text-gray-500">(Potential ROI: Up to 30% reduction in documentation creation time, leading to faster onboarding and improved compliance.)</span></li>
                    <li>• Training material creation</li>
                    <li>• Safety protocol development</li>
                    <li>• Quality control checklists</li>
                    <li>• Team communication templates <span className="text-sm text-gray-500">(Potential ROI: 15% improvement in communication clarity, reducing miscommunications and rework.)</span></li>
                    <li>• Troubleshooting guides</li>
                    <li>• Meeting summaries and action items</li>
                    <li>• Customer communication</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-600">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    Important Limitations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Cannot access real-time data <span className="text-sm text-gray-500">(Mitigation: Integrate with human-verified data sources.)</span></li>
                    <li>• May hallucinate specific facts <span className="text-sm text-gray-500">(Mitigation: Always cross-reference critical information with verified internal data sources or human experts.)</span></li>
                    <li>• Requires human verification for safety-critical content <span className="text-sm text-gray-500">(Mitigation: Establish clear human review protocols.)</span></li>
                    <li>• No direct system integration <span className="text-sm text-gray-500">(Mitigation: Utilize manual integration best practices or conceptualize API integration for automation.)</span></li>
                    <li>• Limited mathematical calculations <span className="text-sm text-gray-500">(Mitigation: Use specialized tools for complex calculations.)</span></li>
                    <li>• Cannot learn from your specific processes without context <span className="text-sm text-gray-500">(Mitigation: Provide rich, manufacturing-specific context in prompts.)</span></li>
                  </ul>
                  <h4 className="font-semibold text-gray-900 mt-4">Ethical Considerations:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Data Privacy: Be cautious with sensitive manufacturing data in prompts.</li>
                    <li>• Bias Awareness: Recognize potential biases in AI-generated content for critical decisions.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Modules */}
      <section className="py-12 bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Training Modules</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Module 1: Manufacturing Prompt Fundamentals */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module 1: Manufacturing Prompt Fundamentals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Learn to structure prompts for manufacturing contexts, including role-setting, context provision, 
                  and output formatting specific to industrial operations.
                </p>
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Topics:</strong> Role-based prompting, manufacturing context, safety considerations, output formatting
                </div>
                <h4 className="font-semibold text-gray-900 mt-4">Content:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Anatomy of a Manufacturing Prompt (Role, Task, Context, Format, Constraints)</li>
                  <li>Best Practices for Manufacturing Prompting (Clarity, Iterative, Chain-of-Thought, Few-Shot)</li>
                  <li>Ethical Considerations in Prompting (Data Privacy, Bias Awareness, Human Oversight)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Interactive Elements:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Guided Prompt Builder (Conceptual: web-based tool for prompt construction with real-time feedback)</li>
                  <li>Prompt Component Matching Quiz (Conceptual: drag-and-drop/multiple-choice quiz)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Assessment:</h4>
                <p className="text-gray-700 text-sm">Implicit assessment via Guided Prompt Builder success; formal assessment via Prompt Component Matching Quiz.</p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Module
                </Button>
              </CardContent>
            </Card>

            {/* Module 2: Process Documentation */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module 2: Process Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Generate comprehensive SOPs, work instructions, and process documentation using ChatGPT. 
                  Learn templates and techniques for consistent, clear documentation.
                </p>
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Topics:</strong> SOP generation, work instructions, process maps, documentation standards
                </div>
                <h4 className="font-semibold text-gray-900 mt-4">Content:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>SOP Generation with ChatGPT (Structuring SOPs, Prompting for Specificity, Visuals)</li>
                  <li>Work Instructions & Checklists (Concise instructions, effective checklists)</li>
                  <li>Compliance & Version Control (Meeting standards, managing changes)</li>
                  <li>Case Study: Automating SOP Creation at "Precision Parts Co." (Focus on time savings and consistency)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Interactive Elements:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>SOP Generator (Conceptual: user inputs details, tool generates draft SOP for refinement)</li>
                  <li>Case Study: Documentation Dilemma (Conceptual: text-based scenario with expert solution)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Assessment:</h4>
                <p className="text-gray-700 text-sm">SOP Generator Refinement Task (self-assessment against checklist).</p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Module
                </Button>
              </CardContent>
            </Card>

            {/* Module 3: Quality Control Applications */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module 3: Quality Control Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Create quality control checklists, inspection procedures, and corrective action templates. 
                  Focus on precision and compliance requirements.
                </p>
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Topics:</strong> QC checklists, CAPA templates, inspection procedures, compliance documentation
                </div>
                <h4 className="font-semibold text-gray-900 mt-4">Content:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Designing QC Checklists (Prompting for inspection points, criteria, tolerances)</li>
                  <li>Corrective Action/Preventive Action (CAPA) Reports (Drafting CAPA reports, root cause analysis)</li>
                  <li>Statistical Process Control (SPC) Support (Generating explanations, interpreting variations)</li>
                  <li>Case Study: Improving Defect Reporting at "Global Manufacturing Inc." (Focus on accuracy and speed)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Interactive Elements:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>QC Checklist Builder (Conceptual: user defines product/process, tool generates checklist)</li>
                  <li>CAPA Report Drafting Scenario (Conceptual: simulated quality deviation, user drafts report)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Assessment:</h4>
                <p className="text-gray-700 text-sm">QC Checklist Builder & CAPA Report Drafting Scenario (self-assessment against checklist).</p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Module
                </Button>
              </CardContent>
            </Card>

            {/* Module 4: Training & Safety Materials */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module 4: Training & Safety Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Develop training curricula, safety protocols, and onboarding materials. 
                  Learn to create engaging, clear training content for manufacturing teams.
                </p>
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Topics:</strong> Training curricula, safety protocols, onboarding guides, skill assessments
                </div>
                <h4 className="font-semibold text-gray-900 mt-4">Content:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Developing Training Curricula (Prompting for objectives, outlines, content summaries)</li>
                  <li>Safety Protocols & Warnings (Drafting clear safety procedures, compliance)</li>
                  <li>Onboarding Materials (Generating content for new employee onboarding)</li>
                  <li>Case Study: Streamlining Onboarding at "Industrial Solutions Ltd." (Focus on consistency and efficiency)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Interactive Elements:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Training Outline Generator (Conceptual: user inputs topic/audience/duration, tool generates outline)</li>
                  <li>Safety Brief Creator (Conceptual: user inputs hazard, tool drafts protocol/warning)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Assessment:</h4>
                <p className="text-gray-700 text-sm">Training Outline Generator & Safety Protocol Creator (self-assessment against rubric).</p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Module
                </Button>
              </CardContent>
            </Card>

            {/* Module 5: Communication Templates */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module 5: Communication Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Create effective templates for shift handovers, incident reports, customer communications, 
                  and internal memos. Improve consistency and clarity.
                </p>
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Topics:</strong> Shift reports, incident documentation, customer communication, internal memos
                </div>
                <h4 className="font-semibold text-gray-900 mt-4">Content:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Shift Handovers & Production Updates (Templates for clear communications)</li>
                  <li>Incident Reports & Crisis Communication (Drafting structured reports, internal/external templates)</li>
                  <li>Internal Memos & Announcements (Generating professional internal communications)</li>
                  <li>Customer & Supplier Communications (Creating templates for various interactions)</li>
                  <li>Case Study: Enhancing Internal Communication at "Assembly Line Innovations." (Focus on clarity and consistency)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Interactive Elements:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Customizable Template Builder (Conceptual: user selects type, inputs variables, tool generates customized message)</li>
                  <li>Incident Response Simulation (Conceptual: simulated incident, user drafts communications)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Assessment:</h4>
                <p className="text-gray-700 text-sm">Customizable Template Builder & Incident Response Simulation (self-assessment against checklist).</p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Module
                </Button>
              </CardContent>
            </Card>

            {/* Module 6: Advanced Techniques */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module 6: Advanced Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Learn advanced prompt engineering, chain-of-thought reasoning, and integration strategies 
                  for complex manufacturing scenarios and multi-step processes.
                </p>
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Topics:</strong> Advanced prompting, reasoning chains, integration strategies, automation
                </div>
                <h4 className="font-semibold text-gray-900 mt-4">Content:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Advanced Prompt Engineering Deep Dive (Few-Shot, Chain-of-Thought, Self-Correction, Iterative)</li>
                  <li>Integrating ChatGPT into Workflows (Manual best practices, API overview, Data Handling & Security)</li>
                  <li>Multi-Step Manufacturing Problem Solving (Diagnosing faults, optimizing schedules, supply chain risk)</li>
                  <li>Case Study: AI-Assisted Troubleshooting at "Robotics Manufacturing Co." (Focus on efficiency and accuracy)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Interactive Elements:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Advanced Prompt Challenge (Conceptual: complex problem, user crafts prompt, simulated feedback)</li>
                  <li>Workflow Integration Mapper (Conceptual: interactive diagram for ChatGPT integration points)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Assessment:</h4>
                <p className="text-gray-700 text-sm">Advanced Prompt Challenge (feedback on prompt quality and effectiveness).</p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Module
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Sample Prompts */}
      <section className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sample Manufacturing Prompts</h2>
            
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Process Documentation Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">Prompt:</h4>
                    <p className="text-sm font-mono text-gray-800">
                      &quot;You are an experienced manufacturing engineer creating standard operating procedures. 
                      Create a detailed SOP for [specific process] that includes: safety requirements, 
                      required tools and materials, step-by-step instructions, quality checkpoints, 
                      and troubleshooting steps. Format as a numbered procedure with clear headings.&quot;
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Use for:</strong> Creating consistent, comprehensive SOPs for any manufacturing process
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Quality Control Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">Prompt:</h4>
                    <p className="text-sm font-mono text-gray-800">
                      &quot;Create a quality control inspection checklist for [product/process]. Include: 
                      visual inspection points, measurement requirements with tolerances, 
                      pass/fail criteria, required documentation, and escalation procedures for defects. 
                      Format as a checklist with checkboxes and signature lines.&quot;
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Use for:</strong> Standardizing quality inspections and ensuring consistency
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Training Material Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">Prompt:</h4>
                    <p className="text-sm font-mono text-gray-800">
                      &quot;Design a 30-minute training session for new employees on [topic]. Include: 
                      learning objectives, key safety points, hands-on activities, 
                      knowledge check questions, and required materials. 
                      Structure for easy delivery by supervisors.&quot;
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Use for:</strong> Creating structured, effective training programs
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Resources & Tools */}
      <section className="py-12 bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Additional Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="h-6 w-6 mr-2 text-green-600" />
                  Prompt Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Download ready-to-use prompt templates for common manufacturing scenarios.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Templates
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ExternalLink className="h-6 w-6 mr-2 text-green-600" />
                  ChatGPT Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Direct links to ChatGPT with recommendations for free vs. paid plans for manufacturing use.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open('https://chat.openai.com', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Access ChatGPT
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-green-600" />
                  Best Practices Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Comprehensive guide to ChatGPT best practices specific to manufacturing environments.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Implementation Guide */}
      <section className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Implementation Roadmap</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 1: Foundation Setup</h3>
                  <p className="text-gray-700">Create ChatGPT account, complete Module 1 training, and practice basic manufacturing prompts with your team.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 2-3: Process Documentation</h3>
                  <p className="text-gray-700">Use ChatGPT to create or improve 2-3 critical SOPs. Focus on clarity, safety, and completeness. <span className="text-sm text-gray-500">(Expected ROI: 20% reduction in documentation time, improved compliance accuracy.)</span></p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 4: Quality & Training Materials</h3>
                  <p className="text-gray-700">Develop quality control checklists and training materials for new employee onboarding.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 font-bold">4</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Month 2+: Advanced Applications</h3>
                  <p className="text-gray-700">Implement communication templates, advanced prompting techniques, and team-wide adoption strategies.</p>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mt-8">Case Study: Automating SOP Creation at "Precision Parts Co."</h3>
            <p className="text-gray-700 text-sm mt-2">Before ChatGPT, creating an SOP took 8 hours. After, it takes 2 hours (75% time saving). This led to improved consistency and reduced errors. <span className="font-bold">ROI: 75% time savings, improved compliance.</span></p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Manufacturing Communications and Boost Your ROI?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get hands-on training and implementation support for ChatGPT in your manufacturing environment.
            </p>
            <div className="space-x-4">
              <Button href="/consultation" variant="outline" size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Schedule Implementation Call
              </Button>
              <Button href="/resources/programming-training" variant="secondary" size="lg" className="bg-green-700 hover:bg-green-800">
                Explore More AI Tools
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}