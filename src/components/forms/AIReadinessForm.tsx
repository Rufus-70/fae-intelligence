'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Download, Mail, Phone, MapPin } from 'lucide-react'

interface AssessmentData {
  companyName: string
  industry: string
  contactName: string
  email: string
  phone: string
  dataInfrastructure: number
  technologyStack: number
  organizationalCulture: number
  skillsExpertise: number
  processMaturity: number
  businessCase: number
  notes: string
}

export function AIReadinessForm() {
  const [formData, setFormData] = useState<AssessmentData>({
    companyName: '',
    industry: '',
    contactName: '',
    email: '',
    phone: '',
    dataInfrastructure: 3,
    technologyStack: 3,
    organizationalCulture: 3,
    skillsExpertise: 3,
    processMaturity: 3,
    businessCase: 3,
    notes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof AssessmentData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateScore = () => {
    const scores = [
      formData.dataInfrastructure,
      formData.technologyStack,
      formData.organizationalCulture,
      formData.skillsExpertise,
      formData.processMaturity,
      formData.businessCase
    ]
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
  }

  const getScoreDescription = (score: number) => {
    if (score >= 4.5) return 'Ready - Excellent foundation for AI implementation'
    if (score >= 3.5) return 'Advanced - Strong foundation with minor improvements needed'
    if (score >= 2.5) return 'Developing - Good progress, moderate improvements needed'
    if (score >= 1.5) return 'Basic Foundation - Some elements exist, major gaps remain'
    return 'Not Ready - Significant work required before AI implementation'
  }

  const downloadAssessment = () => {
    const score = calculateScore()
    const description = getScoreDescription(parseFloat(score))
    
    const content = `
AI READINESS ASSESSMENT REPORT
Generated: ${new Date().toLocaleDateString()}

COMPANY INFORMATION
Company: ${formData.companyName}
Industry: ${formData.industry}
Contact: ${formData.contactName}
Email: ${formData.email}
Phone: ${formData.phone}

ASSESSMENT RESULTS
Overall Score: ${score}/5.0
Status: ${description}

DETAILED SCORES
1. Data Infrastructure: ${formData.dataInfrastructure}/5
   - Data quality, accessibility, governance, and volume

2. Technology Stack: ${formData.technologyStack}/5
   - Current systems, cloud infrastructure, API capabilities, security

3. Organizational Culture: ${formData.organizationalCulture}/5
   - Change readiness, leadership support, innovation mindset, collaboration

4. Skills & Expertise: ${formData.skillsExpertise}/5
   - Technical skills, business acumen, change management, external support

5. Process Maturity: ${formData.processMaturity}/5
   - Process documentation, performance metrics, continuous improvement, automation

6. Business Case: ${formData.businessCase}/5
   - Clear objectives, ROI projections, success metrics, risk assessment

NOTES
${formData.notes}

RECOMMENDATIONS
Based on your assessment score of ${score}/5.0:

${getRecommendations(parseFloat(score))}

NEXT STEPS
1. Review detailed findings with your team
2. Prioritize improvement areas based on business impact
3. Develop action plan with timelines and resources
4. Consider external expertise for complex areas
5. Schedule follow-up consultation for detailed planning

CONTACT INFORMATION
Fae Intelligence
Richard Snyder
Email: richard@faeintelligence.com
Phone: [Your Phone Number]
Website: www.faeintelligence.com

This assessment is the first step in your AI journey. Our team can help you develop a detailed implementation roadmap and provide ongoing support throughout your transformation.
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-readiness-assessment-${formData.companyName.toLowerCase().replace(/\s+/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getRecommendations = (score: number) => {
    if (score >= 4.5) {
      return `• You're well-positioned for AI implementation
• Focus on pilot project selection and execution
• Consider advanced AI applications and scaling strategies
• Develop detailed implementation timeline`
    } else if (score >= 3.5) {
      return `• Address identified gaps before major AI initiatives
• Focus on high-impact, low-effort improvements
• Strengthen foundation in weaker areas
• Plan for 3-6 month preparation phase`
    } else if (score >= 2.5) {
      return `• Significant foundation work required
• Prioritize data quality and process standardization
• Invest in team training and change management
• Consider external expertise for complex areas
• Plan for 6-12 month preparation phase`
    } else {
      return `• Foundation work is critical priority
• Focus on basic process documentation and standardization
• Address cultural and change management issues
• Consider phased approach with external support
• Plan for 12+ month preparation phase`
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Download the assessment
    downloadAssessment()
    
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Readiness Assessment
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Evaluate your organization's readiness for AI implementation with our comprehensive assessment framework. 
          Identify gaps, opportunities, and create a roadmap for success.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  required
                  placeholder="Enter your company name"
                />
              </div>
              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  required
                  placeholder="e.g., Manufacturing, Healthcare, Retail"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  required
                  placeholder="Your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  placeholder="your.email@company.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">AI Readiness Assessment</CardTitle>
            <p className="text-gray-600">
              Rate each area on a scale of 1-5, where 1 = Not Ready and 5 = Fully Ready
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              {
                key: 'dataInfrastructure',
                title: 'Data Infrastructure',
                description: 'Data quality, accessibility, governance, and volume'
              },
              {
                key: 'technologyStack',
                title: 'Technology Stack',
                description: 'Current systems, cloud infrastructure, API capabilities, security'
              },
              {
                key: 'organizationalCulture',
                title: 'Organizational Culture',
                description: 'Change readiness, leadership support, innovation mindset, collaboration'
              },
              {
                key: 'skillsExpertise',
                title: 'Skills & Expertise',
                description: 'Technical skills, business acumen, change management, external support'
              },
              {
                key: 'processMaturity',
                title: 'Process Maturity',
                description: 'Process documentation, performance metrics, continuous improvement, automation'
              },
              {
                key: 'businessCase',
                title: 'Business Case',
                description: 'Clear objectives, ROI projections, success metrics, risk assessment'
              }
            ].map((item) => (
              <div key={item.key} className="space-y-3">
                <div>
                  <Label className="text-lg font-semibold">{item.title}</Label>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <Button
                      key={score}
                      type="button"
                      variant={formData[item.key as keyof AssessmentData] === score ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleInputChange(item.key as keyof AssessmentData, score)}
                      className="w-12 h-12"
                    >
                      {score}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Not Ready</span>
                  <span>Fully Ready</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Add any additional context, specific challenges, or areas of concern..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Results Preview */}
        <Card className="bg-gradient-to-r from-cyan-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-2xl">Assessment Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-cyan-600">
                {calculateScore()}/5.0
              </div>
              <div className="text-xl font-semibold text-gray-800">
                {getScoreDescription(parseFloat(calculateScore()))}
              </div>
              <p className="text-gray-600">
                Complete the assessment and download your detailed report with recommendations.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3"
          >
            {isSubmitting ? (
              'Processing...'
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Download Assessment Report
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Contact Information */}
      <Card className="mt-8 bg-gray-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Need Help with Your AI Journey?
            </h3>
            <p className="text-gray-600">
              Our team of experts can help you interpret your assessment results and create a detailed implementation roadmap.
            </p>
            <div className="flex justify-center items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>richard@faeintelligence.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>[Your Phone Number]</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Fae Intelligence</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
