import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, GraduationCap, Wrench, CheckCircle, ArrowRight, Clock, Users } from 'lucide-react'

export default function ServicesPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <Container>
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              AI Services for Manufacturing Excellence
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Transform your manufacturing operations with practical AI solutions. From strategy development to hands-on implementation, we guide your team every step of the way.
            </p>
            <Button href="/consultation" variant="primary" size="lg">
              Start Your AI Journey
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Every service is designed with 30+ years of manufacturing experience, focusing on practical implementation and immediate impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="h-full">
              <CardHeader>
                <Brain className="h-16 w-16 text-cyan-500 mb-4" />
                <CardTitle className="text-2xl">Custom AI Strategy Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  Develop a bespoke, low-cost AI strategy aligned with your manufacturing goals. We analyze your current operations and identify high-impact opportunities for AI implementation.
                </p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5" />
                    <span>Operational assessment and gap analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5" />
                    <span>ROI-focused project prioritization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5" />
                    <span>Implementation roadmap and timeline</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5" />
                    <span>Risk assessment and mitigation strategies</span>
                  </li>
                </ul>
                <div className="text-sm text-gray-600 mb-4">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Typical engagement: 2-4 weeks
                </div>
                <Button href="/consultation" variant="outline" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <GraduationCap className="h-16 w-16 text-cyan-500 mb-4" />
                <CardTitle className="text-2xl">Hands-On AI Training Workshops</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  Empower your team with practical AI skills through tailored workshops. We focus on free/low-cost tools that deliver immediate value to your operations.
                </p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5" />
                    <span>Interactive, hands-on learning sessions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5" />
                    <span>Real manufacturing scenarios and case studies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5" />
                    <span>Take-home tools and resources</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5" />
                    <span>Post-training support and follow-up</span>
                  </li>
                </ul>
                <div className="text-sm text-gray-600 mb-4">
                  <Users className="h-4 w-4 inline mr-1" />
                  Up to 20 participants per session
                </div>
                <Button href="/training" variant="outline" size="sm">
                  View Training Options
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <Wrench className="h-16 w-16 text-cyan-500 mb-4" />
                <CardTitle className="text-2xl">AI Implementation & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  Navigate AI adoption with expert guidance. From selecting accessible tools to full implementation and ongoing support, we ensure sustainable improvements.
                </p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5" />
                    <span>Tool selection and evaluation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5" />
                    <span>Pilot project implementation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5" />
                    <span>Change management support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5" />
                    <span>Performance monitoring and optimization</span>
                  </li>
                </ul>
                <div className="text-sm text-gray-600 mb-4">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Ongoing partnership model
                </div>
                <Button href="/consultation" variant="outline" size="sm">
                  Discuss Your Needs
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-cyan-500 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Operations?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how Fae Intelligence can help your team implement practical AI solutions that deliver real results.
            </p>
            <div className="space-x-4">
              <Button href="/consultation" variant="outline" size="lg" className="bg-white text-cyan-500 hover:bg-gray-100">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/training" variant="secondary" size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                View Training Options
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
