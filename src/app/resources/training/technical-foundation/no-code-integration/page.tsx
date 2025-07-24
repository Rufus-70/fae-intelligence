'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Zap, CheckCircle, ExternalLink, BookOpen, Play, 
  Target, ArrowRight, Lightbulb, Users, Award, 
  TrendingUp, Settings, FileText, Globe, 
  Database, Key, Lock, AlertCircle, ChevronRight,
  Workflow, BarChart, Clock, DollarSign
} from 'lucide-react'

export default function NoCodeIntegrationPage() {
  const [completedSections, setCompletedSections] = useState<string[]>([])
  const [confidenceRatings, setConfidenceRatings] = useState<{[key: string]: number}>({})

  const toggleSection = (sectionId: string) => {
    setCompletedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const setConfidence = (objective: string, rating: number) => {
    setConfidenceRatings(prev => ({
      ...prev,
      [objective]: rating
    }))
  }

  const learningObjectives = [
    {
      id: 'compare-tools',
      objective: 'Compare Zapier, Power Automate, and IFTTT capabilities for manufacturing use cases',
      level: 'Analyze',
      assessment: 'Tool comparison matrix',
      timeEstimate: '15 minutes'
    },
    {
      id: 'build-workflow',
      objective: 'Build a 3-step automation workflow connecting AI tools to business systems',
      level: 'Create',
      assessment: 'Working automation demo',
      timeEstimate: '25 minutes'
    },
    {
      id: 'troubleshoot-errors',
      objective: 'Troubleshoot common automation errors and implement error handling',
      level: 'Apply',
      assessment: 'Error resolution exercise',
      timeEstimate: '10 minutes'
    },
    {
      id: 'calculate-roi',
      objective: 'Calculate automation ROI and present business case to stakeholders',
      level: 'Evaluate',
      assessment: 'ROI calculation worksheet',
      timeEstimate: '10 minutes'
    }
  ]

  const automationTools = [
    {
      name: 'Zapier',
      cost: '$20/month',
      strength: 'Easiest to use, most app integrations',
      bestFor: 'Simple workflows, connecting popular apps',
      manufacturingUse: 'Connect quality reports to notification systems'
    },
    {
      name: 'Power Automate',
      cost: '$15/month',
      strength: 'Deep Microsoft integration, enterprise features',
      bestFor: 'Complex logic, Microsoft-heavy environments',
      manufacturingUse: 'Automate approval workflows for maintenance requests'
    },
    {
      name: 'IFTTT Pro',
      cost: '$3.99/month',
      strength: 'Simple triggers, IoT device integration',
      bestFor: 'Basic automation, smart device control',
      manufacturingUse: 'Alert systems based on sensor data'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
        <Container>
          <div className="text-center">
            <Workflow className="h-20 w-20 mx-auto mb-6 text-yellow-100" />
            <h1 className="text-5xl font-bold mb-6">No-Code/Low-Code Integration Tools</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Build powerful automation workflows without coding. Connect AI tools to your existing business systems.
            </p>
            <div className="bg-yellow-700 rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  <span>Level 2: Technical Foundation</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  <span>Prerequisites: API Fundamentals</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>Duration: 60 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Learning Objectives Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <Target className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Learning Objectives</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              By completing this module, you will be able to:
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {learningObjectives.map((objective, index) => (
              <Card key={objective.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{objective.objective}</h3>
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center">
                              <BookOpen className="h-4 w-4 mr-1" />
                              <span>Level: {objective.level}</span>
                            </div>
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-1" />
                              <span>Assessment: {objective.assessment}</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <span>Time: {objective.timeEstimate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Confidence Rating */}
                      <div className="mt-4 p-3 bg-gray-50 rounded">
                        <p className="text-sm font-medium text-gray-700 mb-2">Confidence Level (1-5):</p>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => setConfidence(objective.id, rating)}
                              className={`w-8 h-8 rounded-full border-2 text-sm font-medium transition-all duration-200 ${
                                confidenceRatings[objective.id] === rating
                                  ? 'bg-yellow-600 text-white border-yellow-600'
                                  : 'bg-white text-gray-600 border-gray-300 hover:border-yellow-400'
                              }`}
                            >
                              {rating}
                            </button>
                          ))}
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

      {/* Tool Comparison Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <BarChart className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Automation Tool Comparison</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Choose the right tool for your manufacturing automation needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {automationTools.map((tool, index) => (
              <Card key={tool.name} className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Zap className="h-8 w-8 text-yellow-600" />
                    <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      {tool.cost}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Strength:</h4>
                      <p className="text-gray-600 text-sm">{tool.strength}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Best For:</h4>
                      <p className="text-gray-600 text-sm">{tool.bestFor}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Manufacturing Example:</h4>
                      <p className="text-gray-600 text-sm">{tool.manufacturingUse}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Hands-On Project Section */}
      <section className="py-16 bg-yellow-600 text-white">
        <Container>
          <div className="text-center mb-12">
            <Settings className="h-16 w-16 text-yellow-100 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Hands-On Project</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Build an AI-powered quality reporting automation system
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white text-gray-900">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <BarChart className="h-6 w-6 text-yellow-600 mr-2" />
                  Project: Automated AI-Powered Quality Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">What You'll Build:</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      An automation workflow that:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Monitors a Google Sheets file for new quality data
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Sends data to ChatGPT API for analysis
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Generates automated summary reports
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Emails reports to management team
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Handles errors and provides notifications
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Business Value:
                    </h4>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• Saves 4 hours per week on manual reporting</li>
                      <li>• Provides consistent, AI-enhanced insights</li>
                      <li>• Reduces human error in data analysis</li>
                      <li>• Scales to handle increased data volume</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Time Investment:
                    </h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Setup: 2 hours initial configuration</li>
                      <li>• Maintenance: 15 minutes per month</li>
                      <li>• ROI: Break-even in first week</li>
                      <li>• Ongoing savings: 16+ hours per month</li>
                    </ul>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1 bg-yellow-600 hover:bg-yellow-700">
                    <Play className="h-4 w-4 mr-2" />
                    Start Project Tutorial
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Templates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Next Steps Section */}
      <section className="py-16 bg-gray-100">
        <Container>
          <div className="text-center mb-12">
            <ChevronRight className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">What's Next?</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Continue building your technical foundation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-6 w-6 text-gray-600 mr-2" />
                  Next Module
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Command Line Fundamentals</h3>
                <p className="text-gray-600 mb-4">
                  Learn essential command line skills for managing development environments and deployments.
                </p>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/training/technical-foundation/command-line'}
                >
                  Continue Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 text-green-600 mr-2" />
                  Alternative Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Skip to Programming Training</h3>
                <p className="text-gray-600 mb-4">
                  Ready for hands-on coding? Jump directly to our programming modules if you have technical experience.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/programming-training'}
                >
                  View Programming Training
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  )
}