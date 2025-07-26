'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Wrench, Clock, CheckCircle, ExternalLink, BookOpen, 
  Play, Target, ArrowRight, Lightbulb, Users, 
  Star, Award, TrendingUp, Zap, Settings, Cpu, Code, FileText
} from 'lucide-react'

export default function TechExplorerPage() {
  const [completedModules, setCompletedModules] = useState<string[]>([])

  const toggleModule = (moduleId: string) => {
    setCompletedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const intermediateModules = [
    { 
      id: 'engineering-alignment',
      title: 'Engineering Alignment', 
      prerequisite: null,
      url: '/resources/training/engineering-alignment',
      description: 'Aligning context, prompts, and AI models for optimal business results.',
      keyTopics: ['Context Engineering', 'Model Selection', 'Output Optimization', 'Performance Tuning']
    },
    { 
      id: 'ai-tools-catalog',
      title: 'Top 20 AI Tools Under $20/Month', 
      prerequisite: 'Engineering Alignment',
      url: '/resources/training/ai-tools-budget',
      description: 'Comprehensive guide to cost-effective AI tools perfect for SMBs.',
      keyTopics: ['Tool Evaluation', 'Cost-Benefit Analysis', 'Integration Planning', 'ROI Measurement']
    },
    { 
      id: 'ai-project-management',
      title: 'Using Claude and ChatGPT for Projects', 
      prerequisite: 'Top 20 AI Tools Under $20/Month',
      url: '/resources/training/claude-chatgpt-projects',
      description: 'Leveraging AI assistants for project management and workflow optimization.',
      keyTopics: ['Project Planning', 'Team Coordination', 'Documentation', 'Quality Control']
    }
  ]

  const implementationProjects = [
    {
      title: 'Smart Inventory Management System',
      description: 'Build an AI-powered inventory tracking system using free tools',
      tools: ['Google Sheets', 'Zapier', 'ChatGPT API', 'Barcode Scanner'],
      difficulty: 'Intermediate',
      roi: 'High',
      outcomes: ['Automated reorder alerts', 'Usage pattern analysis', 'Cost optimization']
    },
    {
      title: 'Quality Control Dashboard',
      description: 'Create automated quality metrics tracking and reporting',
      tools: ['Power BI', 'Microsoft Forms', 'Power Automate', 'AI Builder'],
      difficulty: 'Intermediate',
      roi: 'Very High',
      outcomes: ['Real-time quality metrics', 'Trend analysis', 'Automated reporting']
    },
    {
      title: 'Predictive Maintenance Alert System',
      description: 'Set up AI-driven maintenance scheduling and alerts',
      tools: ['Google Cloud', 'Teachable Machine', 'IFTTT', 'Slack/Teams'],
      difficulty: 'Advanced',
      roi: 'Very High',
      outcomes: ['Reduced downtime', 'Cost savings', 'Extended equipment life']
    }
  ]

  const toolCategories = [
    {
      category: 'Data Analysis & Visualization',
      tools: [
        { name: 'Power BI with AI Features', cost: '$10/month', useCase: 'Business intelligence dashboards' },
        { name: 'Tableau Public', cost: 'Free', useCase: 'Data visualization and sharing' },
        { name: 'Google Looker Studio', cost: 'Free', useCase: 'Custom reporting dashboards' }
      ]
    },
    {
      category: 'Process Automation',
      tools: [
        { name: 'Microsoft Power Automate', cost: '$15/month', useCase: 'Workflow automation' },
        { name: 'Zapier', cost: '$20/month', useCase: 'App integration and automation' },
        { name: 'IFTTT Pro', cost: '$3.99/month', useCase: 'Simple trigger-based automation' }
      ]
    },
    {
      category: 'Document & Knowledge Management',
      tools: [
        { name: 'Notion AI', cost: '$8/month', useCase: 'Smart documentation and wikis' },
        { name: 'Obsidian', cost: 'Free', useCase: 'Networked knowledge management' },
        { name: 'Google NotebookLM', cost: 'Free', useCase: 'AI-powered research and analysis' }
      ]
    }
  ]

  const skillProgression = [
    {
      phase: 'Phase 1: Foundation Building',
      skills: ['Advanced prompt engineering', 'Tool evaluation', 'Basic automation'],
      deliverables: ['First automated workflow', 'Tool selection framework', 'ROI measurement plan']
    },
    {
      phase: 'Phase 2: Implementation',
      skills: ['API integration', 'Data pipeline creation', 'Dashboard development'],
      deliverables: ['Live dashboard', 'Automated reporting', 'Integration documentation']
    },
    {
      phase: 'Phase 3: Optimization',
      skills: ['Performance tuning', 'Advanced analytics', 'Team training'],
      deliverables: ['Optimized workflows', 'Training materials', 'Scale-up plan']
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <Container>
          <div className="text-center">
            <Wrench className="h-20 w-20 mx-auto mb-6 text-green-100" />
            <h1 className="text-5xl font-bold mb-6">Tech Explorer Training Path</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Ready to implement AI tools in your manufacturing environment? This path is designed for those with technical background.
            </p>
          </div>
        </Container>
      </section>

      {/* Implementation Projects Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <Container>
          <div className="text-center mb-12">
            <Cpu className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Ready-to-Build Projects</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Practical implementation projects with step-by-step guides and real manufacturing impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {implementationProjects.map((project, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Settings className="h-8 w-8 text-blue-600" />
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {project.roi} ROI
                    </div>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Tools Required:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.tools.map((tool, toolIndex) => (
                          <span key={toolIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Expected Outcomes:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {project.outcomes.map((outcome, outcomeIndex) => (
                          <li key={outcomeIndex} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <Code className="h-4 w-4 mr-1" />
                    View Implementation Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* AI Tools Catalog Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <Settings className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Manufacturing AI Tool Stack</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Curated tools specifically selected for manufacturing environments with cost-benefit analysis
            </p>
          </div>

          <div className="space-y-8">
            {toolCategories.map((category, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.category}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {category.tools.map((tool, toolIndex) => (
                    <Card key={toolIndex} className="hover:shadow-md transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{tool.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            tool.cost === 'Free' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {tool.cost}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{tool.useCase}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Skill Progression Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Your Implementation Journey</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A structured approach to building AI capabilities in your manufacturing environment
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {skillProgression.map((phase, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{phase.phase}</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Skills to Develop:</h4>
                          <ul className="space-y-1">
                            {phase.skills.map((skill, skillIndex) => (
                              <li key={skillIndex} className="flex items-center text-gray-700 text-sm">
                                <Zap className="h-3 w-3 text-green-600 mr-2" />
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Key Deliverables:</h4>
                          <ul className="space-y-1">
                            {phase.deliverables.map((deliverable, deliverableIndex) => (
                              <li key={deliverableIndex} className="flex items-center text-gray-700 text-sm">
                                <Target className="h-3 w-3 text-blue-600 mr-2" />
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Training Modules Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
        <Container>
          <div className="text-center mb-12">
            <BookOpen className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Intermediate Training Modules</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Deep-dive modules for building advanced AI implementation skills
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {intermediateModules.map((module, index) => {
              const isCompleted = completedModules.includes(module.id)
              const canStart = !module.prerequisite || completedModules.includes(module.prerequisite.toLowerCase().replace(/\s+/g, '-'))
              
              return (
                <Card 
                  key={module.id}
                  className={`transition-all duration-300 ${
                    isCompleted ? 'bg-green-50 border-green-200' : 
                    canStart ? 'hover:shadow-lg cursor-pointer' : 'opacity-60'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          isCompleted ? 'bg-green-600' : 
                          canStart ? 'bg-green-600' : 'bg-gray-400'
                        }`}>
                          {isCompleted ? <CheckCircle className="h-6 w-6" /> : index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                          <p className="text-gray-600 mb-3">{module.description}</p>
                          {module.prerequisite && (
                            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <span>Requires: {module.prerequisite}</span>
                              </div>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {module.keyTopics.map((topic, topicIndex) => (
                              <span key={topicIndex} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        {canStart ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toggleModule(module.id)
                              window.location.href = module.url
                            }}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Start Module
                          </Button>
                        ) : (
                          <span className="text-sm text-gray-500">Complete prerequisite first</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Advanced Resources Section */}
      <section className="py-16 bg-gray-100">
        <Container>
          <div className="text-center mb-12">
            <Code className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Advanced Technical Resources</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Ready for custom development? Explore our programming and integration training.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-6 w-6 text-blue-600 mr-2" />
                  Programming Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Learn to build custom AI solutions with APIs, automation, and integration techniques.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training'}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Programming Training
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-6 w-6 text-green-600 mr-2" />
                  MCP & Docker Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Master advanced system integration with Model Context Protocol and containerization.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training/mcp-docker-guide'}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View MCP Training
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Next Steps CTA */}
      <section className="py-16 bg-green-600 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Build Your First AI Solution?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start with the engineering alignment module, then choose an implementation project that fits your needs. 
              You&apos;ll have a working AI solution within hours.
            </p>
            <div className="space-x-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100"
                onClick={() => window.location.href = '/resources/training/engineering-alignment'}
              >
                Start Engineering Module
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/consultation" variant="secondary" size="lg" className="bg-green-700 hover:bg-green-800">
                Get Implementation Support
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}