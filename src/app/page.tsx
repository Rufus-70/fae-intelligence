import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/Container'
import { ServiceCard } from '@/components/layout/ServiceCard'
import Link from 'next/link'
import { Brain, GraduationCap, Wrench, Factory, UsersRound, LightbulbIcon } from 'lucide-react'
import Image from 'next/image'

const RichardSnyderImage = "/assets/images/richard-snyder.png";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <Container maxWidth="7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">
              Practical AI Solutions for Manufacturers
            </h1>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Leveraging over 30 years of frontline manufacturing expertise, Fae Intelligence guides your team to confidently implement AI-driven improvements. We focus on accessible, low-cost tools to deliver immediate, measurable results.
            </p>
            <div className="space-x-4">
              <Button asChild variant="primary" size="lg">
                <Link href="/consultation">Request a Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <Container maxWidth="7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Our Expertise: AI, Made Practical
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Fae Intelligence delivers tailored, actionable AI solutions and hands-on training, specifically designed for the unique needs of small to medium-sized businesses. Our focus is on practical, low-cost, high-impact strategies that empower your team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={Brain}
              title="Custom AI Strategy Development"
              description="Develop a low-cost AI strategy aligned with your business goals, ensuring practical and measurable outcomes for immediate impact."
            />

            <ServiceCard
              icon={GraduationCap}
              title="Hands-On AI Training Workshops"
              description="Empower your team with practical AI skills through tailored workshops. We focus on free/low-cost tools to address your unique challenges."
            />

            <ServiceCard
              icon={Wrench}
              title="AI Implementation & Support"
              description="Navigate AI adoption with expert guidance, from selecting accessible tools to implementation and ongoing support, ensuring sustainable improvements."
            />
          </div>
        </Container>
      </section>

      {/* Pain Points */}
      <section className="py-16 bg-white">
        <Container maxWidth="7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Overcome Your Business Challenges with AI
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We understand the hurdles you face. AI is not just for companies with huge IT budgets. Here is how Fae Intelligence consultancy and training can help:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={Factory}
              title="Operational Costs Rising?"
              description="Learn to use AI for process optimization and predictive maintenance. Identify bottlenecks, reduce downtime, and minimize waste with minimal upfront investment."
            />

            <ServiceCard
              icon={UsersRound}
              title="Skills Gap & Change Resistance?"
              description="Our workshops demystify AI with hands-on practice using user-friendly tools. We help your teams overcome AI concerns and realize the benefits."
            />

            <ServiceCard
              icon={LightbulbIcon}
              title="Unsure Where to Start with AI?"
              description="We help you identify high-impact pilot projects, for quick wins and building momentum."
            />
          </div>
        </Container>
      </section>

      {/* Expert Profile */}
      <section className="py-16 bg-gray-50">
        <Container maxWidth="7xl"> {/* Changed maxWidth to 7xl */}
          <div className="grid md:grid-cols-2 gap-12 items-center justify-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                From Shop Floor to Smart Factory – Your AI Advantage Starts Here.
              </h2>
              <p className="text-lg mb-6 text-gray-700">
                My consultancy, Fae Intelligence, bridges three decades of hands-on manufacturing operations experience with a passion for practical AI. I partner with you to demystify artificial intelligence and implement sustainable, impactful solutions.
              </p>
              <div className="border-l-4 border-cyan-500 pl-4 mb-6 italic text-gray-700">
                &quot;It is not necessary to change. Survival is not mandatory.&quot; - W. Edwards Deming
              </div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Key Strengths of Fae Intelligence:</h3>
              <div className="space-y-2 mb-6">
                <p className="text-gray-700">- <strong>Deep Industry Knowledge:</strong> Practical understanding of manufacturing processes and SME challenges, built over 30+ years.</p>
                <p className="text-gray-700">- <strong>Tailored, Low-Cost Solutions:</strong> AI strategies and training customized for your specific needs, emphasizing accessible, high-value tools.</p>
                <p className="text-gray-700">- <strong>Results-Driven & Empowering:</strong> Focused on tangible improvements and upskilling your team for long-term success and AI adoption.</p>
              </div>
              <p className="text-sm mt-6 text-gray-600">
                Executive MBA | Commitment to Continuous Learning in AI & Manufacturing Excellence
              </p>
            </div>
            <div className="text-center">
              <Image
                src={RichardSnyderImage}
                alt="Professional Photo of Richard Snyder"
                width={400}
                height={400}
                className="rounded-lg shadow-md object-cover object-center"
                style={{ width: 'auto', height: 'auto' }}
                unoptimized={true}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cyan-500 text-white">
        <Container maxWidth="7xl">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Operations with AI?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
             Request a Consultation
            </p>
            <Button asChild variant="outline" size="lg" className="bg-white text-cyan-500 hover:bg-gray-100">
              <Link href="/consultation">Request a Consultation</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
