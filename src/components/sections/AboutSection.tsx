
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ui/ContactModal";
import Link from "next/link";

export function AboutSection() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <section id="about" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-3 text-foreground">ABOUT FAE INTELLIGENCE</h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-headline mb-2">
            Practical AI, Real-World Results Across Your Organization
          </p>
          <p className="text-lg text-accent">
            Built on 30+ years of Operational Excellence: Making AI accessible to your team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8 text-muted-foreground">
          <div>
            <h3 className="text-2xl font-semibold font-headline text-foreground mb-4">Richard Snyder - Founder of Fae Intelligence</h3>
            <p className="mb-4">
              For over 30 years, I lived and breathed manufacturing. I saw the incredible potential within teams and processes, but I also saw the frustrating reality that impacted every department: constant resource constraints, essential specialized time (like engineering or planning) that was never available, and critical support always stretched too thin. I knew there were better ways – overlooked efficiencies and untapped potential across the entire organization.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold font-headline text-foreground mb-4">Our Approach: Immediate Impact</h3>
            <p className="mb-4">
              We cut through the hype and the paradox of too many choices. Fae Intelligence focuses on getting you results <strong className="text-foreground">today</strong>. Our training isn't theoretical; it's hands-on, using the very AI tools your teams can implement immediately (often for free). We work with you to identify the specific operational or departmental bottlenecks – you face and show you exactly how these tools can provide solutions, freeing up valuable employee time (even a conservative estimate is 5-10% or more) and making your entire organization more efficient and competitive, starting from day one after the training.
            </p>
            <p>
              This isn't about replacing people; it's about empowering your entire team. It's about giving your people the tools to be more effective, more efficient, and more valuable in a changing world, no matter their department.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold font-headline text-foreground mb-4">The &quot;Modern Magic&quot; Applicable to Every Team</h3>
            <p className="mb-4">
              As I explored the world of Artificial Intelligence, I had an 'aha!' moment. Not with futuristic, million-dollar systems, but with the incredibly powerful, yet accessible, tools available <strong className="text-foreground">right now</strong> – many for free or minimal cost. These weren't just tech toys; they were practical instruments that could solve the very problems faced daily by <em className="italic">all</em> your teams: streamlining workflows in planning, accelerating research for engineering, improving communication in logistics, instantly accessing information across administration, boosting productivity everywhere.
            </p>
            <p className="mb-4">
              I realized this wasn't just technology; as Arthur C. Clarke said,
            </p>
            <blockquote className="border-l-4 border-accent pl-6 py-2 my-4 italic">
              <p className="mb-1">&quot;Any sufficiently advanced technology is indistinguishable from magic.&quot;</p>
              <footer className="text-sm font-medium text-foreground/80">- Arthur C. Clarke</footer>
            </blockquote>
            <p>
              This was Modern Magic – practical intelligence that could transform operations and benefit every corner of your business.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold font-headline text-foreground mb-4">Why Fae Intelligence Exists: Your Organization, Unleashed</h3>
            <p className="mb-4">
              That's why I created Fae Intelligence. My mission is to bridge the gap between the powerful potential of AI and the real-world needs of small and medium businesses, impacting all their departments. I'm not a salesperson; I'm an operations professional who understands your organizational pain points because I've been in the trenches – dealing with the interconnected challenges that affect quality control, production flow, resource allocation, planning efficiency, and the daily demands across your entire business environment.
            </p>
            <p className="mb-4">
              Therefore, the purpose of Fae intelligence extends beyond simply teaching people about AI prompting. While that is a crucial element, our core mission is to empower individuals and organizations to unlock immediate and tangible value through the strategic and effective use of AI. We aim to bridge the gap between the readily available power of AI and its practical application in everyday workflows, particularly in demanding operational environments where efficiency is paramount.
            </p>
            <p className="mb-4">
              We understand the pressures of tight resources and the urgency of improving productivity. Fae Intelligence is dedicated to providing accessible knowledge and tools that enable teams to reclaim their time, optimize their processes, and ultimately thrive in an increasingly AI-driven world. We're not just about theory; we're about delivering practical, impactful solutions rooted in real-world operational experience.
            </p>
            <p className="text-lg text-foreground font-semibold mb-4">
              Fae Intelligence transforms businesses by making the &quot;modern magic&quot; of AI accessible.
            </p>
            <p className="mb-4">
              My experiences in manufacturing showed me a harsh truth about today's market:
            </p>
            <blockquote className="border-l-4 border-accent pl-6 py-2 my-4 italic">
              <p className="mb-1">&quot;It is not necessary to change. Survival is not mandatory.&quot;</p>
              <footer className="text-sm font-medium text-foreground/80">- W. Edwards Deming</footer>
            </blockquote>
            <p>
              The experience learned is that Deming was right. We don't have to change; survival is not mandatory. The stark reality is that those who do not get on board with adapting and evolving will inevitably fade away. This unavoidable consequence is the very sense of urgency. It's this truth, witnessed firsthand, that fuels my passion to help businesses like yours not just survive, but thrive.
            </p>
          </div>

          <div className="text-center pt-8">
            <h3 className="text-2xl md:text-3xl font-bold font-headline text-foreground mb-6">Ready to Empower Your Teams?</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Welcome to Fae Intelligence. Let&apos;s unlock the hidden potential across your organization, starting today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <ContactModal open={isModalOpen} onOpenChange={setIsModalOpen}>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 w-full sm:w-auto"
                  onClick={() => setIsModalOpen(true)}
                >
                  Contact Us Today
                </Button>
              </ContactModal>
              <Link href="/#services" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 w-full sm:w-auto"
                >
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
