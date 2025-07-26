'use client'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, CodeXml, BookOpen, Bot, Database, Github, Settings, Brain, Layers, Search, Shield } from 'lucide-react'
import Link from 'next/link'

export default function ProgrammingTrainingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white py-20">
        <Container>
          <div className="text-center">
            <CodeXml className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              AI Integration & Programming Training
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200">
              Advanced tools and training for manufacturing SMBs ready to build custom AI solutions and integrate cutting-edge technologies.
            </p>
            <Button href="#training-modules" variant="primary" size="lg">
              Explore Training Modules
            </Button>
          </div>
        </Container>
      </section>

      {/* AI Assistant Training Section */}
      <section id="training-modules" className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">AI Assistant Mastery</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Learn to leverage the most powerful AI assistants for manufacturing operations, project management, and business intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Bot className="h-12 w-12 text-green-500 mb-4" />
                <CardTitle className="text-xl">ChatGPT for Manufacturing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Master ChatGPT for manufacturing operations, process optimization, and team communication. Learn prompt engineering specific to industrial applications.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">• Process optimization prompts</div>
                  <div className="text-sm text-gray-600">• Quality control documentation</div>
                  <div className="text-sm text-gray-600">• Safety protocol generation</div>
                  <div className="text-sm text-gray-600">• Training material creation</div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training/chatgpt-guide'}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Layers className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle className="text-xl">Claude for Technical Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Master Claude&apos;s advanced reasoning for complex manufacturing projects, documentation, and strategic planning. Perfect for detailed analysis.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">• Technical documentation</div>
                  <div className="text-sm text-gray-600">• Project planning & analysis</div>
                  <div className="text-sm text-gray-600">• Code review & debugging</div>
                  <div className="text-sm text-gray-600">• Complex problem solving</div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training/claude-guide'}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Search className="h-12 w-12 text-purple-500 mb-4" />
                <CardTitle className="text-xl">Perplexity for Research</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Master Perplexity for manufacturing research, competitive analysis, and staying current with industry trends and technologies.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">• Industry research & trends</div>
                  <div className="text-sm text-gray-600">• Competitive intelligence</div>
                  <div className="text-sm text-gray-600">• Technology evaluation</div>
                  <div className="text-sm text-gray-600">• Supplier & vendor research</div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training/perplexity-guide'}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-orange-500 mb-4" />
                <CardTitle className="text-xl">Notebook LM for Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Use Google's Notebook LM to organize manufacturing knowledge, create training materials, and build searchable documentation systems.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">• Knowledge management</div>
                  <div className="text-sm text-gray-600">• Training material creation</div>
                  <div className="text-sm text-gray-600">• Document analysis</div>
                  <div className="text-sm text-gray-600">• Team knowledge sharing</div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training/notebooklm-guide'}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Brain className="h-12 w-12 text-indigo-500 mb-4" />
                <CardTitle className="text-xl">Gemini for Data Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Leverage Google Gemini for manufacturing data analysis, trend identification, and automated reporting. Perfect for operations insights.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">• Production data analysis</div>
                  <div className="text-sm text-gray-600">• Trend identification</div>
                  <div className="text-sm text-gray-600">• Automated reporting</div>
                  <div className="text-sm text-gray-600">• Performance optimization</div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training/gemini-guide'}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Advanced Programming Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Advanced Programming & Integration</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              For manufacturing teams ready to build custom solutions and integrate advanced AI capabilities into their operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Settings className="h-12 w-12 text-cyan-500 mb-4" />
                <CardTitle className="text-xl">API Development & Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Learn to build and integrate APIs for connecting manufacturing systems, databases, and AI services. Python and TypeScript focus.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training/api-development'}
                >
                  <CodeXml className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Database className="h-12 w-12 text-cyan-500 mb-4" />
                <CardTitle className="text-xl">Firebase & Database Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Master Firebase and Firestore for building scalable manufacturing applications with real-time data and cloud storage.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training/firebase-training'}
                >
                  <Database className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Shield className="h-12 w-12 text-cyan-500 mb-4" />
                <CardTitle className="text-xl">MCP & Docker Desktop</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Master Model Context Protocol and Docker Desktop for secure system access and container management in manufacturing.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training/mcp-docker-guide'}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Github className="h-12 w-12 text-cyan-500 mb-4" />
                <CardTitle className="text-xl">Version Control & Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Learn advanced GitHub workflows, collaboration strategies, and DevOps automation for manufacturing development teams.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training/github-workflows'}
                >
                  <Github className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Brain className="h-12 w-12 text-cyan-500 mb-4" />
                <CardTitle className="text-xl">Local LLM Deployment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Deploy and manage Large Language Models locally for manufacturing applications requiring data privacy and custom training.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training/local-llm'}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Bot className="h-12 w-12 text-cyan-500 mb-4" />
                <CardTitle className="text-xl">Hugging Face Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Integrate state-of-the-art machine learning models from Hugging Face into manufacturing applications and workflows.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training/huggingface-integration'}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Who Should Enroll Section */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Who Should Take Advanced AI Training?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Perfect For:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Operations Managers</strong> wanting to build custom monitoring and analysis tools</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Process Engineers</strong> looking to integrate AI into existing systems</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Quality Managers</strong> building automated inspection systems</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>IT Professionals</strong> in manufacturing environments</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Business Owners</strong> ready to implement advanced AI solutions</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Prerequisites:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Completion of AI Fundamentals training</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Basic understanding of your manufacturing processes</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Willingness to learn hands-on programming concepts</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Access to development environment (provided)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-800 mb-2">
                Practical, Manufacturing-Focused Approach
              </h3>
              <p className="text-cyan-700">
                All programming training is designed specifically for manufacturing environments. Learn to build solutions that solve real operational challenges, from automated quality inspection to predictive maintenance systems. Our curriculum combines 30+ years of manufacturing experience with cutting-edge AI development expertise.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cyan-500 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Build Custom AI Solutions?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Move beyond basic AI tools to create custom solutions that transform your manufacturing operations.
            </p>
            <div className="space-x-4">
              <Button href="/consultation" variant="outline" size="lg" className="bg-white text-cyan-500 hover:bg-gray-100">
                Schedule Technical Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/resources" variant="secondary" size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                Back to All Resources
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
