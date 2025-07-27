'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Sparkles, Target, ExternalLink, QuoteIcon, ArrowRight } from 'lucide-react';
import React, { useEffect } from 'react';
import Image from 'next/image';

const RichardSnyderImage = "/assets/images/richard-snyder.png";

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Fae Intelligence | Practical AI, Real-World Results';
  }, []);

  return (
    <div className="min-h-screen">
      {/* Section 1: Hero - Dark Background */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-10 md:py-12">
        <Container className="text-center !py-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                About Fae Intelligence
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-white/90 mb-1 normal-case">
                Practical AI, Real-World Results Across Your Organization
            </p>
            <p className="text-md sm:text-lg text-white/80 normal-case">
                Built on 30+ years of Operational Excellence: Making AI accessible to your team.
            </p>
        </Container>
      </section>

      {/* Section 2: Experience - Light Background */}
      <section className="bg-gray-50 text-gray-900 py-10 md:py-12">
        <Container className="max-w-4xl mx-auto">
          <Grid cols="1" gap="8" className="items-center">
            <div className="md:grid md:grid-cols-3 md:gap-8 items-start">
              <div className="md:col-span-1 flex justify-center md:justify-start mb-6 md:mb-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 relative">
                  <Image
                    src={RichardSnyderImage}
                    alt="Richard Snyder - Founder of Fae Intelligence"
                    fill
                    sizes="(max-width: 768px) 128px, (max-width: 1200px) 160px, 160px"
                    className="rounded-lg shadow-md object-cover object-center"
                    unoptimized={true}
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-lg text-gray-700 normal-case leading-relaxed">
                  For over 30 years, I lived and breathed operations. I saw the incredible potential within teams and processes, but I also saw the frustrating reality that impacted <em>every</em> department: constant <strong>resource constraints</strong>, essential knowledge workers that never have time, and critical support always stretched too thin. I knew there were better ways &ndash; overlooked efficiencies and <strong>untapped potential</strong> across the entire organization.
                </p>
              </div>
            </div>
          </Grid>
        </Container>
      </section>

      {/* Section 3: Our Approach - Dark Background */}
      <section className="bg-white text-gray-900 py-10 md:py-12">
        <Container className="max-w-4xl mx-auto">
          <Grid cols="1" gap="6">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-cyan-500 shrink-0" />
              <h2 className="text-3xl sm:text-4xl font-bold">
                Our Approach: Immediate Impact
              </h2>
            </div>
            <p className="text-lg normal-case text-gray-700 leading-relaxed">
              We cut through the hype and the paradox of too many choices. <strong>Fae Intelligence</strong> focuses on getting you <strong>results *today*</strong>. Our training isn&apos;t theoretical; it&apos;s <strong>hands-on</strong>, using the very AI tools your teams can implement immediately (often for free). We work with you to identify the specific operational or departmental bottlenecks &ndash; <em>you</em> face and show you exactly how these tools can provide solutions, freeing up valuable employee time (even a conservative estimate is <strong>5-10% or more</strong>) and making your entire organization more efficient and competitive, starting from day one after the training.
            </p>
            <p className="text-lg normal-case text-gray-700 leading-relaxed">
              This isn&apos;t about replacing people; it&apos;s about <strong>empowering your entire team</strong>. It&apos;s about giving your people the tools to be more effective, more efficient, and more valuable in a changing world, no matter their department.
            </p>
          </Grid>
        </Container>
      </section>

      {/* Section 4: Modern Magic - Light Background */}
      <section className="bg-gray-50 text-gray-900 py-10 md:py-12">
        <Container className="max-w-4xl mx-auto">
          <Grid cols="1" gap="6">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-cyan-500 shrink-0" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                The &quot;Modern Magic&quot; Applicable to Every Team
              </h2>
            </div>
            <p className="text-lg normal-case text-gray-700 leading-relaxed">
              As I explored the world of Artificial Intelligence, I had an &apos;aha!&apos; moment. Not with futuristic, million-dollar systems, but with the incredibly powerful, yet <strong>accessible</strong>, tools available *right now* &ndash; many for free or minimal cost. These weren&apos;t just tech toys; they were practical instruments that could solve the very problems faced daily by *all* your teams: streamlining workflows in planning, accelerating research for engineering, improving communication in logistics, instantly accessing information across administration, boosting productivity everywhere.
            </p>
            <p className="text-lg normal-case text-gray-700 leading-relaxed">
              I realized this wasn&apos;t just technology; as Arthur C. Clarke said,
            </p>
            <blockquote className="my-4 p-4 border-l-4 border-cyan-500 bg-gray-100 text-gray-700 italic rounded-md text-lg shadow relative leading-relaxed">
              <QuoteIcon className="absolute top-2 left-2 w-6 h-6 text-cyan-500/50 transform -translate-x-1/2 -translate-y-1/2" />
              &quot;Any sufficiently advanced technology is indistinguishable from magic.&quot;
              <cite className="block text-right text-sm not-italic text-gray-600 mt-2">- Arthur C. Clarke</cite>
            </blockquote>
            <p className="text-lg normal-case text-gray-700 leading-relaxed">
              This was <strong>Modern Magic</strong> &ndash; practical intelligence that could transform operations and benefit <strong>every corner of your business</strong>.
            </p>
          </Grid>
        </Container>
      </section>

      {/* Section 5: Why Fae Intelligence Exists - Light Background */}
      <section className="bg-white text-gray-900 py-10 md:py-12">
        <Container className="max-w-4xl mx-auto">
          <Grid cols="1" gap="6">
            <Card className="bg-white border-gray-300 shadow-lg text-gray-900">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-8 h-8 text-cyan-500 shrink-0" />
                  <CardTitle className="text-2xl md:text-3xl font-semibold text-gray-900">
                    Why Fae Intelligence Exists: Your Organization, Unleashed
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-lg normal-case text-gray-700 leading-relaxed">
                <p>
                  That&apos;s why I created <strong>Fae Intelligence</strong>. My mission is to bridge the gap between the powerful potential of AI and the real-world needs of small and medium businesses, impacting <strong>all their departments</strong>. I&apos;m not a salesperson; I&apos;m an <strong>operations professional</strong> who understands your organizational pain points because I&apos;ve been <strong>in the trenches</strong> &ndash; dealing with the interconnected challenges that affect quality control, production flow, resource allocation, planning efficiency, and the daily demands across your entire business environment.
                </p>
                <p>
                  Therefore, the purpose of Fae intelligence extends beyond simply teaching people about AI prompting. While that is a crucial element, our core mission is to <strong>empower individuals and organizations to unlock immediate and tangible value through the strategic and effective use of AI.</strong> We aim to bridge the gap between the readily available power of AI and its practical application in everyday workflows, particularly in demanding operational environments where efficiency is paramount.
                </p>
                <p>
                  We understand the pressures of tight resources and the urgency of improving productivity. Fae Intelligence is dedicated to providing accessible knowledge and tools that enable teams to reclaim their time, optimize their processes, and ultimately thrive in an increasingly AI-driven world. We&apos;re not just about theory; we&apos;re about delivering practical, impactful solutions rooted in real-world operational experience.
                </p>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </section>

      {/* Section 6: Transformation Statement - Dark Background */}
      <section className="bg-cyan-500 text-white py-10 md:py-12">
        <Container className="text-center max-w-3xl mx-auto !py-0">
          <p className="text-xl font-semibold text-white normal-case">
            Fae Intelligence transforms businesses by making the &quot;modern magic&quot; of AI accessible.
          </p>
        </Container>
      </section>

      {/* Section 7: Deming Quote & Final CTA - Light Background */}
      <section className="bg-gray-50 text-gray-900 py-10 md:py-12">
        <Container className="text-center max-w-3xl mx-auto space-y-6 !pt-6 !pb-8">
            <div className="max-w-4xl mx-auto space-y-6 text-left"> {/* Adjusted for quote block */}
              <p className="text-lg text-gray-700 normal-case leading-relaxed">
                  My experiences in manufacturing showed me a harsh truth about today&apos;s market:
              </p>
              <blockquote className="my-4 p-4 border-l-4 border-cyan-500 bg-gray-100 text-gray-700 italic rounded-md text-lg shadow relative leading-relaxed">
                <QuoteIcon className="absolute top-2 left-2 w-6 h-6 text-cyan-500/50 transform -translate-x-1/2 -translate-y-1/2" />
                &quot;It is not necessary to change. Survival is not mandatory.&quot;
                <cite className="block text-right text-sm not-italic text-gray-600 mt-2">- W. Edwards Deming</cite>
              </blockquote>
              <p className="text-lg text-gray-700 normal-case leading-relaxed">
                The experience learned is that Deming was right. We don&apos;t have to change; survival is not mandatory. The stark reality is that those who do not get on board with adapting and evolving will inevitably fade away. This unavoidable consequence <em>is</em> the very sense of urgency. It&apos;s this truth, witnessed firsthand, that fuels my passion to help businesses like yours not just survive, but thrive.
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-2 pt-6"> {/* Added pt-6 for spacing */}
              Ready to Empower Your Teams?
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto normal-case leading-relaxed">
              Welcome to Fae Intelligence. Let&apos;s unlock the hidden potential across your organization, starting today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
              <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-md px-8 py-3">
                <Link href="/contact">
                  Contact Us Today <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white shadow-md px-8 py-3">
                <Link href="/services">
                  Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
        </Container>
      </section>
    </div>
  )
}
