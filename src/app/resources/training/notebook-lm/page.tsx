'use client'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Upload, Brain, Search, FileText, Users, Lightbulb, Settings } from 'lucide-react'

export default function NotebookLMPage() {
  return (
    <Container className="py-8">
      <div className="mb-6">
        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
          Advanced Level
        </div>
        <h1 className="text-4xl font-bold mb-4">Utilizing Notebook LM</h1>
        <p className="text-lg text-gray-700 mb-6">
          Master Google's NotebookLM for advanced knowledge management, document analysis, and research synthesis in manufacturing environments.
        </p>
      </div>

      <div className="prose lg:prose-xl max-w-none">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
          Module Objectives
        </h2>
        <p>By the end of this module, you will be able to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Set up and configure NotebookLM for business use</li>
          <li>Upload and organize manufacturing documents effectively</li>
          <li>Generate insights from technical documentation</li>
          <li>Create comprehensive research summaries</li>
          <li>Build knowledge bases for team collaboration</li>
          <li>Integrate NotebookLM into manufacturing workflows</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Brain className="h-6 w-6 mr-2 text-green-600" />
          1. What is NotebookLM?
        </h2>
        
        <p><strong>NotebookLM</strong> is Google's experimental AI-powered research and writing assistant that allows you to upload documents and interact with them through natural language queries.</p>
        
        <h3 className="text-xl font-semibold mb-2">Key Capabilities</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Document Upload:</strong> PDFs, Google Docs, text files, web articles</li>
          <li><strong>Intelligent Analysis:</strong> Summarizes, analyzes, and extracts insights</li>
          <li><strong>Source-Grounded Responses:</strong> All answers cite specific document sections</li>
          <li><strong>Multi-Document Synthesis:</strong> Combines information across multiple sources</li>
          <li><strong>Interactive Q&A:</strong> Ask questions about uploaded content</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Why NotebookLM for Manufacturing?</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Technical Documentation:</strong> Analyze complex manuals, specifications, and procedures</li>
          <li><strong>Compliance Research:</strong> Navigate regulatory documents and standards</li>
          <li><strong>Vendor Analysis:</strong> Compare proposals, specifications, and contracts</li>
          <li><strong>Knowledge Retention:</strong> Preserve institutional knowledge from retiring experts</li>
          <li><strong>Training Development:</strong> Create comprehensive training materials from multiple sources</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Settings className="h-6 w-6 mr-2 text-purple-600" />
          2. Getting Started with NotebookLM
        </h2>

        <h3 className="text-xl font-semibold mb-2">Account Setup</h3>
        <ol className="list-decimal list-inside ml-4">
          <li>Visit <strong>notebooklm.google.com</strong></li>
          <li>Sign in with your Google account</li>
          <li>Accept terms and access the workspace</li>
          <li>Create your first notebook</li>
        </ol>

        <h3 className="text-xl font-semibold mb-2">Understanding the Interface</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Sources Panel:</strong> Uploaded documents and materials</li>
          <li><strong>Chat Interface:</strong> Ask questions about your sources</li>
          <li><strong>Notebook View:</strong> Create and organize notes</li>
          <li><strong>Summary Generator:</strong> Automatic document summaries</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">First Steps Checklist</h3>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <ul className="list-none space-y-2">
            <li>□ Create Google account (if needed)</li>
            <li>□ Access NotebookLM interface</li>
            <li>□ Upload first test document</li>
            <li>□ Ask basic questions about content</li>
            <li>□ Review source citations</li>
            <li>□ Generate initial summary</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Upload className="h-6 w-6 mr-2 text-orange-600" />
          3. Document Upload and Organization
        </h2>

        <h3 className="text-xl font-semibold mb-2">Supported File Types</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>PDFs:</strong> Equipment manuals, specifications, reports</li>
          <li><strong>Google Docs:</strong> Procedures, policies, meeting notes</li>
          <li><strong>Text Files:</strong> Data exports, logs, documentation</li>
          <li><strong>Web Articles:</strong> Industry research, technical articles</li>
          <li><strong>Google Slides:</strong> Presentation content</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Best Practices for Document Preparation</h3>

        <h4 className="text-lg font-semibold mb-1">Before Upload</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Clean OCR:</strong> Ensure scanned documents have good text recognition</li>
          <li><strong>Consistent Naming:</strong> Use descriptive, searchable file names</li>
          <li><strong>Remove Duplicates:</strong> Avoid uploading multiple versions of same content</li>
          <li><strong>Size Limits:</strong> Break large documents into logical sections</li>
        </ul>

        <h4 className="text-lg font-semibold mb-1">Organization Strategy</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Topic-Based Notebooks:</strong> Separate notebooks for different projects or systems</li>
          <li><strong>Version Control:</strong> Track document versions and update dates</li>
          <li><strong>Source Hierarchy:</strong> Upload foundational documents first</li>
          <li><strong>Related Content:</strong> Group complementary documents together</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Manufacturing Document Categories</h3>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Technical Documentation</h4>
            <ul className="text-sm space-y-1">
              <li>• Equipment manuals and specifications</li>
              <li>• Process procedures and work instructions</li>
              <li>• Quality standards and inspection criteria</li>
              <li>• Safety protocols and emergency procedures</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Business Documentation</h4>
            <ul className="text-sm space-y-1">
              <li>• Regulatory compliance documents</li>
              <li>• Vendor contracts and proposals</li>
              <li>• Training materials and certifications</li>
              <li>• Historical project reports</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Search className="h-6 w-6 mr-2 text-red-600" />
          4. Advanced Query Techniques
        </h2>

        <h3 className="text-xl font-semibold mb-2">Effective Question Formulation</h3>

        <h4 className="text-lg font-semibold mb-1">Basic Query Structure</h4>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p><strong>Template:</strong> [Action] + [Specific Topic] + [Context/Constraints]</p>
          <p><strong>Example:</strong> "Summarize the maintenance requirements for hydraulic systems mentioned in the equipment manual, focusing on preventive maintenance schedules."</p>
        </div>

        <h4 className="text-lg font-semibold mb-1">Advanced Query Types</h4>

        <h5 className="text-md font-semibold mb-1">Comparative Analysis</h5>
        <ul className="list-disc list-inside ml-4">
          <li>"Compare the safety requirements between Document A and Document B"</li>
          <li>"What are the differences in maintenance schedules across these three manuals?"</li>
          <li>"How do the vendor proposals differ in terms of cost and specifications?"</li>
        </ul>

        <h5 className="text-md font-semibold mb-1">Synthesis Queries</h5>
        <ul className="list-disc list-inside ml-4">
          <li>"Create a comprehensive safety checklist combining requirements from all uploaded documents"</li>
          <li>"What are the common themes across these incident reports?"</li>
          <li>"Synthesize the key learnings from these project retrospectives"</li>
        </ul>

        <h5 className="text-md font-semibold mb-1">Specific Information Extraction</h5>
        <ul className="list-disc list-inside ml-4">
          <li>"List all temperature specifications mentioned in the technical documentation"</li>
          <li>"Extract contact information for all vendors mentioned"</li>
          <li>"Find all references to ISO 9001 requirements"</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Manufacturing-Specific Query Examples</h3>

        <div className="space-y-4 my-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Equipment Troubleshooting</h5>
            <p className="text-sm italic">"Based on the equipment manual and maintenance logs, what are the most likely causes of intermittent pressure drops in the hydraulic system?"</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Compliance Verification</h5>
            <p className="text-sm italic">"Review our current procedures against FDA requirements and identify any compliance gaps or missing documentation."</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Training Development</h5>
            <p className="text-sm italic">"Create a training outline for new operators based on the safety manual, operating procedures, and quality standards."</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FileText className="h-6 w-6 mr-2 text-teal-600" />
          5. Creating Research Summaries and Reports
        </h2>

        <h3 className="text-xl font-semibold mb-2">Automated Summary Generation</h3>
        <p><strong>NotebookLM Features:</strong></p>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Document Summaries:</strong> Automatic overview of each uploaded document</li>
          <li><strong>Topic Summaries:</strong> Focused summaries on specific subjects</li>
          <li><strong>Comparative Summaries:</strong> Side-by-side analysis of multiple sources</li>
          <li><strong>Custom Reports:</strong> Generated reports based on specific prompts</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Research Report Templates</h3>

        <h4 className="text-lg font-semibold mb-1">Vendor Evaluation Report</h4>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p><strong>Prompt Template:</strong></p>
          <p className="italic">
            "Create a comprehensive vendor evaluation report comparing [Vendor A], [Vendor B], and [Vendor C] based on the uploaded proposals. Include sections on: technical capabilities, cost analysis, delivery timelines, support services, and recommended selection criteria."
          </p>
        </div>

        <h4 className="text-lg font-semibold mb-1">Equipment Assessment Report</h4>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p><strong>Prompt Template:</strong></p>
          <p className="italic">
            "Based on the equipment manuals, maintenance records, and performance data, create an assessment report covering: current condition, maintenance requirements, upgrade opportunities, and lifecycle recommendations."
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-2">Quality Control for AI-Generated Content</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Verify Citations:</strong> Check that all claims reference specific source documents</li>
          <li><strong>Cross-Reference:</strong> Confirm important details against original sources</li>
          <li><strong>Technical Accuracy:</strong> Have subject matter experts review technical content</li>
          <li><strong>Completeness Check:</strong> Ensure all relevant sources were considered</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Users className="h-6 w-6 mr-2 text-indigo-600" />
          6. Team Collaboration and Knowledge Sharing
        </h2>

        <h3 className="text-xl font-semibold mb-2">Building Team Knowledge Bases</h3>

        <h4 className="text-lg font-semibold mb-1">Department-Specific Notebooks</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Quality Assurance:</strong> Standards, procedures, audit results, improvement initiatives</li>
          <li><strong>Maintenance:</strong> Equipment manuals, maintenance schedules, troubleshooting guides</li>
          <li><strong>Production:</strong> Work instructions, process parameters, production reports</li>
          <li><strong>Engineering:</strong> Design specifications, technical drawings, change control documents</li>
        </ul>

        <h4 className="text-lg font-semibold mb-1">Sharing and Collaboration</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Read-Only Sharing:</strong> Provide access to completed research</li>
          <li><strong>Collaborative Notebooks:</strong> Multiple team members contribute sources</li>
          <li><strong>Export Options:</strong> Share summaries and reports in various formats</li>
          <li><strong>Version Control:</strong> Track changes and updates to shared knowledge</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Knowledge Retention Strategies</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Expert Interviews:</strong> Record and transcribe knowledge from retiring experts</li>
          <li><strong>Process Documentation:</strong> Capture tribal knowledge in searchable formats</li>
          <li><strong>Lesson Learned Archives:</strong> Build repositories of project insights</li>
          <li><strong>Best Practice Libraries:</strong> Maintain collections of successful approaches</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Lightbulb className="h-6 w-6 mr-2 text-yellow-600" />
          7. Practical Implementation Scenarios
        </h2>

        <h3 className="text-xl font-semibold mb-2">Scenario 1: New Equipment Implementation</h3>
        <p><strong>Challenge:</strong> Installing new manufacturing equipment with complex documentation</p>
        <p><strong>NotebookLM Solution:</strong></p>
        <ol className="list-decimal list-inside ml-4">
          <li>Upload equipment manual, installation guide, and safety procedures</li>
          <li>Create implementation checklist: "Generate a step-by-step implementation plan"</li>
          <li>Identify requirements: "What are all the utility and infrastructure requirements?"</li>
          <li>Develop training materials: "Create operator training outline with safety focus"</li>
          <li>Plan maintenance: "Extract preventive maintenance schedule and requirements"</li>
        </ol>

        <h3 className="text-xl font-semibold mb-2">Scenario 2: Regulatory Compliance Audit</h3>
        <p><strong>Challenge:</strong> Preparing for FDA inspection with extensive documentation</p>
        <p><strong>NotebookLM Solution:</strong></p>
        <ol className="list-decimal list-inside ml-4">
          <li>Upload current procedures, FDA regulations, and previous audit reports</li>
          <li>Gap analysis: "Compare our procedures against FDA requirements"</li>
          <li>Compliance checklist: "Create comprehensive audit preparation checklist"</li>
          <li>Document review: "Identify any missing or outdated documentation"</li>
          <li>Training needs: "What training is required for compliance team?"</li>
        </ol>

        <h3 className="text-xl font-semibold mb-2">Scenario 3: Vendor Selection Process</h3>
        <p><strong>Challenge:</strong> Evaluating multiple vendors for critical equipment purchase</p>
        <p><strong>NotebookLM Solution:</strong></p>
        <ol className="list-decimal list-inside ml-4">
          <li>Upload all vendor proposals, specifications, and reference materials</li>
          <li>Comparative analysis: "Create side-by-side comparison of technical capabilities"</li>
          <li>Cost evaluation: "Analyze total cost of ownership for each option"</li>
          <li>Risk assessment: "Identify potential risks and mitigation strategies"</li>
          <li>Decision matrix: "Generate weighted scoring criteria for final selection"</li>
        </ol>

        <h2 className="text-2xl font-semibold mb-4">Best Practices and Tips</h2>

        <h3 className="text-xl font-semibold mb-2">Document Management</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Regular Updates:</strong> Keep notebooks current with latest document versions</li>
          <li><strong>Source Verification:</strong> Always verify AI responses against original sources</li>
          <li><strong>Archive Strategy:</strong> Maintain historical versions for reference</li>
          <li><strong>Access Control:</strong> Manage sharing permissions appropriately</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Query Optimization</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Specific Language:</strong> Use precise technical terminology</li>
          <li><strong>Iterative Refinement:</strong> Refine queries based on initial results</li>
          <li><strong>Context Setting:</strong> Provide relevant background in your questions</li>
          <li><strong>Multiple Approaches:</strong> Try different question formats for complex topics</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Summary & Next Steps</h2>

        <div className="bg-orange-50 p-6 rounded-lg my-6">
          <h4 className="text-lg font-semibold mb-3">What You've Learned</h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>NotebookLM setup and interface navigation</li>
            <li>Document upload and organization strategies</li>
            <li>Advanced query techniques for manufacturing content</li>
            <li>Research summary and report generation</li>
            <li>Team collaboration and knowledge sharing approaches</li>
            <li>Real-world implementation scenarios</li>
          </ul>
        </div>

        <h4 className="text-lg font-semibold mb-3">Implementation Roadmap</h4>
        <ol className="list-decimal list-inside ml-4">
          <li><strong>Week 1:</strong> Set up NotebookLM and upload initial document set</li>
          <li><strong>Week 2:</strong> Practice query techniques with existing documentation</li>
          <li><strong>Week 3:</strong> Create first research summary or comparative report</li>
          <li><strong>Week 4:</strong> Share results with team and gather feedback</li>
          <li><strong>Ongoing:</strong> Expand document library and refine workflows</li>
        </ol>

        <h4 className="text-lg font-semibold mb-3">Recommended Next Modules</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Understanding Perplexity Spaces and Gemini Gems:</strong> Expand research capabilities</li>
          <li><strong>Using Perplexity and Gemini as Project Hubs:</strong> Team collaboration platforms</li>
          <li><strong>Engineering Alignment:</strong> Technical integration approaches</li>
        </ul>
      </div>

      <div className="mt-12 p-6 bg-orange-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-orange-800">Ready to Implement Advanced Knowledge Management?</h3>
        <p className="text-orange-700 mb-4">
          Get expert guidance on setting up NotebookLM for your specific manufacturing documentation and knowledge management needs.
        </p>
        <Button 
          onClick={() => window.location.href = '/consultation'}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          Schedule Knowledge Management Consultation
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
          onClick={() => window.location.href = '/resources/training/ai-research-platforms'}
        >
          Next: AI Research Platforms 
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Container>
  )
}