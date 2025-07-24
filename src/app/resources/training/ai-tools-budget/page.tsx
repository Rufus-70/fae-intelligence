'use client'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ExternalLink } from 'lucide-react'

export default function AiToolsBudgetPage() {
  return (
    <Container className="py-8">
      <h1 className="text-4xl font-bold mb-6">Top 20 AI Tools Under $20/Month</h1>
      <p className="text-lg text-gray-700 mb-8">A comprehensive guide to affordable AI tools for different use cases.</p>

      <div className="prose lg:prose-xl max-w-none">
        <h2 className="text-2xl font-semibold mb-4">In this module, you'll learn:</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Top AI tools available for under $20 per month</li>
          <li>Features and use cases for each tool</li>
          <li>How to evaluate which AI tools best suit your needs</li>
          <li>Budget-friendly alternatives to expensive AI solutions</li>
          <li>How to combine different tools for maximum productivity</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>The AI tool landscape is expanding rapidly, with new solutions emerging daily. The good news is that many powerful AI tools are available at very affordable price points—many under $20 per month or even free. This module categorizes the top 20 affordable AI tools by functionality, helping you discover solutions that can dramatically improve your productivity without breaking your budget.</p>

        <p>We'll explore tools across several categories:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Text & Writing Tools</li>
          <li>Image Generation & Design</li>
          <li>Audio & Video Creation</li>
          <li>Research & Knowledge Tools</li>
          <li>Productivity & Workflow</li>
        </ul>

        <p>For each tool, we'll examine:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Core functionality</li>
          <li>Pricing details</li>
          <li>Key features</li>
          <li>Ideal use cases</li>
          <li>Limitations to consider</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Text & Writing Tools</h2>

        {/* ChatGPT */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. ChatGPT</CardTitle>
            <p className="text-sm text-gray-600">Free $20/mo (Plus)</p>
          </CardHeader>
          <CardContent>
            <p>Versatile text-based AI assistant for writing, coding, research, and creative tasks.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Text generation, summarization, and editing</li>
              <li>Code writing and debugging assistance</li>
              <li>Web browsing capabilities (in Plus)</li>
              <li>Plugin ecosystem for extended functionality</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>General-purpose AI assistance, writing help, coding, brainstorming, and content creation.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://chat.openai.com/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* Copy.ai */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Copy.ai</CardTitle>
            <p className="text-sm text-gray-600">Free $12/mo (Pro)</p>
          </CardHeader>
          <CardContent>
            <p>AI-powered copywriting platform specialized for marketing content creation.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>90+ templates for different content types</li>
              <li>Blog outline and writing tools</li>
              <li>Email copy generation</li>
              <li>Social media caption creation</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Marketing teams, content creators, social media managers, and small business owners.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://www.copy.ai/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* Grammarly */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. Grammarly</CardTitle>
            <p className="text-sm text-gray-600">Free $12/mo (Premium)</p>
          </CardHeader>
          <CardContent>
            <p>AI-powered writing assistant that checks grammar, clarity, engagement, and delivery.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Grammar and spelling correction</li>
              <li>Tone adjustment suggestions</li>
              <li>Clarity and conciseness improvements</li>
              <li>Plagiarism detection (Premium)</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Writers, students, professionals, and anyone who writes regularly and wants to improve quality.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://www.grammarly.com/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* Jasper */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Jasper</CardTitle>
            <p className="text-sm text-gray-600">$19/mo (Creator)</p>
          </CardHeader>
          <CardContent>
            <p>AI content platform designed for marketing teams with document collaboration features.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Long-form content creation</li>
              <li>Collaborative document editing</li>
              <li>Brand voice customization</li>
              <li>50+ templates for various content types</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Marketing agencies, content creators, and businesses needing consistent content production.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://www.jasper.ai/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        <p className="font-semibold">Pro Tip:</p>
        <p>Many of these text tools offer free trials or generous free tiers. Start with the free versions to determine which tool best fits your specific writing needs before committing to a subscription.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Image Generation & Design</h2>

        {/* Midjourney */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Midjourney</CardTitle>
            <p className="text-sm text-gray-600">$10/mo (Basic)</p>
          </CardHeader>
          <CardContent>
            <p>AI image generation tool known for stunning artistic quality and photorealistic outputs.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>High-quality artistic image generation</li>
              <li>Discord-based interface</li>
              <li>Style variation options</li>
              <li>Commercial usage rights</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Artists, designers, marketers, and creative professionals needing unique visuals.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://www.midjourney.com/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* Canva Pro */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>6. Canva Pro</CardTitle>
            <p className="text-sm text-gray-600">Free $12.99/mo</p>
          </CardHeader>
          <CardContent>
            <p>Design platform with integrated AI features for graphic creation and editing.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Magic Write text generation</li>
              <li>Background removal</li>
              <li>Text-to-image generation</li>
              <li>Design resize and brand kit</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Social media managers, marketers, small businesses, and non-designers needing professional graphics.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://www.canva.com/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* Leonardo.ai */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7. Leonardo.ai</CardTitle>
            <p className="text-sm text-gray-600">Free $10/mo (Basic)</p>
          </CardHeader>
          <CardContent>
            <p>AI image generation platform with powerful customization and fine-tuning options.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Custom model training</li>
              <li>Advanced prompt tools</li>
              <li>Image generation with consistency</li>
              <li>Community model access</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Game developers, artists, and designers needing consistent character and environment visuals.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://leonardo.ai/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* Firefly (Adobe) */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>8. Firefly (Adobe)</CardTitle>
            <p className="text-sm text-gray-600">Free (Limited) $4.99/mo</p>
          </CardHeader>
          <CardContent>
            <p>Adobe's generative AI tool for creating and editing images with commercial usage rights.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Integration with Adobe Creative Cloud</li>
              <li>Text-to-image generation</li>
              <li>Text effects generation</li>
              <li>Training on licensed content (no copyright issues)</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Creative professionals already using Adobe products who need AI-generated images without copyright concerns.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://firefly.adobe.com/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        <h3 className="text-xl font-semibold mt-8 mb-2">Image Generation Tools Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tool</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best For</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pricing</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Learning Curve</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Output Quality</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Midjourney</td>
                <td className="px-6 py-4 whitespace-nowrap">Artistic imagery</td>
                <td className="px-6 py-4 whitespace-nowrap">$10/mo</td>
                <td className="px-6 py-4 whitespace-nowrap">Moderate</td>
                <td className="px-6 py-4 whitespace-nowrap">Excellent</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Canva Pro</td>
                <td className="px-6 py-4 whitespace-nowrap">Marketing materials</td>
                <td className="px-6 py-4 whitespace-nowrap">$12.99/mo</td>
                <td className="px-6 py-4 whitespace-nowrap">Easy</td>
                <td className="px-6 py-4 whitespace-nowrap">Good</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Leonardo.ai</td>
                <td className="px-6 py-4 whitespace-nowrap">Consistent characters</td>
                <td className="px-6 py-4 whitespace-nowrap">$10/mo</td>
                <td className="px-6 py-4 whitespace-nowrap">Advanced</td>
                <td className="px-6 py-4 whitespace-nowrap">Very Good</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Firefly</td>
                <td className="px-6 py-4 whitespace-nowrap">Commercial use</td>
                <td className="px-6 py-4 whitespace-nowrap">$4.99/mo</td>
                <td className="px-6 py-4 whitespace-nowrap">Easy</td>
                <td className="px-6 py-4 whitespace-nowrap">Good</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Audio & Video Creation</h2>

        {/* Descript */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>9. Descript</CardTitle>
            <p className="text-sm text-gray-600">Free $15/mo (Creator)</p>
          </CardHeader>
          <CardContent>
            <p>All-in-one audio/video editing platform with powerful AI capabilities.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Text-based video editing</li>
              <li>AI voice cloning (Overdub)</li>
              <li>Automatic transcription</li>
              <li>Filler word removal</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Podcasters, video creators, and anyone needing to edit audio or video content efficiently.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://www.descript.com/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* Murf.ai */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>10. Murf.ai</CardTitle>
            <p className="text-sm text-gray-600">Free $19/mo (Basic)</p>
          </CardHeader>
          <CardContent>
            <p>AI voice generator platform with studio-quality voices for various use cases.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>120+ natural-sounding AI voices</li>
              <li>20+ languages supported</li>
              <li>Voice customization</li>
              <li>Background music integration</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>eLearning creators, marketers, video producers, and anyone needing professional voiceovers.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://murf.ai/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* Runway Gen-2 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>11. Runway Gen-2</CardTitle>
            <p className="text-sm text-gray-600">Free (Limited) $15/mo (Standard)</p>
          </CardHeader>
          <CardContent>
            <p>AI video generation platform for creating and editing video content.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Text-to-video generation</li>
              <li>Image-to-video generation</li>
              <li>Video editing with AI</li>
              <li>Green screen and background removal</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Filmmakers, content creators, marketers, and anyone needing to generate video content quickly.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://runwayml.com/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* Otter.ai */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>12. Otter.ai</CardTitle>
            <p className="text-sm text-gray-600">Free $16.99/mo (Pro)</p>
          </CardHeader>
          <CardContent>
            <p>AI meeting assistant that transcribes, summarizes, and generates notes from audio.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Real-time transcription</li>
              <li>Meeting summaries and highlights</li>
              <li>Speaker identification</li>
              <li>Integration with Zoom, Teams, and Google Meet</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Professionals who attend many meetings, journalists, researchers, and students.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://otter.ai/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Research & Knowledge Tools</h2>

        {/* Perplexity AI */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>13. Perplexity AI</CardTitle>
            <p className="text-sm text-gray-600">Free $19.99/mo (Pro)</p>
          </CardHeader>
          <CardContent>
            <p>AI-powered answer engine that provides cited research and information.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Real-time internet search with sources</li>
              <li>Document upload and analysis (Pro)</li>
              <li>Custom collections (Spaces)</li>
              <li>GPT-4 integration (Pro)</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Researchers, students, writers, and professionals needing reliable information with citations.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://www.perplexity.ai/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* Elicit */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>14. Elicit</CardTitle>
            <p className="text-sm text-gray-600">Free $10/mo (Plus)</p>
          </CardHeader>
          <CardContent>
            <p>AI research assistant specialized in academic literature search and analysis.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Scientific paper searches and summaries</li>
              <li>Research question breakdown</li>
              <li>Paper comparison and analysis</li>
              <li>Research extraction and organization</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Academic researchers, scientists, students, and professionals needing to review academic literature.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://elicit.org/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* Consensus */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>15. Consensus</CardTitle>
            <p className="text-sm text-gray-600">Free $9.99/mo</p>
          </CardHeader>
          <CardContent>
            <p>AI search engine for scientific research papers with evidence-based answers.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Scientific consensus detection</li>
              <li>Evidence-backed responses</li>
              <li>Paper credibility analysis</li>
              <li>Research summary generation</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Scientists, journalists, medical professionals, and anyone seeking evidence-based information.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://consensus.app/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* You.com */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>16. You.com</CardTitle>
            <p className="text-sm text-gray-600">Free $19.99/mo (Pro)</p>
          </CardHeader>
          <CardContent>
            <p>AI search engine with chat capabilities and app integrations.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Chat-based search with citations</li>
              <li>Code assistance (YouCode)</li>
              <li>App integrations for shopping, travel, etc.</li>
              <li>Personalized search experience</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>General users looking for an AI-powered search alternative, developers, and researchers.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://you.com/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Productivity & Workflow</h2>

        {/* Notion AI */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>17. Notion AI</CardTitle>
            <p className="text-sm text-gray-600">$10/mo (add-on)</p>
          </CardHeader>
          <CardContent>
            <p>AI writing assistant integrated with Notion's workspace platform.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Content generation in Notion</li>
              <li>Summarization and rewriting</li>
              <li>Translation and editing</li>
              <li>Q&A with your notes and documents</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Notion users, productivity enthusiasts, project managers, and team collaborators.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://www.notion.so/product/ai" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* TextExpander */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>18. TextExpander</CardTitle>
            <p className="text-sm text-gray-600">$3.33/mo (annual)</p>
          </CardHeader>
          <CardContent>
            <p>Text expansion tool with AI-powered snippet suggestions and organization.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Custom keyboard shortcuts for text</li>
              <li>Team snippet sharing</li>
              <li>Cross-platform synchronization</li>
              <li>Fill-in forms and templates</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Customer support teams, sales professionals, and anyone who types repetitive text.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://textexpander.com/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* Taskade */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>19. Taskade</CardTitle>
            <p className="text-sm text-gray-600">Free $19/mo (Unlimited)</p>
          </CardHeader>
          <CardContent>
            <p>AI-powered productivity workspace for task management, notes, and mind maps.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>AI task and project generation</li>
              <li>Real-time team collaboration</li>
              <li>Multiple view options (list, board, action, mind map)</li>
              <li>Built-in video chat</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Remote teams, project managers, students, and entrepreneurs managing multiple projects.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://www.taskade.com/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        {/* Mem.ai */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>20. Mem.ai</CardTitle>
            <p className="text-sm text-gray-600">Free $10/mo (Pro)</p>
          </CardHeader>
          <CardContent>
            <p>AI-powered note-taking app that organizes information automatically.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Automatic note organization</li>
              <li>Smart search capabilities</li>
              <li>Time-based reminders</li>
              <li>AI-powered writing assistant</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Best For:</h4>
            <p>Knowledge workers, researchers, students, and professionals who take lots of notes.</p>
            <Button variant="link" asChild className="px-0 mt-2">
              <a href="https://mem.ai/" target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>

        <h3 className="text-xl font-semibold mt-8 mb-2">Knowledge Check</h3>
        <p>Which of the following tools is specifically designed for academic research with scientific papers?</p>
        <ul className="list-disc list-inside ml-4">
          <li>A. ChatGPT</li>
          <li>B. Elicit</li>
          <li>C. Canva Pro</li>
          <li>D. Descript</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion: Getting Started with Budget-Friendly AI Tools</h2>
        <p>As we've seen, there's a vast ecosystem of powerful AI tools available for under $20 per month. To make the most of these tools:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Start with free tiers to test which tools best fit your workflow before committing to subscriptions.</li>
          <li>Combine complementary tools rather than looking for an all-in-one solution. For example, pair a research tool like Perplexity with a writing tool like Copy.ai.</li>
          <li>Look for annual discounts on tools you use regularly to reduce costs further.</li>
          <li>Stay updated as these tools rapidly evolve with new features and capabilities.</li>
          <li>Consider your specific needs rather than choosing the most popular tools. The best tool is the one that solves your particular problems.</li>
        </ul>

        <p className="font-semibold">Final Tip:</p>
        <p>Many of these tools offer significant educational or non-profit discounts. If you qualify, be sure to check for special pricing options that could make premium features even more affordable.</p>

        <h3 className="text-xl font-semibold mt-8 mb-2">Continue Your Learning</h3>
        <p>In the next module, we'll explore how to use Claude and ChatGPT for managing projects effectively, taking advantage of their unique capabilities to streamline your workflow.</p>
      </div>

      <div className="mt-12 flex justify-between items-center">
        <Button onClick={() => window.history.back()}>
          <ArrowRight className="w-4 h-4 mr-2 transform rotate-180" /> Back to Resources
        </Button>
        <Button onClick={() => window.location.href = '/resources/training/claude-chatgpt-projects'}>
          Next Module <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Container>
  )
}
