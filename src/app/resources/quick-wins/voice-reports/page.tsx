'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  CheckCircle, Copy, ExternalLink, ArrowRight, 
  Mic, Clock, Target, Award, Lightbulb, 
  Download, Play, Zap, AlertCircle, Smartphone,
  FileText, Upload
} from 'lucide-react'

export default function VoiceReportsQuickWinPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  const steps = [
    {
      title: "Use phone voice recorder",
      description: "Record your inspection findings using your smartphone",
      timeEstimate: "2 minutes",
      instructions: [
        "Open the Voice Memos app on your phone (iPhone) or Voice Recorder (Android)",
        "Hold your phone 6-12 inches from your mouth",
        "Speak clearly and at normal pace",
        "Record your quality inspection findings, maintenance notes, or meeting summary",
        "Don't worry about perfect grammar - just speak naturally"
      ],
      template: "Sample recording script: 'Quality inspection for batch 247, performed by [your name] on [date]. Checked 25 units from production line 2. Found minor surface scratches on units 5, 12, and 18. All within acceptable tolerance. Recommended polishing adjustment for next batch. Overall quality rating: acceptable. End inspection.'",
      result: "A voice recording of your findings on your phone",
      tips: "Speak in short sentences and pause between different topics. This makes transcription more accurate."
    },
    {
      title: "Transcribe with free tools",
      description: "Convert your voice recording to text using free transcription",
      timeEstimate: "3 minutes", 
      instructions: [
        "Option 1: Use Google Docs voice typing (go to docs.google.com, click Tools > Voice typing)",
        "Option 2: Use Otter.ai free tier (otter.ai - 600 minutes/month free)",
        "Option 3: Use WhatsApp voice message transcription",
        "Upload or play your recording and let the tool transcribe it",
        "Copy the transcribed text"
      ],
      template: "",
      result: "Your spoken words converted to text",
      tips: "Google Docs voice typing works great for real-time dictation. Otter.ai is better for uploaded recordings."
    },
    {
      title: "Format with AI",
      description: "Use ChatGPT to create a professional inspection report",
      timeEstimate: "2 minutes",
      instructions: [
        "Open ChatGPT (chat.openai.com)",
        "Paste your transcribed text",
        "Copy and paste the formatting prompt below",
        "Review the generated report",
        "Make any necessary corrections"
      ],
      template: `Please convert this voice transcription into a professional quality inspection report with the following format:

**QUALITY INSPECTION REPORT**

**Date:** [Extract date]
**Inspector:** [Extract name] 
**Batch/Lot Number:** [Extract if mentioned]
**Location/Line:** [Extract if mentioned]

**INSPECTION SUMMARY:**
[Brief overview of what was inspected]

**FINDINGS:**
• [List each finding as a clear bullet point]
• [Include specific details like quantities, measurements, locations]
• [Separate defects from observations]

**QUALITY ASSESSMENT:**
Pass/Fail: [Based on findings]
Overall Rating: [Extract or infer rating]

**RECOMMENDATIONS:**
• [List any suggested actions]
• [Include preventive measures if mentioned]

**NEXT STEPS:**
[Any follow-up actions needed]

Please clean up any unclear speech-to-text errors and organize the information logically. If any critical information seems missing, mark it with [NEEDS CLARIFICATION].`,
      result: "A professional quality inspection report ready for filing",
      tips: "This same format works for maintenance reports, safety inspections, and production summaries."
    },
    {
      title: "Save as template",
      description: "Create a reusable template for future reports",
      timeEstimate: "2 minutes",
      instructions: [
        "Save the formatted report in your quality management system",
        "Create a template document with the report structure",
        "Save the ChatGPT prompt for future use",
        "Share the process with your team",
        "Start using this for all verbal inspections"
      ],
      template: "",
      result: "A reusable system for creating professional reports from voice notes",
      tips: "Most quality systems see 70% time savings when switching from handwritten to voice-to-AI reports."
    }
  ]

  const sampleScript = `Quality inspection for batch 247 performed by John Smith on March 15th. Inspected 25 units from production line 2. Visual inspection completed. Found minor surface scratches on units 5, 12, and 18. All scratches are within acceptable tolerance per spec QS-402. No dimensional issues detected. All fasteners properly tightened. Recommended adjusting polishing wheel pressure for next batch to reduce scratching. Overall quality rating is acceptable. Batch approved for shipping. End of inspection.`

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
        <div className="bg-blue-100 p-4 rounded-lg mb-6">
          <Mic className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Voice-to-Text Quality Reports</h1>
          <p className="text-blue-700">Dictate inspection findings directly to professional reports</p>
        </div>
        
        {/* Progress bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completedSteps.length}/{steps.length} completed</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Time estimate */}
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Total time: ~9 minutes</span>
          </div>
          <div className="flex items-center">
            <Zap className="h-4 w-4 mr-1" />
            <span>Difficulty: Easy</span>
          </div>
        </div>
      </div>

      {/* Benefits section */}
      <Card className="mb-8 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Why This Matters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-green-800 mb-1">Save Time</h4>
              <p className="text-green-700">Turn 20-minute written reports into 5-minute voice recordings</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-1">Better Accuracy</h4>
              <p className="text-green-700">Capture details while they're fresh, reduce transcription errors</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-1">Professional Format</h4>
              <p className="text-green-700">AI ensures consistent, professional report formatting</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample script section */}
      <Card className="mb-8 border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-800 flex items-center">
            <Smartphone className="h-5 w-5 mr-2" />
            Practice Script
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-700 mb-4">
            Need to practice? Use this sample inspection script to test the process:
          </p>
          <div className="bg-white p-4 rounded border border-purple-200 mb-4 text-sm">
            <p className="font-mono">{sampleScript}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => copyToClipboard(sampleScript)}
            className="border-purple-300 text-purple-700 hover:bg-purple-100"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy Sample Script
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
                        <h4 className="font-semibold mb-2">
                          {index === 0 ? "Sample script to practice with:" : "Copy this prompt:"}
                        </h4>
                        <div className="bg-gray-100 p-3 rounded border text-sm">
                          {index === 0 ? (
                            <p>{step.template}</p>
                          ) : (
                            <pre className="whitespace-pre-wrap font-mono">{step.template}</pre>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => copyToClipboard(step.template)}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          {index === 0 ? "Copy Script" : "Copy Prompt"}
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
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center">
              <Award className="h-6 w-6 mr-2" />
              Excellent Work! Quick Win Complete 🎉
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 mb-4">
              You've mastered voice-to-AI reporting! This technique will save you hours every week and improve report quality.
            </p>
            
            <div className="bg-white p-4 rounded border border-blue-200 mb-4">
              <h4 className="font-semibold text-blue-800 mb-2">What you can now do:</h4>
              <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
                <li>Create quality inspection reports in 5 minutes instead of 20</li>
                <li>Capture maintenance findings immediately on the factory floor</li>
                <li>Dictate safety incident reports with better detail accuracy</li>
                <li>Generate consistent, professional documentation every time</li>
                <li>Train your team to use this same process</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => window.location.href = '/resources/quick-wins/inventory-tracking'}
                className="w-full"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Try Next Quick Win: Smart Inventory Tracking
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/resources/training/ai-tools-budget'}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Explore More AI Tools
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/consultation'}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Get Custom Solutions
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
          onClick={() => window.location.href = '/resources/quick-wins/chatgpt-docs'}
        >
          <ArrowRight className="w-4 h-4 mr-2 transform rotate-180" /> 
          Previous Quick Win
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => window.location.href = '/resources'}
        >
          Back to Resources
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Container>
  )
}
