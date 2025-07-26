'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  GraduationCap, Clock, CheckCircle, ArrowRight, Brain, Wrench, Users, 
  Zap, Target, FileText, BookOpen, Search, Settings, Star, Download,
  Trophy, BarChart3, Calendar, MessageSquare
} from 'lucide-react'

export default function TrainingHubPage() {
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null)

  const trainingTracks = [
    {
      id: 'newcomer',
      title: 'AI Newcomer Track',
      description: 'Perfect for business leaders and team members new to AI',
      icon: Brain,
      color: 'blue',
      modules: ['ai-fundamentals', 'prompt-engineering', 'ai-daily-productivity'],
      estimatedTime: '4-6 hours',
      level: 'Beginner'
    },
    {
      id: 'explorer',
      title: 'Tech Explorer Track',
      description: 'For technically-minded individuals ready to implement AI tools',
      icon: Wrench,
      color: 'green',
      modules: ['engineering-alignment', 'ai-tools-budget', 'claude-chatgpt-projects'],
      estimatedTime: '6-8 hours',
      level: 'Intermediate'
    },
    {
      id: 'leader',
      title: 'Implementation Leader Track',
      description: 'Advanced strategies for leading AI initiatives across organizations',
      icon: Users,
      color: 'orange',
      modules: ['notebook-lm', 'ai-research-platforms', 'ai-project-hubs', 'mcp-docker'],
      estimatedTime: '8-12 hours',
      level: 'Advanced'
    }
  ]

  const allModules = {
    'ai-fundamentals': {
      title: 'AI Fundamentals for Business',
      description: 'Essential AI concepts, terminology, and applications for business teams',
      level: 'Beginner',
      track: 'newcomer',
      url: '/resources/training/ai-fundamentals',
      icon: Brain
    },
    'prompt-engineering': {
      title: 'Prompt Engineering for Leaders',
      description: 'Master the art of crafting effective prompts for business AI applications',
      level: 'Beginner',
      track: 'newcomer',
      url: '/resources/training/prompt-engineering',
      icon: MessageSquare
    },
    'ai-daily-productivity': {
      title: 'AI Tools for Daily Productivity',
      description: 'Practical applications of AI for everyday business tasks and productivity',
      level: 'Beginner',
      track: 'newcomer',
      url: '/resources/training/ai-daily-productivity',
      icon: Zap
    },
    'engineering-alignment': {
      title: 'Engineering Alignment',
      description: 'Aligning context, prompts, and AI models for optimal business results',
      level: 'Intermediate',
      track: 'explorer',
      url: '/resources/training/engineering-alignment',
      icon: Settings
    },
    'ai-tools-budget': {
      title: 'Top 20 AI Tools Under $20/Month',
      description: 'Comprehensive guide to cost-effective AI tools perfect for SMBs',
      level: 'Intermediate',
      track: 'explorer',
      url: '/resources/training/ai-tools-budget',
      icon: Target
    },
    'claude-chatgpt-projects': {
      title: 'Using Claude and ChatGPT for Projects',
      description: 'Leveraging AI assistants for project management and workflow optimization',
      level: 'Intermediate',
      track: 'explorer',
      url: '/resources/training/claude-chatgpt-projects',
      icon: Users
    },
    'notebook-lm': {
      title: 'Utilizing Notebook LM',
      description: 'In-depth guide to setting up and using Notebook LM for knowledge management',
      level: 'Advanced',
      track: 'leader',
      url: '/resources/training/notebook-lm',
      icon: BookOpen
    },
    'ai-research-platforms': {
      title: 'Understanding Perplexity Spaces and Gemini Gems',
      description: 'Exploration of these AI research and knowledge platforms for business insights',
      level: 'Advanced',
      track: 'leader',
      url: '/resources/training/ai-research-platforms',
      icon: Search
    },
    'ai-project-hubs': {
      title: 'Using Perplexity and Gemini as Project Hubs',
      description: 'Leveraging these platforms as team collaboration centers for business projects',
      level: 'Advanced',
      track: 'leader',
      url: '/resources/training/ai-project-hubs',
      icon: Users
    },
    'mcp-docker': {
      title: 'MCP & Docker Desktop Training',
      description: 'Master the Model Context Protocol (MCP) and Docker Desktop for secure system access',
      level: 'Advanced',
      track: 'leader',
      url: '/resources/programming-training/mcp-docker-guide',
      icon: Settings
    }
  }

  const toggleModule = (moduleId: string) => {
    setCompletedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const getTrackProgress = (trackId: string) => {
    const track = trainingTracks.find(t => t.id === trackId)
    if (!track) return 0
    const completed = track.modules.filter(moduleId => completedModules.includes(moduleId)).length
    return Math.round((completed / track.modules.length) * 100)
  }

  const getTotalProgress = () => {
    const totalModules = Object.keys(allModules).length
    return Math.round((completedModules.length / totalModules) * 100)
  }

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <GraduationCap className="h-16 w-16 text-cyan-600 mr-4" />
          <div>
            <h1 className="text-5xl font-bold text-gray-900">AI Training Hub</h1>
            <p className="text-xl text-gray-600 mt-2">Complete AI Education for Manufacturing Teams</p>
          </div>
        </div>
        
        {/* Overall Progress */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Your Learning Progress</h3>
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="font-bold text-xl text-cyan-600">{getTotalProgress()}%</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getTotalProgress()}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedModules.length} of {Object.keys(allModules).length} modules completed
          </p>
        </div>
      </div>

      {/* Learning Tracks */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Choose Your Learning Track</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {trainingTracks.map((track) => {
            const IconComponent = track.icon
            const progress = getTrackProgress(track.id)
            const isSelected = selectedTrack === track.id
            
            return (
              <div 
                key={track.id}
                className="cursor-pointer"
                onClick={() => setSelectedTrack(track.id)}
              >
                <Card 
                  className={`transition-all duration-300 h-full ${
                    isSelected 
                      ? 'ring-4 ring-cyan-400 transform scale-105' 
                      : 'hover:shadow-lg hover:scale-102'
                  }`}
                >
                <CardHeader className="text-center">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className={`h-10 w-10 text-${track.color}-600`} />
                    <div className="text-right">
                      <div className={`bg-${track.color}-100 text-${track.color}-800 px-2 py-1 rounded-full text-xs font-medium`}>
                        {track.level}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{track.estimatedTime}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{track.title}</CardTitle>
                  <p className="text-gray-600 text-sm">{track.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-bold text-cyan-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${track.color}-500 h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    variant={isSelected ? "primary" : "outline"}
                    onClick={() => {
                      if (track.modules.length > 0) {
                        const firstModule = allModules[track.modules[0] as keyof typeof allModules]
                        window.location.href = firstModule.url
                      }
                    }}
                  >
                    {progress === 100 ? 'Review Track' : progress > 0 ? 'Continue Track' : 'Start Track'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
              </div>
            )
          })}
        </div>
      </section>

      {/* Selected Track Details */}
      {selectedTrack && (
        <section className="mb-16">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              {trainingTracks.find(t => t.id === selectedTrack)?.title} Modules
            </h3>
            <div className="space-y-4">
              {trainingTracks.find(t => t.id === selectedTrack)?.modules.map((moduleId, index) => {
                const moduleInfo = allModules[moduleId as keyof typeof allModules]
                const IconComponent = moduleInfo.icon
                const isCompleted = completedModules.includes(moduleId)
                const canStart = index === 0 || completedModules.includes(trainingTracks.find(t => t.id === selectedTrack)?.modules[index - 1] || '')
                
                return (
                  <div 
                    key={moduleId}
                    className="cursor-pointer"
                    onClick={() => {
                      if (canStart) {
                        window.location.href = moduleInfo.url
                        toggleModule(moduleId)
                      }
                    }}
                  >
                    <Card 
                      className={`transition-all duration-300 ${
                        isCompleted ? 'bg-green-50 border-green-200' : 
                        canStart ? 'hover:shadow-md' : 'opacity-60'
                      }`}
                    >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-green-600 text-white' : 
                            canStart ? 'bg-cyan-600 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            {isCompleted ? <CheckCircle className="h-5 w-5" /> : index + 1}
                          </div>
                          <IconComponent className="h-6 w-6 text-gray-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{moduleInfo.title}</h4>
                            <p className="text-sm text-gray-600">{moduleInfo.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {canStart && (
                            <Button variant="outline" size="sm">
                              <ArrowRight className="h-4 w-4 mr-1" />
                              {isCompleted ? 'Review' : 'Start'}
                            </Button>
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
        </section>
      )}

      {/* All Modules Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">All Training Modules</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(allModules).map(([moduleId, module]) => {
            const IconComponent = module.icon
            const isCompleted = completedModules.includes(moduleId)
            
            return (
              <Card key={moduleId} className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className="h-8 w-8 text-cyan-600" />
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        module.level === 'Beginner' ? 'bg-blue-100 text-blue-800' :
                        module.level === 'Intermediate' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {module.level}
                      </div>
                      {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">{module.description}</p>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        window.location.href = module.url
                        if (!isCompleted) toggleModule(moduleId)
                      }}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      {isCompleted ? 'Review Module' : 'Start Learning'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => toggleModule(moduleId)}
                    >
                      {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Additional Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="h-6 w-6 mr-2 text-purple-600" />
                Downloadable Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Access PDF guides, checklists, and templates for offline use.
              </p>
              <Button 
                variant="outline"
                onClick={() => alert('PDF download instructions: Visit each module page and use your browser\'s Print > Save as PDF function to download any module for offline access.')}
              >
                Download Instructions
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-teal-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 mr-2 text-green-600" />
                Team Training
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Custom team training sessions and implementation support.
              </p>
              <Button 
                onClick={() => window.location.href = '/consultation'}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Schedule Team Training
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Monitor your learning progress and track skill development.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-bold">{getTotalProgress()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getTotalProgress()}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-orange-600" />
                Live Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Join live Q&A sessions and interactive workshops.
              </p>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/consultation'}
              >
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Getting Started Guide */}
      <section className="mb-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Getting Started Guide</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Your Track</h3>
            <p className="text-gray-600">
              Select the learning track that matches your experience level and goals.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Complete Modules</h3>
            <p className="text-gray-600">
              Work through modules sequentially, practicing concepts as you learn.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-orange-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Apply & Implement</h3>
            <p className="text-gray-600">
              Put your knowledge to work with real-world implementation projects.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Manufacturing with AI?</h2>
        <p className="text-xl mb-6 max-w-3xl mx-auto">
          Join hundreds of manufacturing professionals who have successfully implemented AI solutions 
          using our comprehensive training program.
        </p>
        <div className="space-x-4">
          <Button 
            size="lg" 
            className="bg-white text-cyan-600 hover:bg-gray-100"
            onClick={() => {
              const firstTrack = trainingTracks[0]
              const firstModule = allModules[firstTrack.modules[0] as keyof typeof allModules]
              window.location.href = firstModule.url
            }}
          >
            Start Learning Today
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-cyan-600"
            onClick={() => window.location.href = '/consultation'}
          >
            Schedule Consultation
          </Button>
        </div>
      </section>

      {/* Back Navigation */}
      <div className="mt-8 flex justify-center">
        <Button 
          variant="outline" 
          onClick={() => window.history.back()}
        >
          <ArrowRight className="w-4 h-4 mr-2 transform rotate-180" /> 
          Back to Resources
        </Button>
      </div>
    </Container>
  )
}