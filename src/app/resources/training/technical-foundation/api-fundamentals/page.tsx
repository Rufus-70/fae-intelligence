'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Code, CheckCircle, ExternalLink, BookOpen, Play, 
  Target, ArrowRight, Lightbulb, Users, Award, 
  TrendingUp, Zap, Settings, FileText, Globe, 
  Database, Key, Lock, AlertCircle, ChevronRight
} from 'lucide-react'

export default function APIFundamentalsPage() {
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
      id: 'define-api',
      objective: 'Define API, REST, and JSON in practical business terms',
      level: 'Remember',
      assessment: 'Multiple choice quiz',
      timeEstimate: '10 minutes'
    },
    {
      id: 'first-api-call',
      objective: 'Make your first API call using browser developer tools',
      level: 'Apply',
      assessment: 'Hands-on demonstration',
      timeEstimate: '15 minutes'
    },
    {
      id: 'request-response',
      objective: 'Understand request/response cycles in AI integrations',
      level: 'Understand',
      assessment: 'Diagram completion',
      timeEstimate: '10 minutes'
    },
    {
      id: 'evaluate-documentation',
      objective: 'Evaluate API documentation for business implementation potential',
      level: 'Evaluate',
      assessment: 'Documentation analysis project',
      timeEstimate: '10 minutes'
    }
  ]

  const moduleContent = [
    {
      id: 'what-is-api',
      title: 'What is an API? (In Plain English)',
      content: [
        'An API (Application Programming Interface) is like a waiter in a restaurant:',
        '• You (the customer) make a request to the waiter',
        '• The waiter takes your order to the kitchen (the system)',
        '• The kitchen prepares your food (processes the data)',
        '• The waiter brings back your meal (returns the response)',
        '',
        'In AI terms: You ask ChatGPT a question → ChatGPT processes it → You get an answer back'
      ],
      practicalExample: 'When you use ChatGPT\'s web interface, you\'re actually using their API through a user-friendly wrapper.',
      keyTakeaway: 'APIs let different software systems talk to each other automatically.'
    },
    {
      id: 'rest-explained',
      title: 'REST APIs: The Language of the Web',
      content: [
        'REST (Representational State Transfer) is like using standard mail:',
        '• GET = "Please send me information" (like requesting a catalog)',
        '• POST = "Here\'s new information to save" (like sending a filled-out form)',
        '• PUT = "Update this existing information" (like changing your address)',
        '• DELETE = "Remove this information" (like canceling a subscription)',
        '',
        'Most AI services use REST APIs because they\'re simple and reliable.'
      ],
      practicalExample: 'ChatGPT API uses POST requests to send your questions and GET responses back.',
      keyTakeaway: 'REST APIs use simple, predictable patterns that make integration easier.'
    },
    {
      id: 'json-format',
      title: 'JSON: How Data Travels',
      content: [
        'JSON (JavaScript Object Notation) is like a well-organized filing system:',
        '• Everything has a clear label and value',
        '• Related information is grouped together',
        '• It\'s easy for both humans and computers to read',
        '',
        'Example JSON for an AI request:',
        '{',
        '  "prompt": "Summarize this quality report",',
        '  "max_tokens": 150,',
        '  "temperature": 0.3',
        '}'
      ],
      practicalExample: 'When you send a question to an AI, it gets packaged in JSON format for transmission.',
      keyTakeaway: 'JSON is the standard format for sending data to and from AI services.'
    },
    {
      id: 'making-first-call',
      title: 'Your First API Call (No Coding Required)',
      content: [
        'We\'ll use browser developer tools to make a real API call:',
        '1. Open any web browser',
        '2. Press F12 to open Developer Tools',
        '3. Go to the "Network" tab',
        '4. Visit a website that uses APIs (like ChatGPT)',
        '5. Watch the API calls happen in real-time',
        '',
        'You\'ll see actual requests and responses flying back and forth!'
      ],
      practicalExample: 'When you type in ChatGPT and hit enter, watch the Network tab to see your message being sent as an API call.',
      keyTakeaway: 'APIs are constantly working behind the scenes in every web application you use.'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <Container>
          <div className="text-center">
            <Globe className="h-20 w-20 mx-auto mb-6 text-blue-100" />
            <h1 className="text-5xl font-bold mb-6">Introduction to APIs & Web Services</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Bridge the gap between business AI tools and technical implementation. 
              Learn how AI systems communicate behind the scenes.
            </p>
            <div className="bg-blue-700 rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  <span>Level 2: Technical Foundation</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  <span>Prerequisites: Claude ChatGPT Projects</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>Duration: 45 minutes</span>
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
            <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
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
                        <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
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
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
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

      {/* Module Content */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <Code className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Module Content</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Interactive lessons designed to build your understanding step by step
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {moduleContent.map((section, index) => {
              const isCompleted = completedSections.includes(section.id)
              
              return (
                <Card 
                  key={section.id}
                  className={`transition-all duration-300 ${
                    isCompleted ? 'bg-green-50 border-green-200' : 'hover:shadow-lg'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          isCompleted ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                        }`}>
                          {isCompleted ? <CheckCircle className="h-6 w-6" /> : index + 1}
                        </div>
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSection(section.id)}
                      >
                        {isCompleted ? 'Review' : 'Start Section'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-gray-700">
                        {section.content.map((line, lineIndex) => (
                          <p key={lineIndex} className={line.startsWith('•') ? 'ml-4' : line.startsWith('{') ? 'bg-gray-100 p-3 rounded font-mono text-sm' : ''}>
                            {line}
                          </p>
                        ))}
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Practical Example:
                        </h4>
                        <p className="text-blue-800">{section.practicalExample}</p>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                          <Key className="h-4 w-4 mr-2" />
                          Key Takeaway:
                        </h4>
                        <p className="text-yellow-800">{section.keyTakeaway}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Hands-On Project Section */}
      <section className="py-16 bg-blue-600 text-white">
        <Container>
          <div className="text-center mb-12">
            <Settings className="h-16 w-16 text-blue-100 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Hands-On Project</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Apply what you've learned by connecting ChatGPT API to Google Sheets
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white text-gray-900">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Database className="h-6 w-6 text-blue-600 mr-2" />
                  Project: ChatGPT-Powered Google Sheets Automation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Project Goals:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Set up a Google Sheets document with sample data
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Use Google Apps Script to make API calls to ChatGPT
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Automatically generate summaries of manufacturing data
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Understand the complete request/response cycle
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">What You'll Build:</h3>
                  <p className="text-gray-700 mb-4">
                    A Google Sheets document that automatically analyzes production data and generates 
                    insights using ChatGPT's API. No coding experience required - we'll provide 
                    step-by-step instructions and pre-written scripts.
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Business Value:
                  </h4>
                  <p className="text-yellow-800">
                    This project demonstrates how APIs can automate routine analysis tasks, 
                    saving hours of manual work while providing consistent, AI-powered insights.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Play className="h-4 w-4 mr-2" />
                    Start Project
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Knowledge Check Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Knowledge Check</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Quick assessment to validate your understanding
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Quick Quiz (3 questions)</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="font-medium mb-3">1. What is an API in simple terms?</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="q1" value="a" />
                        <span>A) A programming language</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="q1" value="b" />
                        <span>B) A way for software systems to communicate</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="q1" value="c" />
                        <span>C) A type of database</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-3">2. What does a GET request do?</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="q2" value="a" />
                        <span>A) Sends new data to save</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="q2" value="b" />
                        <span>B) Requests information from a system</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="q2" value="c" />
                        <span>C) Deletes existing data</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-3">3. What format is commonly used for API data?</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="q3" value="a" />
                        <span>A) PDF</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="q3" value="b" />
                        <span>B) JSON</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="q3" value="c" />
                        <span>C) Excel</span>
                      </label>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  Submit Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Next Steps Section */}
      <section className="py-16 bg-gray-100">
        <Container>
          <div className="text-center mb-12">
            <ChevronRight className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">What's Next?</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Ready to continue your technical foundation journey?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-6 w-6 text-yellow-600 mr-2" />
                  Next Module
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">No-Code/Low-Code Integration Tools</h3>
                <p className="text-gray-600 mb-4">
                  Learn to build powerful automation workflows using tools like Zapier and Power Automate.
                </p>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/resources/training/technical-foundation/no-code-integration'}
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
                  Get Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Schedule a consultation to get personalized guidance on your technical AI implementation.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/consultation'}
                >
                  Schedule Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  )
}