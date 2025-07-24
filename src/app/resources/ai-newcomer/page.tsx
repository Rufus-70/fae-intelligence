'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Brain, Clock, CheckCircle, ExternalLink, BookOpen, 
  Play, Target, ArrowRight, Lightbulb, Users, 
  Star, Award, TrendingUp, Zap, FileText
} from 'lucide-react'

export default function AINewcomerPage() {
  const [completedModules, setCompletedModules] = useState<string[]>([])

  const toggleModule = (moduleId: string) => {
    setCompletedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const beginnerModules = [
    { 
      id: 'ai-fundamentals',
      title: 'AI Fundamentals for Business', 
      prerequisite: null,
      url: '/resources/training/ai-fundamentals',
      description: 'Essential AI concepts, terminology, and applications for business teams.',
      keyTopics: ['What is AI?', 'Manufacturing Applications', 'Common Terminology', 'Getting Started Safely']
    },
    { 
      id: 'prompt-engineering',
      title: 'Prompt Engineering for Leaders', 
      prerequisite: 'AI Fundamentals for Business',
      url: '/resources/training/prompt-engineering',
      description: 'Master the art of crafting effective prompts for business AI applications.',
      keyTopics: ['Writing Clear Prompts', 'Getting Better Results', 'Common Mistakes', 'Practice Examples']
    },
    { 
      id: 'daily-productivity',
      title: 'AI Tools for Daily Productivity', 
      prerequisite: 'Prompt Engineering for Leaders',
      url: '/resources/training/ai-daily-productivity',
      description: 'Practical applications of AI for everyday business tasks and productivity.',
      keyTopics: ['Daily Workflow Integration', 'Document Creation', 'Communication Tools', 'Time-Saving Tips']
    }
  ]

  const quickWins = [
    {
      title: 'ChatGPT for Documentation',
      description: 'Turn messy notes into professional SOPs',
      steps: ['Sign up for ChatGPT', 'Paste your rough notes', 'Ask for SOP format', 'Review and save'],
      difficulty: 'Very Easy'
    },
    {
      title: 'Voice-to-Text Reports',
      description: 'Dictate inspection findings directly to formatted reports',
      steps: ['Use phone voice recorder', 'Transcribe with free tools', 'Format with AI', 'Save as template'],
      difficulty: 'Easy'
    },
    {
      title: 'Email Templates with AI',
      description: 'Create professional email templates for common situations',
      steps: ['List common emails', 'Generate templates', 'Personalize tone', 'Save for reuse'],
      difficulty: 'Easy'
    }
  ]

  const learningPath = [
    {
      phase: 'Foundation Phase',
      focus: 'Understanding AI Basics',
      goals: ['Complete AI Fundamentals', 'Try ChatGPT for first time', 'Create first AI-assisted document']
    },
    {
      phase: 'Communication Phase', 
      focus: 'Learning to Communicate with AI',
      goals: ['Master prompt engineering', 'Practice with 5 different prompts', 'Improve documentation workflow']
    },
    {
      phase: 'Integration Phase',
      focus: 'Integrating AI into Daily Work',
      goals: ['Complete productivity module', 'Implement 2 quick wins', 'Share success with team']
    },
    {
      phase: 'Expansion Phase',
      focus: 'Expanding Your Skills',
      goals: ['Explore additional tools', 'Create custom workflows', 'Plan next learning steps']
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <Container>
          <div className="text-center">
            <Brain className="h-20 w-20 mx-auto mb-6 text-blue-100" />
            <h1 className="text-5xl font-bold mb-6">AI Newcomer Training Path</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              New to AI but curious about manufacturing applications? Start here with our beginner-friendly approach.
            </p>
          </div>
        </Container>
      </section>

      {/* Quick Wins Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
        <Container>
          <div className="text-center mb-12">
            <Zap className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Start Here: Quick Wins</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Get immediate value before diving into formal training. These simple wins will build your confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {quickWins.map((win, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Target className="h-8 w-8 text-green-600" />
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {win.difficulty}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{win.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{win.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Steps:</h4>
                    <ol className="text-sm text-gray-600 space-y-1">
                      {win.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start">
                          <span className="bg-green-100 text-green-800 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">
                            {stepIndex + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <Play className="h-4 w-4 mr-1" />
                    Try This Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Your Learning Journey</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A structured progression designed specifically for manufacturing professionals new to AI
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {learningPath.map((phase, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{phase.phase}: {phase.focus}</h3>
                      </div>
                      <ul className="space-y-2">
                        {phase.goals.map((goal, goalIndex) => (
                          <li key={goalIndex} className="flex items-center text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Training Modules Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <Container>
          <div className="text-center mb-12">
            <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Complete Training Modules</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Follow these modules in order for the best learning experience
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {beginnerModules.map((module, index) => {
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
                          canStart ? 'bg-blue-600' : 'bg-gray-400'
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
                              <span key={topicIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
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

      {/* Support Section */}
      <section className="py-16 bg-gray-100">
        <Container>
          <div className="text-center mb-12">
            <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">You're Not Alone</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              New to AI? That's perfectly normal. Here's how to get the support you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-6 w-6 text-yellow-600 mr-2" />
                  Common Beginner Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Is AI safe to use in my business?</h4>
                    <p className="text-sm text-gray-600">Yes, when used properly. Our training covers safety and best practices.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Do I need technical skills?</h4>
                    <p className="text-sm text-gray-600">No programming required. We focus on user-friendly tools and simple prompts.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">How much does it cost to get started?</h4>
                    <p className="text-sm text-gray-600">Many powerful AI tools have free tiers. You can start with $0 investment.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-6 w-6 text-yellow-600 mr-2" />
                  Success Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-2 mt-1" />
                    <div>
                      <h4 className="font-semibold">Start Small</h4>
                      <p className="text-sm text-gray-600">Pick one simple task and master it before moving on.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-2 mt-1" />
                    <div>
                      <h4 className="font-semibold">Practice Daily</h4>
                      <p className="text-sm text-gray-600">Even 10 minutes a day builds confidence quickly.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-2 mt-1" />
                    <div>
                      <h4 className="font-semibold">Share Your Wins</h4>
                      <p className="text-sm text-gray-600">Show colleagues what you've accomplished to build team buy-in.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Next Steps CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Begin Your AI Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start with the quick wins above, then follow the structured learning path. 
              You'll quickly develop practical AI skills that make a real difference.
            </p>
            <div className="space-x-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => window.location.href = '/resources/training/ai-fundamentals'}
              >
                Start First Module
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/consultation" variant="secondary" size="lg" className="bg-blue-700 hover:bg-blue-800">
                Get Personal Guidance
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}