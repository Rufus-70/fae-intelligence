'use client'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Zap, Target, Users, FileText, MessageSquare, Calculator, Search } from 'lucide-react'

export default function AIDailyProductivityPage() {
  return (
    <Container className="py-8">
      <div className="mb-6">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
          Beginner Level
        </div>
        <h1 className="text-4xl font-bold mb-4">AI Tools for Daily Productivity</h1>
        <p className="text-lg text-gray-700 mb-6">
          Transform your everyday work with practical AI applications that save time and improve efficiency.
        </p>
      </div>

      <div className="prose lg:prose-xl max-w-none">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Target className="h-6 w-6 mr-2 text-blue-600" />
          Module Objectives
        </h2>
        <p>By the end of this module, you will be able to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Identify daily tasks that can be enhanced with AI</li>
          <li>Use AI for email management and communication</li>
          <li>Leverage AI for document creation and editing</li>
          <li>Apply AI to research and information gathering</li>
          <li>Implement AI for planning and organization</li>
          <li>Create efficient workflows using free AI tools</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <MessageSquare className="h-6 w-6 mr-2 text-green-600" />
          1. AI for Communication & Email
        </h2>
        
        <h3 className="text-xl font-semibold mb-2">Email Draft Generation</h3>
        <p><strong>Tools:</strong> ChatGPT, Claude, Gemini, Gmail Smart Compose</p>
        <p><strong>How to Use:</strong></p>
        <ul className="list-disc list-inside ml-4">
          <li>Describe the purpose and tone of your email</li>
          <li>Provide key points to include</li>
          <li>Let AI generate a professional draft</li>
          <li>Edit and personalize as needed</li>
        </ul>
        
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p><strong>Example Prompt:</strong></p>
          <p className="italic">
            "Write a professional email to schedule a follow-up meeting with a client. 
            The tone should be friendly but professional. Include: we discussed their 
            manufacturing efficiency needs, I want to schedule a site visit next week, 
            and ask for their preferred time."
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-2">Meeting Summary Generation</h3>
        <p><strong>Use Case:</strong> Turn voice recordings or notes into structured summaries</p>
        <ul className="list-disc list-inside ml-4">
          <li>Record meetings with phone voice recorder</li>
          <li>Upload audio to transcription services (Otter.ai, Rev.com)</li>
          <li>Use AI to summarize key points and action items</li>
          <li>Share polished summaries with team</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FileText className="h-6 w-6 mr-2 text-orange-600" />
          2. Document Creation & Editing
        </h2>

        <h3 className="text-xl font-semibold mb-2">Report Writing Assistance</h3>
        <p><strong>AI Applications:</strong></p>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Outline Creation:</strong> Generate structured outlines for reports</li>
          <li><strong>Content Expansion:</strong> Turn bullet points into full paragraphs</li>
          <li><strong>Professional Formatting:</strong> Improve clarity and flow</li>
          <li><strong>Proofreading:</strong> Check grammar, tone, and consistency</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p><strong>Example Workflow:</strong></p>
          <ol className="list-decimal list-inside ml-4">
            <li>Create basic outline with AI: "Generate an outline for a monthly production report"</li>
            <li>Fill in data and key points manually</li>
            <li>Use AI to improve language: "Make this paragraph more professional and clear"</li>
            <li>Final review and customization</li>
          </ol>
        </div>

        <h3 className="text-xl font-semibold mb-2">Standard Operating Procedures (SOPs)</h3>
        <p><strong>Transform messy notes into professional documentation:</strong></p>
        <ul className="list-disc list-inside ml-4">
          <li>Input rough process notes or workflow steps</li>
          <li>Ask AI to structure into clear, numbered procedures</li>
          <li>Add safety considerations and best practices</li>
          <li>Format for easy team understanding</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Search className="h-6 w-6 mr-2 text-purple-600" />
          3. Research & Information Gathering
        </h2>

        <h3 className="text-xl font-semibold mb-2">Quick Research Assistance</h3>
        <p><strong>Use AI to:</strong></p>
        <ul className="list-disc list-inside ml-4">
          <li>Summarize complex topics in simple terms</li>
          <li>Compare different solutions or vendors</li>
          <li>Generate questions for vendor evaluations</li>
          <li>Research industry best practices</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Competitive Analysis</h3>
        <p><strong>AI can help with:</strong></p>
        <ul className="list-disc list-inside ml-4">
          <li>Analyzing competitor strengths and weaknesses</li>
          <li>Identifying market trends and opportunities</li>
          <li>Generating questions for customer interviews</li>
          <li>Creating comparison matrices</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Calculator className="h-6 w-6 mr-2 text-red-600" />
          4. Planning & Organization
        </h2>

        <h3 className="text-xl font-semibold mb-2">Project Planning Support</h3>
        <p><strong>AI Applications:</strong></p>
        <ul className="list-disc list-inside ml-4">
          <li>Generate project timelines and milestones</li>
          <li>Identify potential risks and mitigation strategies</li>
          <li>Create task breakdowns and dependencies</li>
          <li>Suggest resource allocation approaches</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Daily Schedule Optimization</h3>
        <p><strong>Use AI to:</strong></p>
        <ul className="list-disc list-inside ml-4">
          <li>Prioritize tasks based on urgency and importance</li>
          <li>Estimate time requirements for different activities</li>
          <li>Suggest optimal meeting scheduling</li>
          <li>Plan break times and focus periods</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Zap className="h-6 w-6 mr-2 text-yellow-600" />
          5. Practical Implementation Examples
        </h2>

        <h3 className="text-xl font-semibold mb-2">Manufacturing Scenarios</h3>

        <h4 className="text-lg font-semibold mb-1">Scenario 1: Quality Issue Documentation</h4>
        <p><strong>Challenge:</strong> Need to document a recurring quality issue for management review</p>
        <p><strong>AI Solution:</strong></p>
        <ol className="list-decimal list-inside ml-4">
          <li>Use voice-to-text to record observations during inspection</li>
          <li>Ask AI to structure notes into formal incident report</li>
          <li>Generate corrective action recommendations</li>
          <li>Create presentation summary for management</li>
        </ol>

        <h4 className="text-lg font-semibold mb-1">Scenario 2: Training Material Creation</h4>
        <p><strong>Challenge:</strong> Create training materials for new equipment</p>
        <p><strong>AI Solution:</strong></p>
        <ol className="list-decimal list-inside ml-4">
          <li>Input equipment specifications and procedures</li>
          <li>Ask AI to create step-by-step training guide</li>
          <li>Generate safety checklists and quiz questions</li>
          <li>Format for easy reading and understanding</li>
        </ol>

        <h4 className="text-lg font-semibold mb-1">Scenario 3: Vendor Communication</h4>
        <p><strong>Challenge:</strong> Communicate technical requirements to suppliers</p>
        <p><strong>AI Solution:</strong></p>
        <ol className="list-decimal list-inside ml-4">
          <li>Input technical specifications and requirements</li>
          <li>Ask AI to create clear, professional vendor communications</li>
          <li>Generate RFQ templates and evaluation criteria</li>
          <li>Draft follow-up emails and negotiation points</li>
        </ol>

        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Users className="h-6 w-6 mr-2 text-teal-600" />
          6. Getting Started: Your First Week
        </h2>

        <h3 className="text-xl font-semibold mb-2">Day 1-2: Email Enhancement</h3>
        <ul className="list-disc list-inside ml-4">
          <li>Sign up for ChatGPT or Claude (free versions)</li>
          <li>Use AI to draft your next 3 business emails</li>
          <li>Practice improving email tone and clarity</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Day 3-4: Document Improvement</h3>
        <ul className="list-disc list-inside ml-4">
          <li>Take an existing report or procedure</li>
          <li>Use AI to improve clarity and structure</li>
          <li>Create a standard template for future use</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Day 5-7: Research & Planning</h3>
        <ul className="list-disc list-inside ml-4">
          <li>Use AI to research a current business challenge</li>
          <li>Generate ideas for process improvements</li>
          <li>Create an action plan for implementation</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Recommended Free Tools</h2>
        
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Communication & Writing</h4>
            <ul className="text-sm space-y-1">
              <li>• ChatGPT (OpenAI)</li>
              <li>• Claude (Anthropic)</li>
              <li>• Gemini (Google)</li>
              <li>• Grammarly (writing assistance)</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Research & Organization</h4>
            <ul className="text-sm space-y-1">
              <li>• Perplexity (research)</li>
              <li>• NotebookLM (document analysis)</li>
              <li>• Otter.ai (meeting transcription)</li>
              <li>• Canva (design with AI)</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Best Practices & Tips</h2>

        <h3 className="text-xl font-semibold mb-2">Writing Effective Prompts</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Be Specific:</strong> Include context, desired outcome, and format</li>
          <li><strong>Provide Examples:</strong> Show AI what you want with sample content</li>
          <li><strong>Iterate:</strong> Refine prompts based on initial results</li>
          <li><strong>Set Constraints:</strong> Specify length, tone, and style requirements</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Quality Control</h3>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Always Review:</strong> AI output needs human verification</li>
          <li><strong>Fact-Check:</strong> Verify important information independently</li>
          <li><strong>Personalize:</strong> Add your voice and company-specific details</li>
          <li><strong>Save Templates:</strong> Build a library of effective prompts</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Summary & Next Steps</h2>

        <div className="bg-blue-50 p-6 rounded-lg my-6">
          <h4 className="text-lg font-semibold mb-3">What You've Learned</h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>How to use AI for email and communication tasks</li>
            <li>Document creation and improvement techniques</li>
            <li>Research and information gathering with AI</li>
            <li>Planning and organization applications</li>
            <li>Real-world manufacturing scenarios</li>
            <li>Best practices for effective AI use</li>
          </ul>
        </div>

        <h4 className="text-lg font-semibold mb-3">Recommended Next Modules</h4>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Prompt Engineering for Leaders:</strong> Advanced techniques for better AI communication</li>
          <li><strong>Top 20 AI Tools Under $20/Month:</strong> Explore premium tools for enhanced productivity</li>
          <li><strong>Engineering Alignment:</strong> Technical approaches to AI implementation</li>
        </ul>

        <h4 className="text-lg font-semibold mb-3">Implementation Challenge</h4>
        <p>Choose one daily task and implement AI assistance this week. Track time saved and quality improvements. Common starting points:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Email responses to customers or suppliers</li>
          <li>Weekly report generation</li>
          <li>Meeting notes and action items</li>
          <li>Training documentation updates</li>
        </ul>
      </div>

      <div className="mt-12 p-6 bg-cyan-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-cyan-800">Ready for Hands-On Implementation?</h3>
        <p className="text-cyan-700 mb-4">
          Get personalized guidance on implementing these AI productivity tools in your specific manufacturing environment.
        </p>
        <Button 
          onClick={() => window.location.href = '/consultation'}
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          Schedule Implementation Consultation
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
          onClick={() => window.location.href = '/resources/training/prompt-engineering'}
        >
          Next: Prompt Engineering 
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Container>
  )
}