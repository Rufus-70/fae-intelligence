
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ContactModal } from "@/components/ui/ContactModal";

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <section className="relative py-20 md:py-32 lg:py-40 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-headline animate-fade-in-down">
          UNLOCK PRACTICAL AI ADVANTAGES <br className="hidden md:block" /> FOR YOUR BUSINESS
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in-up">
          Leveraging over 30 years of frontline manufacturing expertise, Fae Intelligence guides your team to confidently implement AI-driven improvements. We focus on accessible, low-cost tools to deliver immediate, measurable results.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up animation-delay-200">
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
              Learn More About Us
            </Button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
