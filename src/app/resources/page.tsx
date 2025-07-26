'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Download, ExternalLink, FileText, Video, BookOpen, Settings, 
  Lightbulb, ArrowRight, Brain, Keyboard, Wrench, Bot, Search, 
  Users, Zap, GraduationCap, CodeXml, Star, Clock, CheckCircle,
  Target, TrendingUp, Award, ChevronRight, Play, Calculator
} from 'lucide-react'

export default function ResourcesPage() {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null)
  const [completedModules, setCompletedModules] = useState<string[]>([])

  const userTypes = [
    {
      id: 'beginner',
      title: 'AI Newcomer',
      description: 'New to AI but curious about manufacturing applications',
      icon: Brain,
      color: 'blue'
    },
    {
      id: 'explorer',
      title: 'Tech Explorer',
      description: 'Some technical background, ready to implement tools',
      icon: Wrench,
      color: 'green'
    },
    {
      id: 'advanced',
      title: 'Implementation Leader',
      description: 'Leading AI initiatives, need advanced strategies',
      icon: Users,
      color: 'orange'
    }
  ]

  const quickWins = [
    {
      title: 'ChatGPT for Documentation',
      description: 'Turn messy notes into professional SOPs',
      difficulty: 'Easy',
      roi: 'High',
      url: '/resources/quick-wins/chatgpt-docs'
    },
    {
      title: 'Voice-to-Text Quality Reports',
      description: 'Dictate inspection findings directly to reports',
      difficulty: 'Easy',
      roi: 'Medium',
      url: '/resources/quick-wins/voice-reports'
    },
    {
      title: 'Smart Inventory Tracking',
      description: 'Use smartphone camera for automated counts',
      difficulty: 'Medium',
      roi: 'High',
      url: '/resources/quick-wins/inventory-tracking'
    }
  ]

  const learningPaths = {
    beginner: [
      { 
        module: 'AI Fundamentals for Business', 
        prerequisite: null,
        url: '/resources/training/ai-fundamentals',
        description: 'Essential AI concepts, terminology, and applications for business teams.'
      },
      { 
        module: 'Prompt Engineering for Leaders', 
        prerequisite: 'AI Fundamentals for Business',
        url: '/resources/training/prompt-engineering',
        description: 'Master the art of crafting effective prompts for business AI applications.'
      },
      { 
        module: 'AI Tools for Daily Productivity', 
        prerequisite: 'Prompt Engineering for Leaders',
        url: '/resources/training/ai-daily-productivity',
        description: 'Practical applications of AI for everyday business tasks and productivity.'
      }
    ],
    explorer: [
      { 
        module: 'Engineering Alignment', 
        prerequisite: null,
        url: '/resources/training/engineering-alignment',
        description: 'Aligning context, prompts, and AI models for optimal business results.'
      },
      { 
        module: 'Top 20 AI Tools Under $20/Month', 
        prerequisite: 'Engineering Alignment',
        url: '/resources/training/ai-tools-budget',
        description: 'Comprehensive guide to cost-effective AI tools perfect for SMBs.'
      },
      { 
        module: 'Using Claude and ChatGPT for Projects', 
        prerequisite: 'Top 20 AI Tools Under $20/Month',
        url: '/resources/training/claude-chatgpt-projects',
        description: 'Leveraging AI assistants for project management and workflow optimization.'
      }
    ],
    advanced: [
      { 
        module: 'Utilizing Notebook LM', 
        prerequisite: null,
        url: '/resources/training/notebook-lm',
        description: 'In-depth guide to setting up and using Notebook LM for knowledge management.'
      },
      { 
        module: 'Understanding Perplexity Spaces and Gemini Gems', 
        prerequisite: 'Utilizing Notebook LM',
        url: '/resources/training/ai-research-platforms',
        description: 'Exploration of these AI research and knowledge platforms for business insights.'
      },
      { 
        module: 'Using Perplexity and Gemini as Project Hubs', 
        prerequisite: 'Understanding Perplexity Spaces and Gemini Gems',
        url: '/resources/training/ai-project-hubs',
        description: 'Leveraging these platforms as team collaboration centers for business projects.'
      },
      { 
        module: 'MCP & Docker Desktop Training', 
        prerequisite: 'Using Perplexity and Gemini as Project Hubs',
        url: '/resources/programming-training/mcp-docker-guide',
        description: 'Master the Model Context Protocol (MCP) and Docker Desktop for secure, efficient system access.'
      }
    ]
  }

  const toggleModule = (moduleId: string) => {
    setCompletedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  return (
    <>
      {/* Hero Section with User Type Selection */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              Your AI Learning Journey Starts Here
            </h1>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Personalized learning paths designed for manufacturing teams. Choose your starting point and follow a proven path to AI success.
            </p>
          </div>

          {/* User Type Selector */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {userTypes.map((type) => {
              const IconComponent = type.icon
              const isSelected = selectedUserType === type.id
              return (
                <div 
                  key={type.id}
                  className="cursor-pointer"
                  onClick={(e) => {
                    // Only set selection if clicking on the card, not the button
                    if (e.target === e.currentTarget || !(e.target as HTMLElement).closest('button')) {
                      setSelectedUserType(type.id)
                    }
                  }}
                >
                  <Card 
                    className={`transition-all duration-300 ${
                      isSelected 
                        ? 'ring-4 ring-cyan-400 bg-white transform scale-105' 
                        : 'bg-white/90 hover:bg-white hover:scale-102'
                    }`}
                  >
                  <CardContent className="p-6 text-center">
                    <IconComponent className={`h-12 w-12 mx-auto mb-4 text-${type.color}-600`} />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-gray-700 mb-4">{type.description}</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const routes = {
                          beginner: '/resources/ai-newcomer',
                          explorer: '/resources/tech-explorer',
                          advanced: '/resources/implementation-leader'
                        }
                        window.location.href = routes[type.id as keyof typeof routes]
                      }}
                    >
                      <ArrowRight className="h-4 w-4 mr-1" />
                      View Training Path
                    </Button>
                  </CardContent>
                </Card>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Quick Wins Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <Container>
          <div className="text-center mb-12">
            <Target className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Quick Wins</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Start seeing immediate value with these fast-implementation AI solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {quickWins.map((win, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Zap className="h-8 w-8 text-green-600" />
                    <div className="flex gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {win.difficulty}
                    </span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{win.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{win.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium">{win.roi} ROI</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => window.location.href = win.url}>
                      <Play className="h-4 w-4 mr-1" />
                      Start Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Personalized Learning Path */}
      {selectedUserType && (
        <section className="py-16 bg-white">
          <Container>
            <div className="text-center mb-12">
              <Award className="h-16 w-16 text-cyan-600 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Your Personalized Learning Path
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Follow this proven sequence designed for {userTypes.find(t => t.id === selectedUserType)?.title.toLowerCase()}s
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {learningPaths[selectedUserType as keyof typeof learningPaths]?.map((step, index) => {
                  const isCompleted = completedModules.includes(step.module)
                  const canStart = !step.prerequisite || completedModules.includes(step.prerequisite)
                  
                  return (
                    <div 
                      key={step.module}
                      className="cursor-pointer"
                      onClick={() => {
                        if (canStart) {
                          if (step.url.startsWith('http')) {
                            window.open(step.url, '_blank')
                          } else {
                            window.location.href = step.url
                          }
                          toggleModule(step.module)
                        }
                      }}
                    >
                      <Card 
                        className={`transition-all duration-300 ${
                          isCompleted ? 'bg-green-50 border-green-200' : 
                          canStart ? 'hover:shadow-lg' : 'opacity-60'
                        }`}
                      >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isCompleted ? 'bg-green-600 text-white' : 
                              canStart ? 'bg-cyan-600 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>
                              {isCompleted ? <CheckCircle className="h-5 w-5" /> : index + 1}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.module}</h3>
                              <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                              {step.prerequisite && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <span>Requires: {step.prerequisite}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {canStart ? (
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Start Module
                              </Button>
                            ) : (
                              <ChevronRight className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    </div>
                  )
                })}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* AI Training Hub Section - All Training Modules */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <Container>
          <div className="text-center mb-12">
            <GraduationCap className="h-16 w-16 text-cyan-500 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Progressive Learning System</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Our curriculum follows proven CS education principles with proper skill scaffolding from business AI to technical development
            </p>
            
            {/* Learning Progression Explanation */}
            <div className="bg-white rounded-lg p-6 shadow-md max-w-5xl mx-auto mb-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">🎓 Your Learning Journey</h3>
              <div className="grid md:grid-cols-5 gap-4 text-center">
                <div className="space-y-3">
                  <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium">
                    Level 0: AI Literacy
                  </div>
                  <p className="text-sm text-gray-600">Business foundations</p>
                  <div className="text-xs text-gray-500">AI Fundamentals → Prompting → Productivity</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
                <div className="space-y-3">
                  <div className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium">
                    Level 1: AI Integration
                  </div>
                  <p className="text-sm text-gray-600">Technical implementation</p>
                  <div className="text-xs text-gray-500">Engineering → Tools → Projects</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
                <div className="space-y-3">
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-full text-sm font-medium">
                    Level 2: Technical Bridge
                  </div>
                  <p className="text-sm text-gray-600">Development preparation</p>
                  <div className="text-xs text-gray-500">APIs → Automation → Command Line</div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-3">
                  <div className="bg-orange-100 text-orange-800 px-3 py-2 rounded-full text-sm font-medium">
                    Level 3: AI Development
                  </div>
                  <p className="text-sm text-gray-600">Custom AI solutions</p>
                  <div className="text-xs text-gray-500">API Integration → Databases → Cloud Deploy</div>
                </div>
                <div className="space-y-3">
                  <div className="bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium">
                    Level 4: AI Systems
                  </div>
                  <p className="text-sm text-gray-600">Enterprise infrastructure</p>
                  <div className="text-xs text-gray-500">MCP Docker → Local LLM → Production</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>🔧 Key Innovation:</strong> Our Level 2 "Technical Bridge" modules solve the #1 problem in AI education - 
                  the massive skill gap between business AI tools and programming. No more hitting a brick wall!
                </p>
              </div>
            </div>
          </div>

          {/* Training Modules Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Brain className="h-8 w-8 text-blue-600" />
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    Beginner
                  </div>
                </div>
                <CardTitle className="text-lg">AI Fundamentals for Business</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Essential AI concepts, terminology, and applications for business teams.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/training/ai-fundamentals'}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Keyboard className="h-8 w-8 text-blue-600" />
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    Beginner
                  </div>
                </div>
                <CardTitle className="text-lg">Prompt Engineering for Leaders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Master the art of crafting effective prompts for business AI applications.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/training/prompt-engineering'}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Zap className="h-8 w-8 text-blue-600" />
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    Beginner
                  </div>
                </div>
                <CardTitle className="text-lg">AI Tools for Daily Productivity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Practical applications of AI for everyday manufacturing tasks and productivity.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/training/ai-daily-productivity'}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Wrench className="h-8 w-8 text-green-600" />
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Intermediate
                  </div>
                </div>
                <CardTitle className="text-lg">Engineering Alignment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Aligning context, prompts, and AI models for optimal manufacturing results.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/training/engineering-alignment'}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Settings className="h-8 w-8 text-green-600" />
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Intermediate
                  </div>
                </div>
                <CardTitle className="text-lg">Top 20 AI Tools Under $20/Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Comprehensive guide to cost-effective AI tools perfect for SMBs.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/training/ai-tools-budget'}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Bot className="h-8 w-8 text-green-600" />
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Intermediate
                  </div>
                </div>
                <CardTitle className="text-lg">Using Claude and ChatGPT for Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Leveraging AI assistants for manufacturing project management and workflow optimization.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/training/claude-chatgpt-projects'}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            {/* NEW: Level 2 Technical Foundation Modules */}
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 border-yellow-200">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Settings className="h-8 w-8 text-yellow-600" />
                  <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    Bridge
                  </div>
                </div>
                <CardTitle className="text-lg">API Fundamentals & Web Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Bridge to technical skills: Learn how AI systems communicate behind the scenes.
                </p>
                <div className="bg-yellow-50 p-2 rounded text-xs text-yellow-800 mb-3">
                  <strong>Prerequisites:</strong> Claude ChatGPT Projects
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-yellow-400 text-yellow-700 hover:bg-yellow-50"
                  onClick={() => window.location.href = '/resources/training/technical-foundation/api-fundamentals'}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Start Bridge Course
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 border-yellow-200">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Zap className="h-8 w-8 text-yellow-600" />
                  <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    Bridge
                  </div>
                </div>
                <CardTitle className="text-lg">No-Code Integration Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Build powerful automation workflows using Zapier, Power Automate, and IFTTT.
                </p>
                <div className="bg-yellow-50 p-2 rounded text-xs text-yellow-800 mb-3">
                  <strong>Prerequisites:</strong> API Fundamentals
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-yellow-400 text-yellow-700 hover:bg-yellow-50"
                  onClick={() => window.location.href = '/resources/training/technical-foundation/no-code-integration'}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Continue Bridge
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <BookOpen className="h-8 w-8 text-orange-600" />
                  <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    Advanced
                  </div>
                </div>
                <CardTitle className="text-lg">Utilizing Notebook LM</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  In-depth guide to setting up and using Notebook LM for knowledge management.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/training/notebook-lm'}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Search className="h-8 w-8 text-orange-600" />
                  <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    Advanced
                  </div>
                </div>
                <CardTitle className="text-lg">Understanding Perplexity Spaces and Gemini Gems</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Exploration of these AI research and knowledge platforms for manufacturing insights.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/training/ai-research-platforms'}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-8 w-8 text-orange-600" />
                  <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    Advanced
                  </div>
                </div>
                <CardTitle className="text-lg">Using Perplexity and Gemini as Project Hubs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Leveraging these platforms as team collaboration centers for manufacturing projects.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/training/ai-project-hubs'}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CodeXml className="h-8 w-8 text-orange-600" />
                  <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    Advanced
                  </div>
                </div>
                <CardTitle className="text-lg">MCP & Docker Desktop Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Master the Model Context Protocol (MCP) and Docker Desktop for secure, efficient system access.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training/mcp-docker-guide'}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  View Training Guide
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Training Hub CTA */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg p-6 shadow-md max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-4">Complete Training Hub Access</h3>
              <p className="text-gray-700 mb-4">
                Access all training modules with interactive features, progress tracking, and downloadable PDFs.
              </p>
              <div className="space-x-4">
                <Button 
                  variant="primary" 
                  onClick={() => window.location.href = '/resources/training-hub'}
                >
                  <GraduationCap className="h-4 w-4 mr-1" />
                  Access Training Hub
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => alert('PDF download instructions: Visit each module page and use your browser\'s Print > Save as PDF function to download any module for offline access.')}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download Instructions
                </Button>
              </div>
            </div>
            
            {/* Advanced Programming Training */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg p-6 shadow-md max-w-2xl mx-auto mt-6">
              <h3 className="text-xl font-bold mb-4">Advanced AI & Programming Training</h3>
              <p className="text-slate-200 mb-4">
                Ready for custom AI solutions? Learn ChatGPT, Claude, API development, and advanced integration techniques.
              </p>
              <Button 
                variant="secondary" 
                className="bg-slate-600 hover:bg-slate-500 text-white"
                onClick={() => window.location.href = '/resources/programming-training'}
              >
                <CodeXml className="h-4 w-4 mr-1" />
                Explore Programming Training
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Personal Guidance CTA */}
      <section className="py-16 bg-cyan-500 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready for Personalized Guidance?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              These resources will get you started, but our consulting services provide customized 
              implementation support tailored to your specific manufacturing environment.
            </p>
            <div className="space-x-4">
              <Button href="/consultation" variant="outline" size="lg" className="bg-white text-cyan-500 hover:bg-gray-100">
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/services" variant="secondary" size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                View Services
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}