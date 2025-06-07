
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ContactModal } from '@/components/ui/ContactModal';
import { CheckCircle, Brain, Lightbulb, Users, Zap, ChevronRight } from 'lucide-react';

const whyChooseItems = [
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "Real-World Focus",
    text: "Our training is grounded in decades of operational experience and current AI application development.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "Practical & Actionable",
    text: "You'll gain skills and insights you can apply immediately to your job.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Accessible to All",
    text: "We break down complex topics into understandable concepts – no deep technical background needed.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Empowering",
    text: "Our goal is to build your confidence and capability to leverage AI effectively.",
  },
];

const trainingOfferings = [
  {
    title: "AI Kickstart for Your Business",
    description: "A foundational workshop to demystify AI and equip your team with the essentials. We focus on identifying how to leverage accessible AI tools – starting with your preferred or existing tools – to achieve immediate operational improvements and expand their utility.",
    isForYou: [
      "Business owners, managers, and teams new to AI seeking practical applications across various departments.",
      "Organizations looking for a no-hype introduction to AI, focused on enhancing their current toolset and workflows.",
      "Companies aiming to improve efficiency and foster a culture of data-driven innovation and problem-solving.",
    ],
    outcomes: [
      "Understand fundamental AI concepts relevant to your business operations.",
      "Identify AI use cases within your specific workflows, leveraging tools you already use or can easily adopt.",
      "Gain hands-on experience applying AI principles with 1-2 accessible tools, tailored to your environment.",
      "Learn to approach problem-solving with an AI-first mindset, maximizing your existing resources and data.",
    ],
    difference: "Delivered by an operations veteran with 30+ years of experience, this workshop prioritizes extreme practicality. We start where you are, showing you how to expand the capabilities of your current tools with AI, translating complex concepts into actionable strategies for your business.",
  },
  {
    title: "Operational AI Excellence",
    description: "Ready to go beyond basic AI? This program helps your team dive deeper, applying a diverse range of powerful AI tools to solve more complex business challenges, enhance strategic decision-making, and achieve significant time savings across your operations.",
    isForYou: [
      "Teams with foundational AI knowledge (e.g., completed our AI Kickstart or similar) ready to advance their skills.",
      "Professionals eager to learn how to orchestrate multiple AI tools for complex problem-solving and workflow automation.",
      "Organizations focused on developing internal AI leaders and executing high-impact projects that deliver substantial efficiency gains.",
    ],
    outcomes: [
      "Master the application of various AI tools (selected based on your needs) for advanced process optimization, data analysis, and intelligent automation.",
      "Develop a strategic framework for identifying, planning, and implementing AI projects that yield significant time savings and measurable ROI.",
      "Gain skills in building and interpreting more sophisticated AI-driven insights for enhanced reporting and strategic decision-making.",
      "Learn to integrate multiple AI capabilities to create powerful, customized solutions for your unique business challenges.",
    ],
    difference: "This program emphasizes hands-on mastery and strategic application, guided by deep operational expertise. We ensure your team learns to apply a combination of AI tools to solve *your* most pressing and complex business problems, unlocking the next level of efficiency and innovation.",
  },
  {
    title: "AI-Driven Predictive Maintenance Primer",
    description: "This primer on AI-Driven Predictive Maintenance exemplifies how Fae Intelligence designs specialized, advanced training tailored to your critical operational needs. While this module focuses on PdM (analyzing data to predict equipment failures and optimize asset management), we develop similar deep-dive programs for other business areas where advanced AI offers a significant competitive edge.",
    isForYou: [
      "Maintenance managers, reliability engineers, operations teams, and technical staff in asset-heavy businesses.",
      "Companies looking to reduce unplanned downtime, optimize maintenance schedules, and extend asset lifecycle.",
      "Organizations exploring the use of existing sensor or operational data for AI-driven predictive insights.",
    ],
    outcomes: [
      "Understand the core principles of predictive maintenance (PdM) using AI.",
      "Explore AI tools (e.g., Orange Data Mining, Python basics, specialized cloud services) for analyzing operational data.",
      "Learn to identify data requirements for effective AI-based PdM and asset management.",
      "Outline a basic strategy for implementing an AI-based PdM pilot project to demonstrate value.",
    ],
    difference: "Our strength lies in translating complex AI into practical, impactful solutions. The Predictive Maintenance Primer showcases this by making advanced PdM concepts accessible. We bring this same tailored, results-driven approach to any advanced AI training program we develop, ensuring it addresses your unique challenges and empowers your team with cutting-edge skills.",
  },
];


export function ServicesSection() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <section id="services" className="bg-background"> 
      <div className="bg-secondary text-secondary-foreground text-center py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-4">Fae Intelligence Training Programs</h2>
          <p className="text-xl md:text-2xl font-headline mb-6 max-w-4xl mx-auto">
            Unlock Your Business Potential with Practical AI Skills
          </p>
          <div className="max-w-3xl mx-auto space-y-4 text-lg">
            <p>
              At Fae Intelligence, we believe that the transformative power of Artificial Intelligence should be accessible to everyone, not just technical specialists. Our training programs are meticulously designed for operations professionals, business teams, and all knowledge workers – from the shop floor to the front office – who are ready to leverage AI to solve real-world problems, boost their effectiveness, and drive innovation.
            </p>
            <p>
              Led by Richard Snyder, an operations veteran with 30+ years of experience and current, hands-on AI development expertise, our workshops cut through the hype. We focus on practical application, tangible results, and empowering you with skills you can use immediately. No advanced coding expertise is required – just a desire to learn and make a real impact.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-24"> 
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold font-headline text-center mb-8 text-foreground">Why Choose Fae Intelligence Training?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseItems.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-lg">
                  {item.icon}
                  <h4 className="text-xl font-semibold font-headline mt-4 mb-2 text-card-foreground">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold font-headline text-center mb-10 text-foreground">Our Foundational Training Offerings</h3>
            <div className="space-y-12">
              {trainingOfferings.map((offering, index) => (
                <Card key={index} className="bg-card border-border/50 shadow-xl overflow-hidden">
                  <CardHeader className="bg-card p-6"> 
                    <CardTitle className="text-2xl font-bold font-headline text-primary">{offering.title}</CardTitle>
                    {offering.description && <CardDescription className="text-muted-foreground pt-2">{offering.description}</CardDescription>}
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold font-headline mb-3 text-card-foreground">Is This Training For You?</h4>
                      <ul className="space-y-2">
                        {offering.isForYou.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold font-headline mb-3 text-card-foreground">What You'll Walk Away With (Key Learning Outcomes):</h4>
                      <ul className="space-y-2">
                        {offering.outcomes.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold font-headline mb-3 text-card-foreground">The Fae Intelligence Difference:</h4>
                      <p className="text-muted-foreground italic">{offering.difference}</p>
                    </div>
                    <div className="pt-2">
                      <ContactModal open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <Button 
                          variant="outline" 
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" 
                          onClick={() => setIsModalOpen(true)}
                        >
                          Learn More <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </ContactModal>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-border/50 mt-16">
              <h3 className="text-xl md:text-2xl font-bold font-headline text-foreground mb-4">Ready to take the next step in your professional development and harness the power of AI?</h3>
              <p className="text-lg text-muted-foreground mb-8">
               Explore our upcoming sessions or contact us to discuss customized training for your team.
              </p>
              <ContactModal open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <Button 
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300" 
                    onClick={() => setIsModalOpen(true)}
                  >
                    Contact Us About Training
                  </Button>
              </ContactModal>
          </div>
        </div>
      </div>
    </section>
  );
}
