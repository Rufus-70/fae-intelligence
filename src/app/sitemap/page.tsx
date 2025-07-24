import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

export default function SitemapPage() {
  return (
    <Section className="py-16">
      <Container>
        <h1 className="text-4xl font-bold mb-8 text-center">Site Map</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Navigation */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-700">Main Navigation</h2>
            <ul className="space-y-2">
              <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
              <li><Link href="/about" className="text-blue-600 hover:underline">About</Link></li>
              <li><Link href="/services" className="text-blue-600 hover:underline">Services</Link></li>
              <li><Link href="/consultation" className="text-blue-600 hover:underline">Consultation</Link></li>
              <li><Link href="/contact" className="text-blue-600 hover:underline">Contact</Link></li>
              <li><Link href="/blog" className="text-blue-600 hover:underline">Blog</Link></li>
            </ul>
          </div>

          {/* Resources Hub */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-700">Resources Hub</h2>
            <ul className="space-y-2">
              <li><Link href="/resources" className="text-blue-600 hover:underline">Resources Home</Link></li>
              <li><Link href="/resources/ai-newcomer" className="text-blue-600 hover:underline">AI Newcomer</Link></li>
              <li><Link href="/resources/tech-explorer" className="text-blue-600 hover:underline">Tech Explorer</Link></li>
              <li><Link href="/resources/implementation-leader" className="text-blue-600 hover:underline">Implementation Leader</Link></li>
              <li><Link href="/resources/training-hub" className="text-blue-600 hover:underline">Training Hub</Link></li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-cyan-600">Programming Training</h3>
            <ul className="space-y-2 ml-4">
              <li><Link href="/resources/programming-training" className="text-blue-600 hover:underline">Programming Training Home</Link></li>
              <li><Link href="/resources/programming-training/chatgpt-guide" className="text-blue-600 hover:underline">ChatGPT Guide</Link></li>
              <li><Link href="/resources/programming-training/mcp-docker-guide" className="text-blue-600 hover:underline">MCP & Docker Desktop Guide</Link></li>
              <li><Link href="/resources/programming-training/claude-guide" className="text-blue-600 hover:underline">Claude Guide</Link></li>
              <li><Link href="/resources/programming-training/perplexity-guide" className="text-blue-600 hover:underline">Perplexity Guide</Link></li>
              <li><Link href="/resources/programming-training/notebooklm-guide" className="text-blue-600 hover:underline">Notebook LM Guide</Link></li>
              <li><Link href="/resources/programming-training/gemini-guide" className="text-blue-600 hover:underline">Gemini Guide</Link></li>
              <li><Link href="/resources/programming-training/api-development" className="text-blue-600 hover:underline">API Development</Link></li>
              <li><Link href="/resources/programming-training/firebase-training" className="text-blue-600 hover:underline">Firebase Training</Link></li>
              <li><Link href="/resources/programming-training/github-workflows" className="text-blue-600 hover:underline">GitHub Workflows</Link></li>
              <li><Link href="/resources/programming-training/local-llm" className="text-blue-600 hover:underline">Local LLM Deployment</Link></li>
              <li><Link href="/resources/programming-training/huggingface-integration" className="text-blue-600 hover:underline">Hugging Face Integration</Link></li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-cyan-600">Quick Wins</h3>
            <ul className="space-y-2 ml-4">
              <li><Link href="/resources/quick-wins/chatgpt-docs" className="text-blue-600 hover:underline">ChatGPT for Documentation</Link></li>
              <li><Link href="/resources/quick-wins/inventory-tracking" className="text-blue-600 hover:underline">Smart Inventory Tracking</Link></li>
              <li><Link href="/resources/quick-wins/voice-reports" className="text-blue-600 hover:underline">Voice-to-Text Reports</Link></li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-cyan-600">Individual Training Modules</h3>
            <ul className="space-y-2 ml-4">
              <li><Link href="/resources/training/ai-fundamentals" className="text-blue-600 hover:underline">AI Fundamentals</Link></li>
              <li><Link href="/resources/training/prompt-engineering" className="text-blue-600 hover:underline">Prompt Engineering</Link></li>
              <li><Link href="/resources/training/ai-daily-productivity" className="text-blue-600 hover:underline">AI Daily Productivity</Link></li>
              <li><Link href="/resources/training/engineering-alignment" className="text-blue-600 hover:underline">Engineering Alignment</Link></li>
              <li><Link href="/resources/training/ai-tools-budget" className="text-blue-600 hover:underline">AI Tools Budget</Link></li>
              <li><Link href="/resources/training/claude-chatgpt-projects" className="text-blue-600 hover:underline">Claude & ChatGPT Projects</Link></li>
              <li><Link href="/resources/training/notebook-lm" className="text-blue-600 hover:underline">Notebook LM</Link></li>
              <li><Link href="/resources/training/ai-research-platforms" className="text-blue-600 hover:underline">AI Research Platforms</Link></li>
              <li><Link href="/resources/training/ai-project-hubs" className="text-blue-600 hover:underline">AI Project Hubs</Link></li>
            </ul>
          </div>

          {/* Dashboard */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-700">Dashboard (Admin)</h2>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-blue-600 hover:underline">Dashboard Home</Link></li>
              <li><Link href="/dashboard/analytics" className="text-blue-600 hover:underline">Analytics</Link></li>
              <li><Link href="/dashboard/blog" className="text-blue-600 hover:underline">Blog Management</Link></li>
              <li><Link href="/dashboard/blog/create" className="text-blue-600 hover:underline">Create Blog Post</Link></li>
              <li><Link href="/dashboard/categories" className="text-blue-600 hover:underline">Categories</Link></li>
              <li><Link href="/dashboard/files" className="text-blue-600 hover:underline">File Management</Link></li>
              <li><Link href="/dashboard/knowledge" className="text-blue-600 hover:underline">Knowledge Base</Link></li>
              <li><Link href="/dashboard/settings" className="text-blue-600 hover:underline">Settings</Link></li>
              <li><Link href="/dashboard/tags" className="text-blue-600 hover:underline">Tags</Link></li>
            </ul>
          </div>

          {/* Other Pages (if any) */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-700">Other Pages</h2>
            <ul className="space-y-2">
              <li><Link href="/login" className="text-blue-600 hover:underline">Login</Link></li>
              {/* Add other top-level pages here if they are not part of main nav or dashboard */}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
