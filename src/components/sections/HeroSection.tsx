import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 lg:py-40 bg-slate-900 text-primary-foreground">
      {/* Optional: Subtle background pattern or image */}
      {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-headline animate-fade-in-down">
          Rebuilding our understanding <br className="hidden md:block" /> of intelligence.
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 animate-fade-in-up">
          Fae Intelligence Reborn is an AI research and product company. We are committed to building general intelligence that works for everyone.
        </p>
        <Link href="/#research" passHref>
          <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-slate-900 transition-colors duration-300 animate-fade-in-up animation-delay-200">
            Read our Research
          </Button>
        </Link>
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
  