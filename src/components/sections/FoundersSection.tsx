
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const founders = [
  {
    name: "Dr. Evelyn Reed",
    title: "Co-Founder & CEO",
    bio: "Visionary leader with a PhD in AI from Stanford, driving the mission to build safe and beneficial AGI. Previously led AI research at a major tech firm.",
    imageUrl: "https://placehold.co/400x400.png",
    dataAiHint: "woman professional"
  },
  {
    name: "Marcus Chen",
    title: "Co-Founder & CTO",
    bio: "Expert in large-scale systems and machine learning infrastructure. MIT graduate with a passion for engineering robust and scalable AI solutions.",
    imageUrl: "https://placehold.co/400x400.png",
    dataAiHint: "man professional"
  },
];

export function FoundersSection() {
  return (
    <section id="founders" className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline">Our Founders</h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Meet the minds behind Fae Intelligence Reborn, dedicated to shaping the future of AI.
        </p>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {founders.map((founder) => (
            <Card key={founder.name} className="bg-card border-border/50 shadow-lg text-center overflow-hidden">
              <CardHeader className="pb-4">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-accent">
                  <Image 
                    src={founder.imageUrl} 
                    alt={founder.name} 
                    layout="fill" 
                    objectFit="cover" 
                    data-ai-hint={founder.dataAiHint}
                  />
                </div>
                <CardTitle className="text-2xl font-semibold text-card-foreground">{founder.name}</CardTitle>
                <CardDescription className="text-accent font-medium">{founder.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{founder.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
