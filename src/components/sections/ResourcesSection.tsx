
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ContactModal } from "@/components/ui/ContactModal";
import { CheckCircle } from "lucide-react";

const strengths = [
  "Deep Industry Knowledge: Practical understanding of manufacturing processes and SME challenges, built over 30+ years.",
  "Tailored, Low-Cost Solutions: AI strategies and training customized for your specific needs, emphasizing accessible, high-value tools.",
  "Results-Driven & Empowering: Focused on tangible improvements and upskilling your team for long-term success and AI adoption.",
];

export function ResourcesSection() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <section id="resources" className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 font-headline">Key Strengths of Fae Intelligence</h2>
        <div className="max-w-3xl mx-auto mb-10">
          <ul className="space-y-4">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Executive MBA | Commitment to Continuous Learning in AI & Manufacturing Excellence
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
           <ContactModal open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300 w-full sm:w-auto"
              onClick={() => setIsModalOpen(true)}
            >
              Request a Consultation
            </Button>
          </ContactModal>
          <Link href="/#about" passHref>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 w-full sm:w-auto"
            >
              More About Our Approach
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
