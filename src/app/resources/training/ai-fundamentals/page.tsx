'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  CheckCircle, ArrowRight, Brain, Award, Clock, 
  BookOpen, Target, Lightbulb, AlertCircle, Download,
  Play, FileText, ExternalLink, Users, Star, Trophy
} from 'lucide-react'

export default function AIFundamentalsPage() {
  const [completedSections, setCompletedSections] = useState<string[]>([])
  const [knowledgeCheckAnswers, setKnowledgeCheckAnswers] = useState<{[key: string]: string}>({})
  const [currentSection, setCurrentSection] = useState<string>('introduction')
  const [moduleCompleted, setModuleCompleted] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)

  const sections = [
    { id: 'introduction', title: 'What is AI?', readTime: '8 min' },
    { id: 'types', title: 'Types of AI', readTime: '6 min' },
    { id: 'how-it-works', title: 'How AI Works', readTime: '10 min' },
    { id: 'terminology', title: 'Key Terminology', readTime: '5 min' },
    { id: 'everyday-examples', title: 'AI in Everyday Life', readTime: '7 min' },
    { id: 'getting-started', title: 'Getting Started', readTime: '10 min' },
    { id: 'knowledge-check', title: 'Knowledge Check', readTime: '5 min' }
  ]

  const knowledgeQuestions = [
    {
      id: 'q1',
      question: 'Which of the following best describes artificial intelligence?',
      options: [
        'A conscious computer system that thinks like humans',
        'Technology that enables computers to perform tasks requiring human-like intelligence',
        'A replacement for all human workers',
        'Software that can only follow pre-programmed instructions'
      ],
      correct: 1,
      explanation: 'AI is technology that enables computers to perform tasks that typically require human intelligence, like learning, reasoning, and problem-solving.'
    },
    {
      id: 'q2', 
      question: 'What is the main difference between Narrow AI and General AI?',
      options: [
        'Narrow AI is smaller in size than General AI',
        'Narrow AI performs specific tasks, while General AI would match human intelligence across all domains',
        'Narrow AI is slower than General AI',
        'There is no difference between them'
      ],
      correct: 1,
      explanation: 'Narrow AI (which we have today) excels at specific tasks, while General AI (still theoretical) would match human intelligence across all cognitive domains.'
    },
    {
      id: 'q3',
      question: 'Which is an example of machine learning in everyday manufacturing?',
      options: [
        'A traditional assembly line robot following fixed programming',
        'A quality control system that improves defect detection over time',
        'A manual inspection checklist',
        'A basic calculator'
      ],
      correct: 1,
      explanation: 'Machine learning systems improve their performance over time by learning from data, like a quality control system that gets better at detecting defects.'
    }
  ]

  const markSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId])
    }
  }

  const checkModuleCompletion = () => {
    const allSectionsComplete = sections.every(section => 
      completedSections.includes(section.id)
    )
    const allQuestionsAnswered = knowledgeQuestions.every(q => 
      knowledgeCheckAnswers[q.id] !== undefined
    )
    
    if (allSectionsComplete && allQuestionsAnswered) {
      setModuleCompleted(true)
    }
  }

  useEffect(() => {
    checkModuleCompletion()
  }, [completedSections, knowledgeCheckAnswers])

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setKnowledgeCheckAnswers({
      ...knowledgeCheckAnswers,
      [questionId]: answerIndex.toString()
    })
  }

  const getScore = () => {
    let correct = 0
    knowledgeQuestions.forEach(q => {
      if (knowledgeCheckAnswers[q.id] === q.correct.toString()) {
        correct++
      }
    })
    return correct
  }

  const totalReadTime = sections.reduce((total, section) => {
    const minutes = parseInt(section.readTime.replace(' min', ''))
    return total + minutes
  }, 0)

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-blue-100 p-6 rounded-lg mb-6">
          <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-blue-800 mb-2">AI Fundamentals for Business</h1>
          <p className="text-blue-700 text-lg">Essential AI concepts, terminology, and applications for business teams</p>
        </div>
        
        {/* Progress tracking */}
        <div className="max-w-md mx-auto mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completedSections.length}/{sections.length} sections completed</span>
          </div>
          <div className="bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedSections.length / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Module info */}
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>~{totalReadTime} minutes</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>Beginner Level</span>
          </div>
          <div className="flex items-center">
            <Target className="h-4 w-4 mr-1" />
            <span>6 Learning Objectives</span>
          </div>
        </div>
      </div>

      {/* Learning objectives */}
      <Card className="mb-8 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 mb-3">By completing this module, you will be able to:</p>
          <ul className="list-disc list-inside text-green-700 space-y-1 text-sm">
            <li>Define artificial intelligence and explain what it can and cannot do</li>
            <li>Distinguish between different types of AI systems</li>
            <li>Understand how modern AI systems like neural networks function</li>
            <li>Use proper AI terminology when discussing technology with your team</li>
            <li>Identify AI applications already present in your daily work and life</li>
            <li>Take confident first steps with AI tools for business applications</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section navigation */}
      <div className="grid md:grid-cols-7 gap-2 mb-8">
        {sections.map((section, index) => {
          const isCompleted = completedSections.includes(section.id)
          const isCurrent = currentSection === section.id
          
          return (
            <Button
              key={section.id}
              variant={isCurrent ? "default" : isCompleted ? "outline" : "ghost"}
              size="sm"
              onClick={() => setCurrentSection(section.id)}
              className={`text-xs p-2 h-auto flex-col ${
                isCompleted ? 'bg-green-50 border-green-200 text-green-700' : ''
              }`}
            >
              <div className="flex items-center mb-1">
                {isCompleted && <CheckCircle className="h-3 w-3 mr-1" />}
                <span>{index + 1}</span>
              </div>
              <span className="leading-tight">{section.title}</span>
            </Button>
          )
        })}
      </div>

      {/* Section content */}
      <div className="space-y-8">
        {currentSection === 'introduction' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                What is AI?
                <span className="ml-auto text-sm text-gray-500">8 min read</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                Artificial Intelligence (AI) is technology that enables computers to perform tasks that typically require human intelligence. Think of AI as computer systems that can learn from information, make decisions, and adapt to new situations.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">Simple Definition:</h4>
                <p className="text-blue-700">AI is technology that allows computers to mimic human-like thinking and problem-solving.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-green-800 mb-3">✅ AI IS:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Software that can analyze information</li>
                    <li>• Systems that can learn from data</li>
                    <li>• Technology that can recognize patterns</li>
                    <li>• Tools that can make predictions</li>
                    <li>• Programs that can communicate in natural language</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-3">❌ AI IS NOT:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• A replacement for human intelligence</li>
                    <li>• Conscious or self-aware</li>
                    <li>• Capable of true understanding</li>
                    <li>• Magic or infallible</li>
                    <li>• Equal to human creativity (yet)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-yellow-800 mb-2">🤔 Quick Self-Assessment:</h4>
                <p className="text-yellow-700 mb-2">Have you already used AI? Check if you've done any of these:</p>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• Used a voice assistant like Siri or Alexa</li>
                  <li>• Noticed product recommendations when shopping online</li>
                  <li>• Used auto-correct or predictive text on your phone</li>
                  <li>• Received GPS navigation route suggestions</li>
                </ul>
                <p className="text-yellow-700 mt-2 font-medium">If you checked any of these, you've already interacted with AI!</p>
              </div>

              <Button 
                onClick={() => markSectionComplete('introduction')}
                className="w-full"
                disabled={completedSections.includes('introduction')}
              >
                {completedSections.includes('introduction') ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Section Complete
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Mark Section Complete
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {currentSection === 'types' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Types of AI
                <span className="ml-auto text-sm text-gray-500">6 min read</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                Understanding different types of AI helps you choose the right tools for your manufacturing needs. Here are the main categories you should know about.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">🎯 Narrow AI</h4>
                  <p className="text-blue-700 text-sm mb-3">Current Reality</p>
                  <p className="text-blue-700 text-sm mb-3">AI designed for specific tasks and excels in limited domains.</p>
                  <ul className="text-blue-700 space-y-1 text-xs">
                    <li>• Voice assistants (Siri, Alexa)</li>
                    <li>• Recommendation systems</li>
                    <li>• Image recognition</li>
                    <li>• ChatGPT and language models</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-3">🧠 General AI</h4>
                  <p className="text-purple-700 text-sm mb-3">Future Goal</p>
                  <p className="text-purple-700 text-sm mb-3">Hypothetical AI that matches human intelligence across all domains.</p>
                  <ul className="text-purple-700 space-y-1 text-xs">
                    <li>• Currently theoretical</li>
                    <li>• Would match human cognitive abilities</li>
                    <li>• Could learn any task humans can</li>
                    <li>• Timeline uncertain (decades away)</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">📈 Machine Learning</h4>
                  <p className="text-green-700 text-sm mb-3">AI Subset</p>
                  <p className="text-green-700 text-sm mb-3">AI systems that improve performance by learning from data.</p>
                  <ul className="text-green-700 space-y-1 text-xs">
                    <li>• Quality control that improves over time</li>
                    <li>• Predictive maintenance</li>
                    <li>• Fraud detection systems</li>
                    <li>• Personalization engines</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-yellow-800 mb-2">🏭 Manufacturing Reality Check:</h4>
                <p className="text-yellow-700 text-sm mb-2">99% of AI tools you'll use in manufacturing are Narrow AI systems designed for specific tasks like:</p>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• Document analysis and creation</li>
                  <li>• Quality control image recognition</li>
                  <li>• Predictive maintenance alerts</li>
                  <li>• Inventory optimization</li>
                </ul>
              </div>

              <Button 
                onClick={() => markSectionComplete('types')}
                className="w-full"
                disabled={completedSections.includes('types')}
              >
                {completedSections.includes('types') ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Section Complete
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Mark Section Complete
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {currentSection === 'how-it-works' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                How AI Works
                <span className="ml-auto text-sm text-gray-500">10 min read</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                Modern AI systems, particularly neural networks, work by processing information through layers of interconnected nodes that mimic simplified brain neurons. You don't need to be technical to understand the basics!
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-800 mb-3">🧠 Neural Network Basics</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <div>
                      <strong className="text-blue-800">Input Layer:</strong>
                      <p className="text-blue-700 text-sm">Receives data (text, images, numbers) - like your eyes seeing information</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <div>
                      <strong className="text-blue-800">Hidden Layers:</strong>
                      <p className="text-blue-700 text-sm">Process and transform data through mathematical operations - like your brain analyzing what you see</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <div>
                      <strong className="text-blue-800">Output Layer:</strong>
                      <p className="text-blue-700 text-sm">Produces the final result (classification, prediction, generated text) - like your brain making a decision</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <div>
                      <strong className="text-blue-800">Training:</strong>
                      <p className="text-blue-700 text-sm">System learns by adjusting connections based on millions of examples - like learning from experience</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-green-800 mb-2">🏭 Manufacturing Example:</h4>
                <p className="text-green-700 text-sm mb-2">Imagine training an AI to detect defective parts:</p>
                <ol className="text-green-700 space-y-1 text-sm list-decimal list-inside">
                  <li><strong>Input:</strong> Photos of thousands of parts (good and defective)</li>
                  <li><strong>Processing:</strong> AI learns patterns that distinguish defective vs. good parts</li>
                  <li><strong>Output:</strong> "Defective" or "Good" classification for new parts</li>
                  <li><strong>Improvement:</strong> Gets more accurate with more examples</li>
                </ol>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Insight:</h4>
                <p className="text-yellow-700 text-sm">AI doesn't "understand" like humans do. It finds statistical patterns in data. This is why it can be incredibly useful for consistent, repetitive tasks but needs human oversight for complex decisions.</p>
              </div>

              <Button 
                onClick={() => markSectionComplete('how-it-works')}
                className="w-full"
                disabled={completedSections.includes('how-it-works')}
              >
                {completedSections.includes('how-it-works') ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Section Complete
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Mark Section Complete
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {currentSection === 'terminology' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Key Terminology
                <span className="ml-auto text-sm text-gray-500">5 min read</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                Master these essential terms so you can confidently discuss AI with your team and vendors.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Algorithm</h4>
                  <p className="text-gray-600 text-sm">A set of rules or instructions that tell the computer how to solve a problem. Like a recipe for making decisions.</p>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Training Data</h4>
                  <p className="text-gray-600 text-sm">The examples used to teach an AI system how to perform its task. Quality data = better AI performance.</p>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Prompt</h4>
                  <p className="text-gray-600 text-sm">The input or question you give to an AI system to get a response. Good prompts get better results.</p>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Large Language Model (LLM)</h4>
                  <p className="text-gray-600 text-sm">AI trained on vast amounts of text to understand and generate human-like language. Examples: ChatGPT, Claude.</p>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">API</h4>
                  <p className="text-gray-600 text-sm">Application Programming Interface - how different software systems communicate with each other.</p>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Hallucination</h4>
                  <p className="text-gray-600 text-sm">When AI generates information that sounds plausible but is actually incorrect. Always verify important facts!</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">🗣️ Speaking AI with Confidence:</h4>
                <div className="text-blue-700 text-sm space-y-2">
                  <p><strong>Instead of:</strong> "Can this magic computer thing help us?"</p>
                  <p><strong>Say:</strong> "Can this AI algorithm analyze our quality data to identify patterns in defects?"</p>
                  <br/>
                  <p><strong>Instead of:</strong> "The computer is broken."</p>
                  <p><strong>Say:</strong> "The model seems to be hallucinating - let me adjust the prompt and verify the output."</p>
                </div>
              </div>

              <Button 
                onClick={() => markSectionComplete('terminology')}
                className="w-full"
                disabled={completedSections.includes('terminology')}
              >
                {completedSections.includes('terminology') ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Section Complete
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Mark Section Complete
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {currentSection === 'everyday-examples' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                AI in Everyday Life
                <span className="ml-auto text-sm text-gray-500">7 min read</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                You likely interact with AI multiple times daily without realizing it. Recognizing these examples helps you understand AI's practical applications.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">📧 Email & Communication</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• <strong>Spam filtering:</strong> AI automatically sorts unwanted emails</li>
                    <li>• <strong>Smart replies:</strong> Gmail suggests quick response options</li>
                    <li>• <strong>Priority inbox:</strong> AI determines which emails are most important</li>
                    <li>• <strong>Auto-complete:</strong> Predictive text as you type</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">🗺️ Navigation & Transportation</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• <strong>Real-time traffic routing:</strong> GPS apps find fastest routes</li>
                    <li>• <strong>ETA predictions:</strong> Accurate arrival time estimates</li>
                    <li>• <strong>Ride-sharing optimization:</strong> Uber/Lyft driver matching</li>
                    <li>• <strong>Parking assistance:</strong> Apps that find available spots</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">🛒 Shopping & Commerce</h4>
                  <ul className="text-purple-700 space-y-1 text-sm">
                    <li>• <strong>Product recommendations:</strong> "People who bought this also bought..."</li>
                    <li>• <strong>Price optimization:</strong> Dynamic pricing based on demand</li>
                    <li>• <strong>Fraud detection:</strong> Protecting your credit card transactions</li>
                    <li>• <strong>Inventory management:</strong> Predicting what stores should stock</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">🎞️ Entertainment & Media</h4>
                  <ul className="text-orange-700 space-y-1 text-sm">
                    <li>• <strong>Netflix recommendations:</strong> AI suggests shows you might like</li>
                    <li>• <strong>Spotify playlists:</strong> Discover Weekly uses your listening patterns</li>
                    <li>• <strong>Social media feeds:</strong> AI curates your Facebook/Instagram timeline</li>
                    <li>• <strong>Gaming:</strong> AI opponents and procedural content generation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-yellow-800 mb-2">🏭 Manufacturing Applications You're Already Using:</h4>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• <strong>Autocorrect in documentation:</strong> Spell check and grammar suggestions</li>
                  <li>• <strong>Calendar scheduling:</strong> Smart meeting time suggestions</li>
                  <li>• <strong>ERP systems:</strong> Demand forecasting and inventory optimization</li>
                  <li>• <strong>Quality software:</strong> Statistical process control and trend analysis</li>
                  <li>• <strong>Maintenance systems:</strong> Predictive maintenance alerts and scheduling</li>
                </ul>
              </div>

              <Button 
                onClick={() => markSectionComplete('everyday-examples')}
                className="w-full"
                disabled={completedSections.includes('everyday-examples')}
              >
                {completedSections.includes('everyday-examples') ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Section Complete
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Mark Section Complete
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {currentSection === 'getting-started' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Getting Started
                <span className="ml-auto text-sm text-gray-500">10 min read</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                Ready to take your first steps with AI? Here's your practical roadmap to getting started safely and effectively.
              </p>
              
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-green-800 mb-3">🚀 Your First Steps with AI</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <div>
                      <strong className="text-green-800">Start Simple:</strong>
                      <p className="text-green-700 text-sm">Try ChatGPT for basic questions and document help. Begin with non-critical tasks to build confidence.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <div>
                      <strong className="text-green-800">Practice Prompting:</strong>
                      <p className="text-green-700 text-sm">Learn to communicate clearly with AI systems. Be specific about what you want and how you want it formatted.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <div>
                      <strong className="text-green-800">Experiment Safely:</strong>
                      <p className="text-green-700 text-sm">Use AI for non-critical tasks while learning. Don't use AI for safety-critical decisions until you understand its limitations.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <div>
                      <strong className="text-green-800">Verify Information:</strong>
                      <p className="text-green-700 text-sm">Always fact-check important AI-generated content. AI can make mistakes or "hallucinate" false information.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">5</span>
                    <div>
                      <strong className="text-green-800">Build Gradually:</strong>
                      <p className="text-green-700 text-sm">Add one AI tool at a time to your workflow. Master each tool before adding the next one.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">🎯 Recommended First Projects:</h4>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>• <strong>Documentation cleanup:</strong> Transform messy meeting notes into professional procedures</li>
                  <li>• <strong>Email templates:</strong> Create consistent, professional email responses</li>
                  <li>• <strong>Training materials:</strong> Generate clear explanations of company processes</li>
                  <li>• <strong>Report summaries:</strong> Condense long reports into key takeaways</li>
                  <li>• <strong>Process improvement:</strong> Brainstorm solutions to recurring problems</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-orange-800 mb-2">⚠️ What to Avoid Initially:</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Don't use AI for safety-critical decisions without human verification</li>
                  <li>• Don't rely on AI for highly sensitive or confidential information</li>
                  <li>• Don't expect AI to understand your specific company context immediately</li>
                  <li>• Don't try to implement multiple AI tools simultaneously</li>
                  <li>• Don't skip the verification step for important outputs</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-purple-800 mb-2">🎓 Next Learning Steps:</h4>
                <p className="text-purple-700 text-sm mb-2">After completing this module, consider these next steps:</p>
                <ul className="text-purple-700 space-y-1 text-sm">
                  <li>• <strong>Prompt Engineering:</strong> Learn advanced techniques for better AI responses</li>
                  <li>• <strong>Quick Wins:</strong> Try the ChatGPT Documentation project for immediate results</li>
                  <li>• <strong>AI Tools:</strong> Explore the budget-friendly tools guide</li>
                  <li>• <strong>Team Training:</strong> Share what you've learned with colleagues</li>
                </ul>
              </div>

              <Button 
                onClick={() => markSectionComplete('getting-started')}
                className="w-full"
                disabled={completedSections.includes('getting-started')}
              >
                {completedSections.includes('getting-started') ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Section Complete
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Mark Section Complete
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {currentSection === 'knowledge-check' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Knowledge Check
                <span className="ml-auto text-sm text-gray-500">5 min</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                Test your understanding with these questions. You need to answer all questions to complete the module.
              </p>
              
              <div className="space-y-6">
                {knowledgeQuestions.map((question, qIndex) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">
                      Question {qIndex + 1}: {question.question}
                    </h4>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => {
                        const isSelected = knowledgeCheckAnswers[question.id] === oIndex.toString()
                        const isCorrect = oIndex === question.correct
                        const hasAnswered = knowledgeCheckAnswers[question.id] !== undefined
                        
                        return (
                          <button
                            key={oIndex}
                            onClick={() => handleAnswerSelect(question.id, oIndex)}
                            disabled={hasAnswered}
                            className={`w-full text-left p-3 rounded border transition-colors ${
                              hasAnswered
                                ? isCorrect
                                  ? 'bg-green-100 border-green-300 text-green-800'
                                  : isSelected
                                  ? 'bg-red-100 border-red-300 text-red-800'
                                  : 'bg-gray-50 border-gray-200 text-gray-600'
                                : isSelected
                                ? 'bg-blue-100 border-blue-300'
                                : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="mr-3 font-medium">
                                {String.fromCharCode(65 + oIndex)}.
                              </span>
                              <span>{option}</span>
                              {hasAnswered && isCorrect && (
                                <CheckCircle className="h-4 w-4 ml-auto text-green-600" />
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                    
                    {knowledgeCheckAnswers[question.id] !== undefined && (
                      <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                        <div className="flex items-start">
                          <Lightbulb className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                          <div>
                            <p className="text-blue-800 font-medium text-sm">Explanation:</p>
                            <p className="text-blue-700 text-sm">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {Object.keys(knowledgeCheckAnswers).length === knowledgeQuestions.length && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">
                    📊 Your Score: {getScore()}/{knowledgeQuestions.length}
                  </h4>
                  <p className="text-green-700 text-sm">
                    {getScore() === knowledgeQuestions.length 
                      ? "Perfect! You've mastered the fundamentals of AI." 
                      : getScore() >= 2 
                      ? "Good job! You have a solid understanding of AI basics."
                      : "Consider reviewing the material and trying again."}
                  </p>
                  <Button 
                    onClick={() => markSectionComplete('knowledge-check')}
                    className="mt-3"
                    disabled={completedSections.includes('knowledge-check')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Knowledge Check
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Module completion */}
      {moduleCompleted && (
        <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Trophy className="h-6 w-6 mr-2" />
              🎉 Module Complete! Congratulations!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              You've successfully completed AI Fundamentals for Business! You now have a solid foundation in AI concepts and terminology.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">✅ What You've Accomplished:</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Completed all 6 learning sections</li>
                  <li>• Passed the knowledge check</li>
                  <li>• Gained practical AI understanding</li>
                  <li>• Ready for next-level training</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">🚀 Recommended Next Steps:</h4>
                <ul className="text-blue-700 space-y-1 text-sm">
                  <li>• Start Prompt Engineering module</li>
                  <li>• Try the ChatGPT Quick Win project</li>
                  <li>• Explore AI Tools for productivity</li>
                  <li>• Share knowledge with your team</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => setShowCertificate(true)}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Award className="h-4 w-4 mr-2" />
                View Your Completion Certificate
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/resources/training/prompt-engineering'}
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Next Module
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/resources/quick-wins/chatgpt-docs'}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Try Quick Win
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/resources/ai-newcomer'}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View Learning Path
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full">
            <CardContent className="p-8 text-center">
              <div className="border-4 border-gold-400 p-6 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50">
                <Award className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Certificate of Completion</h2>
                <p className="text-lg text-gray-700 mb-1">AI Fundamentals for Business</p>
                <p className="text-gray-600 mb-4">Fae Intelligence Training Program</p>
                <div className="border-t border-gray-300 pt-4 mt-4">
                  <p className="text-sm text-gray-600">Completed on {new Date().toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500 mt-2">This certificate validates completion of core AI concepts and terminology training.</p>
                </div>
              </div>
              <div className="flex justify-center space-x-3 mt-6">
                <Button onClick={() => window.print()}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={() => setShowCertificate(false)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-12 flex justify-between items-center">
        <Button 
          variant="outline"
          onClick={() => window.location.href = '/resources'}
        >
          <ArrowRight className="w-4 h-4 mr-2 transform rotate-180" /> 
          Back to Resources
        </Button>
        
        {moduleCompleted && (
          <Button 
            onClick={() => window.location.href = '/resources/training/prompt-engineering'}
          >
            Next Module: Prompt Engineering
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </Container>
  )
}
