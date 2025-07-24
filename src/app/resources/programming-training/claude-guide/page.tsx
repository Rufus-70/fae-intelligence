'use client'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Bot, CheckCircle, AlertTriangle, BookOpen, Download, ExternalLink, Lightbulb, DollarSign, TrendingUp, Award, Target, Zap, MessageSquare, Shield, Code, GitBranch, Database, Settings, Brain, Layers, Search } from 'lucide-react'
import Link from 'next/link'

export default function ClaudeGuidePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <Container>
          <div className="text-center">
            <Layers className="h-16 w-16 text-blue-200 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Claude for Technical Projects: Advanced Reasoning for Manufacturing</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Leverage Claude's advanced reasoning capabilities for complex manufacturing projects, in-depth documentation, and strategic planning.
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
                <h3 className="font-semibold text-gray-900">Apply Advanced Prompt Engineering</h3>
                <p className="text-gray-700 text-sm">Tailor prompts for Claude's reasoning in technical manufacturing contexts.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <BookOpen className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Automate Technical Documentation</h3>
                <p className="text-gray-700 text-sm">Create comprehensive technical manuals and reports with Claude.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Utilize Claude for Strategic Analysis</h3>
                <p className="text-gray-700 text-sm">Process information for market analysis and strategic planning.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <Code className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Leverage Claude for Code Tasks</h3>
                <p className="text-gray-700 text-sm">Review code, debug, and solve complex programming problems.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <Brain className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Generate Detailed Insights</h3>
                <p className="text-gray-700 text-sm">Extract and analyze insights from large datasets and technical specifications.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <Shield className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Identify & Mitigate AI Biases</h3>
                <p className="text-gray-700 text-sm">Ensure ethical and responsible application of Claude in critical decisions.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <Zap className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Integrate Claude into Workflows</h3>
                <p className="text-gray-700 text-sm">Enhance efficiency in documentation, planning, and problem-solving.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Overview */}
      <section className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Claude for Manufacturing?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Claude's advanced reasoning and ability to handle complex, nuanced information make it an invaluable tool for manufacturing 
              professionals dealing with intricate technical challenges, strategic planning, and in-depth analysis. This guide focuses on practical 
              applications that deliver significant value to your operations.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <CheckCircle className="h-6 w-6 mr-2" />
                    Best Use Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Complex technical documentation & manuals</li>
                    <li>• Strategic market analysis & competitive intelligence</li>
                    <li>• Code review & debugging for industrial software</li>
                    <li>• Risk assessment & mitigation planning</li>
                    <li>• In-depth incident report analysis</li>
                    <li>• Multi-variable problem diagnosis</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-600">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    Important Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Requires precise and detailed prompting for optimal results</li>
                    <li>• May not have real-time data access (rely on provided context)</li>
                    <li>• Human expert review is crucial for all critical outputs</li>
                    <li>• Ethical implications of AI-driven strategic decisions</li>
                  </ul>
                  <h4 className="font-semibold text-gray-900 mt-4">Ethical Considerations:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>• Data Privacy: Ensure sensitive manufacturing data is handled securely.</li>
                    <li>• Bias Awareness: Be vigilant for biases in Claude's analysis, especially in strategic recommendations.</li>
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
            {/* Module 1: Advanced Prompt Engineering for Technical Tasks */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module 1: Advanced Prompt Engineering for Technical Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Master crafting precise prompts for Claude to elicit detailed and accurate responses for highly technical subjects relevant to manufacturing.
                </p>
                <h4 className="font-semibold text-gray-900 mt-4">Content:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Claude's Reasoning Strengths (Complex instructions, long contexts, nuanced reasoning)</li>
                  <li>Crafting Technical Prompts (Precision in technical language, Multi-step instructions, Contextual data integration)</li>
                  <li>Persona-Based Prompting for Technical Roles (e.g., Manufacturing Engineer, PLC Programmer)</li>
                  <li>Iterative Prompting for Technical Refinement (Refining Claude's responses for accuracy and depth)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Interactive Elements:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Technical Prompt Builder (Conceptual: web-based tool for prompt construction with real-time feedback)</li>
                  <li>Technical Prompt Refinement Challenge (Conceptual: refine sub-optimal prompt, compare to expert solution)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Assessment:</h4>
                <p className="text-gray-700 text-sm">Implicit assessment via Technical Prompt Builder success; formal assessment via Technical Prompt Refinement Challenge.</p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Module
                </Button>
              </CardContent>
            </Card>

            {/* Module 2: Claude for Documentation & Reporting */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module 2: Claude for Documentation & Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Automate the creation of comprehensive technical documentation and reports using Claude, ensuring precision and adherence to industry standards.
                </p>
                <h4 className="font-semibold text-gray-900 mt-4">Content:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Automating Technical Manuals & SOPs (Generating detailed manuals, compliance)</li>
                  <li>Quality Reports & Incident Summaries (Drafting comprehensive reports, incident summaries)</li>
                  <li>Data-Driven Reporting (Synthesizing information from technical specs, test results)</li>
                  <li>Case Study: Accelerating Technical Documentation at "Industrial Automation Solutions." (Focus on time savings, consistency, accuracy)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Interactive Elements:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Technical Report Generator (Conceptual: user inputs details, tool generates draft report for refinement)</li>
                  <li>Case Study: Automated Technical Manual Creation (Conceptual: text-based scenario with expert solution)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Assessment:</h4>
                <p className="text-gray-700 text-sm">Technical Report Generator Refinement Task (self-assessment against criteria).</p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Module
                </Button>
              </CardContent>
            </Card>

            {/* Module 3: Strategic Planning & Analysis with Claude */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module 3: Strategic Planning & Analysis with Claude</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Utilize Claude for strategic planning and analysis in manufacturing, including market analysis, competitive intelligence, and long-term strategic forecasting.
                </p>
                <h4 className="font-semibold text-gray-900 mt-4">Content:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Market Analysis & Competitive Intelligence (Analyzing market trends, competitive landscapes)</li>
                  <li>Risk Assessment & Mitigation Strategies (Identifying risks, generating mitigation plans)</li>
                  <li>Long-Term Strategic Planning (Developing roadmaps, scenario planning)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Interactive Elements:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Market Analysis Outline Builder (Conceptual: user defines segment, tool generates outline)</li>
                  <li>Risk Assessment Scenario (Conceptual: simulated strategic challenge, user prompts for risks/mitigation)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Assessment:</h4>
                <p className="text-gray-700 text-sm">Market Analysis Outline Builder & Risk Assessment Scenario (self-assessment against checklist).</p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Module
                </Button>
              </CardContent>
            </Card>

            {/* Module 4: Code-Related Tasks & Problem Solving */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module 4: Code-Related Tasks & Problem Solving</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Apply Claude's reasoning to code review, debugging, and complex problem-solving scenarios in manufacturing software systems.
                </p>
                <h4 className="font-semibold text-gray-900 mt-4">Content:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Code Review & Optimization (Reviewing code, identifying errors, suggesting optimizations)</li>
                  <li>Debugging Assistance (Analyzing error messages, logs, code behavior)</li>
                  <li>Complex Problem-Solving Scenarios (Breaking down intricate manufacturing problems)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Interactive Elements:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Code Review Assistant (Conceptual: user provides code snippet, tool simulates Claude's review)</li>
                  <li>Manufacturing Problem Diagnosis Simulation (Conceptual: simulated problem, user prompts Claude for diagnosis/solutions)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Assessment:</h4>
                <p className="text-gray-700 text-sm">Code Review Assistant & Manufacturing Problem Diagnosis Simulation (self-assessment against checklist; comparison with expert solutions).</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sample Manufacturing Prompts for Claude</h2>
            
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Technical Documentation Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">Prompt:</h4>
                    <p className="text-sm font-mono text-gray-800">
                      "You are a technical writer specializing in industrial machinery. 
                      Draft a detailed technical manual section for the [specific machine component] of our new [machine type]. 
                      Include: functional description, operating parameters, maintenance schedule, 
                      and common troubleshooting steps. Ensure clarity and precision for a manufacturing audience."
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Use for:</strong> Generating precise, comprehensive technical manuals.
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Strategic Market Analysis Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">Prompt:</h4>
                    <p className="text-sm font-mono text-gray-800">
                      "You are a market analyst for a robotics company. 
                      Analyze the current market for [specific type of industrial robot] in [region] over the last 3 years. 
                      Identify key growth drivers, major competitors, and potential regulatory changes. 
                      Provide a SWOT analysis and a 5-year market forecast. Cite sources from provided documents."
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Use for:</strong> Conducting in-depth market research and strategic planning.
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Code Debugging Assistance Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">Prompt:</h4>
                    <p className="text-sm font-mono text-gray-800">
                      "You are an expert Python developer specializing in industrial automation. 
                      Review the following Python script designed to [script purpose]. 
                      Identify any logical errors, potential bugs, or areas for optimization. 
                      Explain your findings and suggest corrected code snippets.
                      [Provide Python code snippet here]"
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Use for:</strong> Debugging and optimizing code for manufacturing applications.
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
                  <Download className="h-6 w-6 mr-2 text-blue-600" />
                  Advanced Prompt Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Download ready-to-use advanced prompt templates for complex manufacturing scenarios.
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
                  <ExternalLink className="h-6 w-6 mr-2 text-blue-600" />
                  Claude Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Direct links to Claude's platform with recommendations for accessing its advanced reasoning capabilities.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open('https://claude.ai', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Access Claude
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                  Technical Best Practices Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Comprehensive guide to Claude best practices specific to technical and strategic manufacturing environments.
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
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 1: Foundation & Advanced Prompting</h3>
                  <p className="text-gray-700">Set up Claude access, complete Module 1 training, and practice advanced technical prompts with your team.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 2-4: Documentation & Strategic Analysis</h3>
                  <p className="text-gray-700">Use Claude to draft 2-3 critical technical documents or conduct a preliminary market analysis. Focus on precision and actionable insights. <span className="text-sm text-gray-500">(Expected ROI: Up to 75% reduction in documentation lead time, accelerating product launches and compliance readiness.)</span></p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Month 2+: Code & Complex Problem Solving</h3>
                  <p className="text-gray-700">Apply Claude to code review, debugging, and diagnosing complex manufacturing issues. <span className="text-sm text-gray-500">(Expected ROI: Reduced machine downtime by 20%, saving $Z in lost production and maintenance costs.)</span></p>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mt-8">Case Study: Accelerating Technical Documentation at "Industrial Automation Solutions."</h3>
            <p className="text-gray-700 text-sm mt-2">Before Claude, drafting a complex technical manual took 40 hours. After, it takes 10 hours (75% time saving) with improved consistency and fewer errors. <span className="font-bold">ROI: 75% time savings, improved compliance.</span></p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Master Advanced AI for Your Manufacturing Operations?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get hands-on training and implementation support for Claude in your manufacturing environment.
            </p>
            <div className="space-x-4">
              <Button href="/consultation" variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Schedule Technical Consultation
              </Button>
              <Button href="/resources/programming-training" variant="secondary" size="lg" className="bg-blue-700 hover:bg-blue-800">
                Explore More AI Tools
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}