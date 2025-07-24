'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, Clock, CheckCircle, ExternalLink, BookOpen, 
  Target, ArrowRight, Lightbulb, TrendingUp, 
  Star, Award, Zap, Settings, BarChart, Shield, 
  Briefcase, Cpu, Code, Brain
} from 'lucide-react'

export default function ImplementationLeaderPage() {
  const [completedModules, setCompletedModules] = useState<string[]>([])

  const toggleModule = (moduleId: string) => {
    setCompletedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const advancedModules = [
    { 
      id: 'notebook-lm',
      title: 'Utilizing Notebook LM', 
      prerequisite: null,
      url: '/resources/training/notebook-lm',
      description: 'In-depth guide to setting up and using Notebook LM for knowledge management.',
      keyTopics: ['Enterprise Knowledge Systems', 'Document Analysis', 'Team Collaboration', 'Strategic Planning']
    },
    { 
      id: 'perplexity-gemini',
      title: 'Understanding Perplexity Spaces and Gemini Gems', 
      prerequisite: 'Utilizing Notebook LM',
      url: '/resources/training/ai-research-platforms',
      description: 'Exploration of these AI research and knowledge platforms for business insights.',
      keyTopics: ['Research Platforms', 'Competitive Intelligence', 'Market Analysis', 'Innovation Strategy']
    },
    { 
      id: 'project-hubs',
      title: 'Using Perplexity and Gemini as Project Hubs', 
      prerequisite: 'Understanding Perplexity Spaces and Gemini Gems',
      url: '/resources/training/ai-project-hubs',
      description: 'Leveraging these platforms as team collaboration centers for business projects.',
      keyTopics: ['Project Management', 'Team Coordination', 'Knowledge Sharing', 'Decision Support']
    },
    { 
      id: 'mcp-docker',
      title: 'MCP & Docker Desktop Training', 
      prerequisite: 'Using Perplexity and Gemini as Project Hubs',
      url: '/resources/programming-training/mcp-docker-guide',
      description: 'Master the Model Context Protocol (MCP) and Docker Desktop for secure, efficient system access.',
      keyTopics: ['System Integration', 'Security Protocols', 'Container Management', 'Advanced Automation']
    }
  ]

  const strategicFrameworks = [
    {
      framework: 'AI Readiness Assessment',
      description: 'Evaluate your organization\'s current AI maturity and identify implementation priorities',
      components: ['Technology Infrastructure', 'Team Skills', 'Data Quality', 'Change Management'],
      outcome: 'Comprehensive readiness report with priority roadmap'
    },
    {
      framework: 'ROI Calculation Framework',
      description: 'Quantify the business impact of AI initiatives with proven measurement methods',
      components: ['Cost-Benefit Analysis', 'Risk Assessment', 'Timeline Planning', 'Success Metrics'],
      outcome: 'Executive-ready business case with projected ROI'
    },
    {
      framework: 'Change Management Strategy',
      description: 'Guide your team through AI adoption with structured change management',
      components: ['Stakeholder Analysis', 'Communication Plan', 'Training Strategy', 'Resistance Management'],
      outcome: 'Complete change management plan and communication materials'
    }
  ]

  const leadershipTools = [
    {
      category: 'Executive Dashboards',
      tools: [
        {
          name: 'AI Implementation Tracker',
          purpose: 'Monitor progress across all AI initiatives',
          features: ['Real-time status updates', 'ROI tracking', 'Risk indicators', 'Resource allocation'],
          complexity: 'Advanced'
        },
        {
          name: 'Team Performance Analytics',
          purpose: 'Measure team adoption and productivity gains',
          features: ['Skill development tracking', 'Usage analytics', 'Efficiency metrics', 'Training gaps'],
          complexity: 'Intermediate'
        }
      ]
    },
    {
      category: 'Strategic Planning Tools',
      tools: [
        {
          name: 'AI Opportunity Scanner',
          purpose: 'Identify high-impact AI use cases in your operations',
          features: ['Process analysis', 'Impact assessment', 'Feasibility scoring', 'Priority ranking'],
          complexity: 'Advanced'
        },
        {
          name: 'Competitive Intelligence Platform',
          purpose: 'Track industry AI trends and competitor movements',
          features: ['Market monitoring', 'Technology tracking', 'Benchmark analysis', 'Threat assessment'],
          complexity: 'Advanced'
        }
      ]
    }
  ]

  const implementationPhases = [
    {
      phase: 'Strategic Assessment',
      leadership_focus: ['Vision alignment', 'Stakeholder buy-in', 'Resource planning'],
      key_decisions: ['Priority use cases', 'Budget allocation', 'Team structure'],
      deliverables: ['AI strategy document', 'Implementation roadmap', 'Success criteria']
    },
    {
      phase: 'Pilot Execution',
      leadership_focus: ['Progress monitoring', 'Obstacle removal', 'Team support'],
      key_decisions: ['Scope adjustments', 'Resource reallocation', 'Timeline modifications'],
      deliverables: ['Working pilot system', 'Performance metrics', 'Lessons learned']
    },
    {
      phase: 'Scale & Optimize',
      leadership_focus: ['Change management', 'Knowledge transfer', 'Culture building'],
      key_decisions: ['Scaling approach', 'Training investments', 'Process standardization'],
      deliverables: ['Enterprise deployment', 'Training programs', 'Governance framework']
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <Container>
          <div className="text-center">
            <Users className="h-20 w-20 mx-auto mb-6 text-orange-100" />
            <h1 className="text-5xl font-bold mb-6">Implementation Leader Training Path</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Leading AI initiatives in your organization? Get strategic insights, leadership frameworks, and advanced implementation strategies.
            </p>
          </div>
        </Container>
      </section>

      {/* Strategic Frameworks Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <Container>
          <div className="text-center mb-12">
            <Briefcase className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Strategic Implementation Frameworks</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Proven frameworks to guide your AI implementation from strategy to execution
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {strategicFrameworks.map((framework, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <BarChart className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{framework.framework}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{framework.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Components:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {framework.components.map((component, componentIndex) => (
                          <li key={componentIndex} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                            {component}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-sm text-blue-900 mb-1">Outcome:</h4>
                      <p className="text-sm text-blue-800">{framework.outcome}</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <Target className="h-4 w-4 mr-1" />
                    Access Framework
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership Tools Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <Settings className="h-16 w-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Executive Leadership Tools</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Advanced tools and dashboards designed for AI implementation leaders
            </p>
          </div>

          <div className="space-y-8">
            {leadershipTools.map((category, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {category.tools.map((tool, toolIndex) => (
                    <Card key={toolIndex} className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Cpu className="h-8 w-8 text-orange-600" />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            tool.complexity === 'Advanced' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {tool.complexity}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{tool.purpose}</p>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {tool.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-500 mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full mt-4">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Configure Tool
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Implementation Phases Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <Award className="h-16 w-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Executive Implementation Roadmap</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A leadership-focused approach to driving successful AI implementation across your organization
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {implementationPhases.map((phase, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{phase.phase}</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Leadership Focus:</h4>
                          <ul className="space-y-1">
                            {phase.leadership_focus.map((focus, focusIndex) => (
                              <li key={focusIndex} className="flex items-center text-gray-700 text-sm">
                                <Users className="h-3 w-3 text-orange-600 mr-2" />
                                {focus}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Key Decisions:</h4>
                          <ul className="space-y-1">
                            {phase.key_decisions.map((decision, decisionIndex) => (
                              <li key={decisionIndex} className="flex items-center text-gray-700 text-sm">
                                <Target className="h-3 w-3 text-blue-600 mr-2" />
                                {decision}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Deliverables:</h4>
                          <ul className="space-y-1">
                            {phase.deliverables.map((deliverable, deliverableIndex) => (
                              <li key={deliverableIndex} className="flex items-center text-gray-700 text-sm">
                                <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
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

      {/* Advanced Training Modules Section */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
        <Container>
          <div className="text-center mb-12">
            <BookOpen className="h-16 w-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Advanced Training Modules</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Deep-dive modules for strategic AI implementation and advanced system integration
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {advancedModules.map((module, index) => {
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
                          canStart ? 'bg-orange-600' : 'bg-gray-400'
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
                              <span key={topicIndex} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
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
                              if (module.url.startsWith('http')) {
                                window.open(module.url, '_blank')
                              } else {
                                window.location.href = module.url
                              }
                            }}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
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

      {/* Executive Resources Section */}
      <section className="py-16 bg-gray-100">
        <Container>
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Executive Resources</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Additional resources for strategic planning and enterprise-level implementation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-6 w-6 text-blue-600 mr-2" />
                  ROI Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Interactive calculator to estimate ROI for your specific AI implementation scenarios.
                </p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Access Calculator
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 text-green-600 mr-2" />
                  Change Management Kit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Complete toolkit for managing organizational change during AI implementation.
                </p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Download Kit
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 text-red-600 mr-2" />
                  Risk Assessment Framework
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Comprehensive framework for identifying and mitigating AI implementation risks.
                </p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Framework
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Executive CTA */}
      <section className="py-16 bg-orange-600 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Lead Your AI Transformation?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get strategic guidance tailored to your leadership role and organizational context. 
              Our executive consulting services provide the strategic support you need.
            </p>
            <div className="space-x-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-gray-100"
                onClick={() => window.open('https://oshneqeo.gensparkspace.com/', '_blank')}
              >
                Start Strategic Module
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/consultation" variant="secondary" size="lg" className="bg-orange-700 hover:bg-orange-800">
                Schedule Executive Consultation
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}