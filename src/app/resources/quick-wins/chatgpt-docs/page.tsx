'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  CheckCircle, Copy, ExternalLink, ArrowRight, 
  FileText, Clock, Target, Award, Lightbulb, 
  Download, Play, Zap, AlertCircle
} from 'lucide-react'

export default function ChatgptDocsQuickWinPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  const steps = [
    {
      title: "Sign up for ChatGPT",
      description: "Create your free ChatGPT account",
      timeEstimate: "2 minutes",
      instructions: [
        "Go to chat.openai.com",
        "Click 'Sign up' and create an account with your email",
        "Verify your email address",
        "Log in to ChatGPT"
      ],
      template: "",
      result: "You now have access to ChatGPT's free tier with unlimited messages",
      tips: "The free version is perfect for documentation tasks. You don't need ChatGPT Plus for this Quick Win."
    },
    {
      title: "Paste your rough notes",
      description: "Copy messy notes from your last meeting or project",
      timeEstimate: "1 minute", 
      instructions: [
        "Find some rough notes, bullet points, or meeting minutes from your work",
        "Copy the text (even if it's messy, incomplete, or has typos)",
        "Paste it into ChatGPT",
        "Don't worry about formatting - the messier the better for this demo!"
      ],
      template: "",
      result: "Your raw notes are now ready to be transformed",
      tips: "If you don't have notes handy, you can use our sample notes below to practice."
    },
    {
      title: "Ask for SOP format",
      description: "Use our proven prompt to create professional documentation",
      timeEstimate: "30 seconds",
      instructions: [
        "Copy the prompt template below",
        "Paste it into ChatGPT after your notes",
        "Press Enter and watch the magic happen",
        "ChatGPT will transform your notes into a professional SOP"
      ],
      template: `Please convert these rough notes into a professional Standard Operating Procedure (SOP) with the following format:

**Title:** [Clear, descriptive title]
**Purpose:** [Why this procedure exists]
**Scope:** [When and where this applies]
**Procedure Steps:**
1. [Step-by-step instructions]
2. [Each step should be clear and actionable]
3. [Include any safety or quality requirements]

**Quality Checks:** [How to verify the work was done correctly]
**Documentation:** [What records to keep]

Please make the language clear, professional, and easy to follow. If any information seems unclear in my notes, please mark it with [NEEDS CLARIFICATION] so I know to fill in details.`,
      result: "A professional SOP document ready for your team",
      tips: "This template works for almost any process - manufacturing, quality control, maintenance, or administrative procedures."
    },
    {
      title: "Review and save",
      description: "Review the output and save your new SOP",
      timeEstimate: "3 minutes",
      instructions: [
        "Read through the generated SOP carefully",
        "Look for any [NEEDS CLARIFICATION] markers and add missing details",
        "Copy the final SOP to your documentation system",
        "Share with your team for feedback",
        "Start using it immediately!"
      ],
      template: "",
      result: "A professional SOP that your team can use right away",
      tips: "Most SOPs will need 1-2 rounds of minor edits, but ChatGPT gets you 90% of the way there instantly."
    }
  ]

  const sampleNotes = `Meeting notes 3/15 - Machine setup procedure
- turn on main power switch (red button on left side)
- wait for green light
- check oil levels in gauges 1,2,3
- if low add hydraulic oil from cabinet
- run calibration cycle (press blue button hold for 3 sec)
- machine will beep 3 times when ready
- load material on conveyor
- set speed to 150 for aluminum, 200 for steel
- press start
- monitor first 10 pieces for quality
- adjust as needed
- log production numbers in daily sheet
- shutdown: press stop, wait for full stop, turn off power

Safety stuff:
- always wear safety glasses
- dont put hands near moving parts
- emergency stop button is big red button on front
- if anything looks wrong stop immediately and call supervisor

Quality checks:
- check dimensions every 50 pieces
- look for burrs or rough edges
- if quality issues stop and check setup`

  const markStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
    }
    if (stepIndex === steps.length - 1) {
      setIsCompleted(true)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-green-100 p-4 rounded-lg mb-6">
          <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-green-800 mb-2">ChatGPT for Documentation</h1>
          <p className="text-green-700">Transform messy notes into professional SOPs in under 10 minutes</p>
        </div>
        
        {/* Progress bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completedSteps.length}/{steps.length} completed</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Time estimate */}
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Total time: ~7 minutes</span>
          </div>
          <div className="flex items-center">
            <Zap className="h-4 w-4 mr-1" />
            <span>Difficulty: Very Easy</span>
          </div>
        </div>
      </div>

      {/* Sample notes section */}
      <Card className="mb-8 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Practice with Sample Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700 mb-4">
            Don't have messy notes handy? Use these sample meeting notes to practice:
          </p>
          <div className="bg-white p-4 rounded border border-blue-200 mb-4 font-mono text-sm">
            <pre className="whitespace-pre-wrap">{sampleNotes}</pre>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => copyToClipboard(sampleNotes)}
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy Sample Notes
          </Button>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index)
          const isCurrent = currentStep === index
          const canStart = index === 0 || completedSteps.includes(index - 1)
          
          return (
            <Card 
              key={index}
              className={`transition-all duration-300 ${
                isCompleted ? 'bg-green-50 border-green-200' : 
                isCurrent ? 'border-blue-300 shadow-md' : 
                canStart ? 'hover:shadow-md' : 'opacity-60'
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-600 text-white' : 
                      isCurrent ? 'bg-blue-600 text-white' : 
                      canStart ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isCompleted ? <CheckCircle className="h-5 w-5" /> : index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {step.timeEstimate}
                    </div>
                    {canStart && !isCompleted && (
                      <Button 
                        size="sm"
                        onClick={() => setCurrentStep(index)}
                        variant={isCurrent ? "default" : "outline"}
                      >
                        {isCurrent ? "Working on this" : "Start Step"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {(isCurrent || isCompleted) && (
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Instructions:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        {step.instructions.map((instruction, i) => (
                          <li key={i}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                    
                    {step.template && (
                      <div>
                        <h4 className="font-semibold mb-2">Copy this prompt:</h4>
                        <div className="bg-gray-100 p-3 rounded border text-sm font-mono">
                          <pre className="whitespace-pre-wrap">{step.template}</pre>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => copyToClipboard(step.template)}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy Prompt
                        </Button>
                      </div>
                    )}
                    
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-1">Expected Result:</h4>
                      <p className="text-green-700 text-sm">{step.result}</p>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <div className="flex items-start">
                        <Lightbulb className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-800 mb-1">Pro Tip:</h4>
                          <p className="text-blue-700 text-sm">{step.tips}</p>
                        </div>
                      </div>
                    </div>
                    
                    {!isCompleted && (
                      <Button 
                        onClick={() => markStepComplete(index)}
                        className="w-full"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Step Complete
                      </Button>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {/* Completion section */}
      {isCompleted && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Award className="h-6 w-6 mr-2" />
              Congratulations! Quick Win Complete 🎉
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              You've successfully created your first AI-generated SOP! You can now:
            </p>
            <ul className="list-disc list-inside text-green-700 space-y-1 mb-6">
              <li>Use this same process for any documentation task</li>
              <li>Share this technique with your team</li>
              <li>Apply it to meeting notes, procedures, training materials, and more</li>
              <li>Save hours of documentation time every week</li>
            </ul>
            
            <div className="space-y-3">
              <Button 
                onClick={() => window.location.href = '/resources/quick-wins/voice-reports'}
                className="w-full"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Try Next Quick Win: Voice-to-Text Reports
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/resources/training/prompt-engineering'}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Learn Advanced Prompting
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/consultation'}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Get Personal Guidance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
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
        
        <Button 
          variant="outline"
          onClick={() => window.location.href = '/resources/ai-newcomer'}
        >
          Continue Learning Path
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Container>
  )
}
