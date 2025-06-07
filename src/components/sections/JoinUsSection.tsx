
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function JoinUsSection() {
  return (
    <section id="join-us" className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-headline">Join Us</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          We are looking for talented individuals who are passionate about building the future of artificial general intelligence. If you are driven by curiosity and a desire to make a positive impact, we want to hear from you.
        </p>
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="#">
            View Open Positions <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
