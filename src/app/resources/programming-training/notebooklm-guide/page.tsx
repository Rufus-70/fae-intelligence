// src/app/resources/programming-training/notebooklm-guide/page.tsx

export default function NotebookLMGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Utilizing Notebook LM</h1>
      <p className="text-lg mb-6">A comprehensive guide to Google&apos;s Notebook LM technology.</p>

      <h2 className="text-2xl font-semibold mb-3">In This Module</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Introduction to Notebook LM</li>
        <li>Getting Started with Notebook LM</li>
        <li>Core Features and Functionality</li>
        <li>Notebook Structures for Different Use Cases</li>
        <li>Advanced Techniques</li>
        <li>Integration with Other Tools</li>
        <li>Practical Exercises</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Introduction to Notebook LM</h2>
      <p className="mb-4">Notebook LM (Language Model) is a powerful AI-powered note-taking tool developed by Google that combines the capabilities of traditional note-taking with the intelligence of large language models. Unlike conventional AI assistants that operate in a chat interface, Notebook LM works within a document-style environment that&apos;s familiar to users of tools like Google Docs or Notion.</p>

      <h3 className="text-xl font-medium mb-2">What Makes Notebook LM Different?</h3>
      <p className="mb-4">Notebook LM stands out by allowing you to upload your own documents as context. This means the AI assistant can provide insights, summaries, and answers based specifically on your data, rather than just its pre-trained knowledge.</p>
      <p className="mb-4">This module will guide you through using Notebook LM effectively, from basic setup to advanced integrations and techniques. By the end, you&apos;ll have a comprehensive understanding of how to leverage this tool for research, content creation, data analysis, and more.</p>

      <h3 className="text-xl font-medium mb-2">Key Benefits of Notebook LM</h3>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Document-Based Context:</strong> Upload your own documents to provide custom context for the AI, ensuring that responses are tailored to your specific information and needs.</li>
        <li><strong>Flexible Structure:</strong> Combine free-form notes with AI-powered blocks that can analyze, summarize, or expand on your content as needed.</li>
        <li><strong>Source Tracking:</strong> Notebook LM cites sources from your uploaded documents, helping you track where information comes from.</li>
        <li><strong>Collaborative Potential:</strong> Work with AI to iteratively develop ideas, research topics, and create content with contextual awareness.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Getting Started with Notebook LM</h2>
      <h3 className="text-xl font-medium mb-2">Access and Setup</h3>
      <p className="mb-4">Notebook LM is available as part of Google's AI Test Kitchen. Here's how to get started:</p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Visit the Notebook LM Website:</strong> Go to <a href="https://notebooklm.google.com/" className="text-blue-600 hover:underline">https://notebooklm.google.com/</a> and sign in with your Google account.</li>
        <li><strong>Create a New Notebook:</strong> Click on "New Notebook" to create a blank document where you'll work.</li>
        <li><strong>Upload Documents (Optional but Recommended):</strong> Click on "Add Sources" to upload PDF files, Google Docs, or other supported document formats that will serve as context for the AI.</li>
        <li><strong>Start Writing:</strong> Begin typing in your notebook. You can write regular notes or interact with the AI by using the command menu.</li>
      </ul>
      <p className="mb-4"><strong>Important Note on Access:</strong> As of the creation of this course, Notebook LM may still be in limited access in some regions. If you cannot access it directly, you may need to join a waitlist or use a VPN service to access from a supported region.</p>

      <h3 className="text-xl font-medium mb-2">Document Upload Guidelines</h3>
      <p className="mb-4">For best results when uploading documents:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Use clear, well-formatted documents without complex layouts</li>
        <li>Ensure PDFs are searchable (not scanned images without OCR)</li>
        <li>Consider breaking very large documents into smaller, topic-focused files</li>
        <li>Include a variety of document types to give the AI broader context</li>
        <li>Currently supported formats include: PDF, Google Docs, .txt, and more</li>
      </ul>
      <h4 className="text-lg font-medium mb-2">Document Size Limits:</h4>
      <ul className="list-disc list-inside mb-4">
        <li>Maximum file size: 20MB per document</li>
        <li>Maximum total upload: 200MB across all documents</li>
        <li>Maximum document length: ~600 pages per document</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Core Features and Functionality</h2>
      <p className="mb-4">Notebook LM combines standard document editing with powerful AI capabilities. Here are the key features you need to master:</p>

      <h3 className="text-xl font-medium mb-2">Basic Document Interaction</h3>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Text Formatting:</strong> Format text with standard controls (bold, italic, lists) or use Markdown-style syntax for quick formatting.</li>
        <li><strong>AI Commands:</strong> Access AI features by typing "/" to open the command menu or using the AI button in the toolbar.</li>
        <li><strong>Document Structure:</strong> Organize content with headings, subheadings, and collapsible sections for better navigation.</li>
        <li><strong>Version History:</strong> Access previous versions of your notebook through the document history feature.</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">AI-Powered Features</h3>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Ask Questions About Your Documents:</strong> One of the most powerful features is the ability to ask questions about your uploaded documents. The AI will search for relevant information and provide answers with citations.
          <ul className="list-disc list-inside ml-6">
            <li>Example: "What are the key findings from the research paper I uploaded?"</li>
            <li>"Compare the methodologies used in documents A and B."</li>
          </ul>
        </li>
        <li><strong>Generate Summaries:</strong> Ask the AI to summarize sections of your documents or entire files for quick understanding of key points.
          <ul className="list-disc list-inside ml-6">
            <li>Command: /summarize</li>
            <li>Example: "Summarize the main arguments in the third chapter of the uploaded book."</li>
          </ul>
        </li>
        <li><strong>Extract Key Information:</strong> Have the AI identify and extract specific types of information from your documents.
          <ul className="list-disc list-inside ml-6">
            <li>Example: "Extract all statistical data points from the research paper."</li>
            <li>"List all companies mentioned in the industry report."</li>
          </ul>
        </li>
        <li><strong>Cite Sources:</strong> When the AI provides information from your documents, it will include citations so you can track where the information came from.
          <ul className="list-disc list-inside ml-6">
            <li>Example Citation: "According to Document A (page 24), the annual growth rate was 7.2% between 2018-2022."</li>
          </ul>
        </li>
      </ul>
      <p className="mb-4"><strong>Pro Tip: Ask Follow-Up Questions:</strong> Notebook LM maintains context within your working session. After asking an initial question, you can ask follow-up questions without repeating all the context. For example, after asking about key findings, you could simply ask &quot;Can you elaborate on the third point?&quot; and the AI will understand the reference.</p>

      <h2 className="text-2xl font-semibold mb-3">Notebook Structures for Different Use Cases</h2>
      <p className="mb-4">Notebook LM can be configured in various ways to support different workflows. Here are some effective structures for common use cases:</p>

      <h3 className="text-xl font-medium mb-2">Research Analysis Notebook</h3>
      <p className="mb-4">Ideal for academic research, literature reviews, or deep dives into specific topics.</p>
      <h4 className="text-lg font-medium mb-2">Structure:</h4>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Research Question Section:</strong> Clearly define your research questions at the top of the document.</li>
        <li><strong>Document Summary Section:</strong> Have the AI summarize each uploaded paper or document.
          <ul className="list-disc list-inside ml-6">
            <li>Example command: /summarize "Paper A" into key findings and methodology</li>
          </ul>
        </li>
        <li><strong>Comparative Analysis:</strong> Create a section where you ask the AI to compare and contrast findings across documents.</li>
        <li><strong>Gap Analysis:</strong> Ask the AI to identify research gaps or areas needing further investigation.</li>
        <li><strong>Synthesis & Conclusions:</strong> Work with the AI to synthesize findings into coherent arguments or conclusions.</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Content Creation Notebook</h3>
      <p className="mb-4">For writers, bloggers, or content creators working on articles, blog posts, or other content.</p>
      <h4 className="text-lg font-medium mb-2">Structure:</h4>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Content Brief:</strong> Outline your topic, target audience, and key objectives.</li>
        <li><strong>Research Repository:</strong> Upload reference materials and have the AI extract relevant quotes and facts.</li>
        <li><strong>Outline Development:</strong> Ask the AI to suggest potential outlines based on your brief and sources.
          <ul className="list-disc list-inside ml-6">
            <li>Example: /create detailed outline for article on renewable energy trends</li>
          </ul>
        </li>
        <li><strong>Section Drafting:</strong> Work section by section, using the AI to help draft content based on your outline.</li>
        <li><strong>Refinement Notes:</strong> Use the AI to suggest improvements, alternate phrasings, or fact-check your draft.</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Project Management Notebook</h3>
      <p className="mb-4">For managing projects, tracking decisions, and maintaining documentation.</p>
      <h4 className="text-lg font-medium mb-2">Structure:</h4>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Project Overview:</strong> Define scope, objectives, and key stakeholders.</li>
        <li><strong>Decision Log:</strong> Document important decisions and have the AI summarize rationales.</li>
        <li><strong>Meeting Notes Repository:</strong> Upload meeting notes and use the AI to extract action items and decisions.</li>
        <li><strong>Risk Assessment:</strong> Ask the AI to analyze documented risks and suggest mitigation strategies.</li>
        <li><strong>Status Updates:</strong> Track progress and have the AI summarize changes since the last update.</li>
      </ul>
      <p className="mb-4"><strong>Template Tip:</strong> Once you&apos;ve created a notebook structure that works well for a particular use case, save it as a template by duplicating the notebook and removing specific content while keeping the structure. This allows you to quickly start new projects with your preferred organization.</p>

      <h2 className="text-2xl font-semibold mb-3">Advanced Techniques</h2>
      <p className="mb-4">Once you're comfortable with the basic functionality, these advanced techniques will help you get even more out of Notebook LM:</p>

      <h3 className="text-xl font-medium mb-2">Prompt Engineering for Notebook LM</h3>
      <p className="mb-4">Crafting effective prompts can significantly improve the quality of AI-generated content:</p>
      <h4 className="text-lg font-medium mb-2">Effective Prompting Techniques:</h4>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Be Specific About Output Format:</strong> Specify exactly how you want information presented.
          <ul className="list-disc list-inside ml-6">
            <li>Instead of: "Tell me about the methods in this paper."</li>
            <li>Try: "Create a table comparing the research methods in each paper, including sample size, duration, and key limitations."</li>
          </ul>
        </li>
        <li><strong>Use Multi-Step Instructions:</strong> Break complex tasks into sequenced steps.
          <ul className="list-disc list-inside ml-6">
            <li>Example: "First, identify all statistical claims in document A. Second, verify if these claims are supported by the data presented. Finally, note any claims that appear to be overstated based on the evidence."</li>
          </ul>
        </li>
        <li><strong>Define Roles or Perspectives:</strong> Ask the AI to adopt specific analytical stances.
          <ul className="list-disc list-inside ml-6">
            <li>Example: "Analyze this marketing proposal from three perspectives: 1) a budget-conscious CFO, 2) a growth-focused CMO, and 3) a customer experience specialist."</li>
          </ul>
        </li>
        <li><strong>Specify Citation Requirements:</strong> Control how the AI provides sources.
          <ul className="list-disc list-inside ml-6">
            <li>Example: "Summarize the key benefits of this product with detailed citations to specific pages in the technical documentation."</li>
          </ul>
        </li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Document Analysis Workflows</h3>
      <p className="mb-4">Develop systematic approaches to analyzing complex documents:</p>
      <h4 className="text-lg font-medium mb-2">The Layered Analysis Technique</h4>
      <ul className="list-disc list-inside mb-4">
        <li>First Pass: Ask the AI to identify and extract the main structural elements (executive summary, methodology, findings, conclusions)</li>
        <li>Second Pass: Have the AI extract all quantitative data and present it in a structured format</li>
        <li>Third Pass: Request identification of key arguments and supporting evidence</li>
        <li>Fourth Pass: Ask for analysis of limitations, gaps, or potential biases in the document</li>
        <li>Final Synthesis: Have the AI integrate the findings from all previous passes into a comprehensive analysis</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Fact-Checking and Verification</h3>
      <p className="mb-4">Use Notebook LM to verify information across multiple documents:</p>
      <h4 className="text-lg font-medium mb-2">Verification Process:</h4>
      <ul className="list-disc list-inside mb-4">
        <li>Identify key claims or statistics from one document</li>
        <li>Ask the AI to find corroborating or contradicting information in other uploaded documents</li>
        <li>Request cross-referencing of data points across multiple sources</li>
        <li>Have the AI highlight discrepancies or inconsistencies between sources</li>
      </ul>
      <p className="mb-4">Example Query: &quot;The first document claims a 15% market growth rate. Please verify this claim by checking if other uploaded documents support this figure, and note any contradictory data.&quot;</p>
      <p className="mb-4"><strong>Important Limitation:</strong> Remember that Notebook LM can only work with the documents you&apos;ve uploaded. If important context or counter-evidence exists in documents you haven&apos;t provided, the AI won&apos;t be able to include this in its analysis.</p>

      <h2 className="text-2xl font-semibold mb-3">Integration with Other Tools</h2>
      <p className="mb-4">While Notebook LM doesn't have direct API integrations yet, you can effectively combine it with other tools in your workflow:</p>

      <h3 className="text-xl font-medium mb-2">Google Workspace Integration</h3>
      <p className="mb-4">Notebook LM works well with other Google tools:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Upload Google Docs directly as sources</li>
        <li>Export analysis results to Google Docs for sharing</li>
        <li>Use Google Drive to organize document collections for different notebooks</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Research Tools Workflow</h3>
      <p className="mb-4">Create a research pipeline:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Use Zotero or Mendeley to collect and organize research papers</li>
        <li>Export papers as PDFs and upload to Notebook LM</li>
        <li>Analyze and synthesize in Notebook LM</li>
        <li>Export insights to your reference manager as notes</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Content Creation Pipeline</h3>
      <p className="mb-4">For writers and content creators:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Research and analyze sources in Notebook LM</li>
        <li>Develop outlines and drafts within the notebook</li>
        <li>Export to Google Docs or Word for final formatting</li>
        <li>Use specialized tools like Grammarly for final polishing</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Project Documentation System</h3>
      <p className="mb-4">For project management:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Export meeting notes from tools like Notion or Asana</li>
        <li>Upload to Notebook LM for analysis and action item extraction</li>
        <li>Have the AI generate progress reports based on documentation</li>
        <li>Export summaries back to your project management tool</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Manual Integration Workflow Example</h3>
      <p className="mb-4">Since Notebook LM doesn't yet support direct API integrations, here's an effective manual workflow:</p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Document Collection:</strong> Gather documents from various sources and convert to PDF if needed</li>
        <li><strong>Analysis in Notebook LM:</strong> Upload and analyze documents to extract insights</li>
        <li><strong>Export Insights:</strong> Copy key findings and insights from Notebook LM</li>
        <li><strong>Integration:</strong> Paste into your preferred tools with proper attribution</li>
        <li><strong>Feedback Loop:</strong> If further analysis is needed, add new documents to Notebook LM and repeat</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Practical Exercises</h2>
      <p className="mb-4">Practice these hands-on exercises to develop your Notebook LM skills:</p>

      <h3 className="text-xl font-medium mb-2">Exercise 1: Document Comparison</h3>
      <h4 className="text-lg font-medium mb-2">Objective:</h4>
      <p className="mb-2">Compare two documents on the same topic and identify key similarities and differences.</p>
      <h4 className="text-lg font-medium mb-2">Materials Needed:</h4>
      <p className="mb-2">Two articles, research papers, or reports on a similar subject</p>
      <h4 className="text-lg font-medium mb-2">Instructions:</h4>
      <ul className="list-disc list-inside mb-4">
        <li>Create a new notebook and upload both documents</li>
        <li>Ask the AI to summarize each document separately</li>
        <li>Request a comparison of their methodologies</li>
        <li>Ask for a comparison of their key findings or arguments</li>
        <li>Have the AI identify points where they agree and disagree</li>
        <li>Create a comparative analysis table with the AI's help</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Exercise 2: Research Question Investigation</h3>
      <h4 className="text-lg font-medium mb-2">Objective:</h4>
      <p className="mb-2">Use Notebook LM to thoroughly investigate a specific research question across multiple documents.</p>
      <h4 className="text-lg font-medium mb-2">Materials Needed:</h4>
      <p className="mb-2">3-5 documents related to your research question</p>
      <h4 className="text-lg font-medium mb-2">Instructions:</h4>
      <ul className="list-disc list-inside mb-4">
        <li>Create a new notebook and clearly state your research question at the top</li>
        <li>Upload all relevant documents</li>
        <li>Ask the AI to extract all content relevant to your research question from each document</li>
        <li>Request synthesis of the findings across documents</li>
        <li>Ask the AI to identify gaps or areas needing further research</li>
        <li>Have the AI formulate a conclusion based on the available evidence</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Exercise 3: Content Creation Workshop</h3>
      <h4 className="text-lg font-medium mb-2">Objective:</h4>
      <p className="mb-2">Practice using Notebook LM to develop high-quality content from source materials.</p>
      <h4 className="text-lg font-medium mb-2">Materials Needed:</h4>
      <p className="mb-2">2-3 source documents on a topic you want to write about</p>
      <h4 className="text-lg font-medium mb-2">Instructions:</h4>
      <ul className="list-disc list-inside mb-4">
        <li>Create a content brief outlining your target audience, purpose, and desired outcome</li>
        <li>Upload source materials</li>
        <li>Ask the AI to extract key points, quotes, and statistics relevant to your brief</li>
        <li>Have the AI suggest 3 different possible outlines for your content</li>
        <li>Select one outline and work with the AI to develop each section</li>
        <li>Ask the AI to review your draft for clarity, coherence, and accuracy</li>
        <li>Refine the content based on the AI&apos;s suggestions</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Knowledge Check</h2>
      <ul className="list-disc list-inside mb-4">
        <li>1. What makes Notebook LM different from traditional AI assistants?</li>
        <li>2. What types of documents can you upload to Notebook LM?</li>
        <li>3. What is an effective technique for getting better results from Notebook LM?</li>
        <li>4. How can Notebook LM be integrated with other tools?</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Module Summary</h2>
      <p className="mb-4">In this module, you've learned how to use Google's Notebook LM to enhance your research, content creation, and knowledge work. You now understand how to:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Set up and configure Notebook LM with your own documents</li>
        <li>Leverage its core features for document analysis and content generation</li>
        <li>Structure notebooks for different use cases and workflows</li>
        <li>Apply advanced techniques like effective prompt engineering and layered analysis</li>
        <li>Integrate Notebook LM into workflows with other tools</li>
        <li>Practice with hands-on exercises to develop your skills</li>
      </ul>
      <p className="mb-4">As AI note-taking tools continue to evolve, the skills you've developed in this module will help you leverage these technologies to enhance your productivity, research quality, and content creation capabilities.</p>

      <h2 className="text-2xl font-semibold mb-3">Next Steps</h2>
      <h3 className="text-xl font-medium mb-2">Next Module:</h3>
      <p className="mb-4">Understanding Perplexity Spaces and Gemini Gems</p>
      <p className="mb-4">Learn about the functionalities of Perplexity Spaces and Gemini Gems and how they can enhance your AI interactions.</p>

      <h3 className="text-xl font-medium mb-2">Return To:</h3>
      <p className="mb-4">Course Homepage</p>
      <p className="mb-4">View all available modules and continue your learning journey.</p>

      <h3 className="text-xl font-medium mb-2">AI Training Hub</h3>
      <p className="mb-4">Advanced AI Tools and Concepts</p>
      <p className="mb-4">Homepage | Back to Top</p>
      <p className="text-sm text-gray-500">© 2023 AI Training Hub. All rights reserved.</p>
    </div>
  );
}