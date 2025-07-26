import { Container } from '@/components/layout/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { Mail, Phone, Linkedin, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <Container>
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Ready to explore how AI can transform your manufacturing operations? 
              Let&apos;s discuss your specific challenges and opportunities.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Request Your Free Consultation</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <ConsultationForm />
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-6 w-6 text-cyan-500" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:rsnyder@FaeIntelligence.com" className="text-cyan-500 hover:text-cyan-600">
                        rsnyder@FaeIntelligence.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-6 w-6 text-cyan-500" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <a href="tel:503-901-8645" className="text-cyan-500 hover:text-cyan-600">
                        503-901-8645
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Linkedin className="h-6 w-6 text-cyan-500" />
                    <div>
                      <p className="font-semibold">LinkedIn</p>
                      <a 
                        href="https://www.linkedin.com/company/107101157" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-500 hover:text-cyan-600"
                      >
                        Company Page
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-6 w-6 text-cyan-500" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-gray-600">Pacific Northwest, USA</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="font-semibold">Within 24 Hours</p>
                      <p className="text-gray-600">
                        We typically respond to consultation requests within 24 hours during business days.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}