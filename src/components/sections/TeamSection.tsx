
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Dr. Alistair Finch",
    title: "Principal Research Scientist",
    imageUrl: "https://placehold.co/300x300.png",
    dataAiHint: "scientist man"
  },
  {
    name: "Priya Sharma",
    title: "Senior ML Engineer",
    imageUrl: "https://placehold.co/300x300.png",
    dataAiHint: "engineer woman"
  },
  {
    name: "Kenji Tanaka",
    title: "AI Ethicist & Policy Lead",
    imageUrl: "https://placehold.co/300x300.png",
    dataAiHint: "professional asian man"
  },
  {
    name: "Sofia Ramirez",
    title: "Product Manager, AI Platforms",
    imageUrl: "https://placehold.co/300x300.png",
    dataAiHint: "business woman"
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline">Our Team</h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          A diverse group of researchers, engineers, and ethicists passionate about building responsible AI.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="bg-card border-border/50 shadow-md hover:shadow-accent/10 transition-shadow duration-300 text-center overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative w-full aspect-square">
                  <Image 
                    src={member.imageUrl} 
                    alt={member.name} 
                    layout="fill" 
                    objectFit="cover"
                    data-ai-hint={member.dataAiHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold text-card-foreground">{member.name}</CardTitle>
                <CardDescription className="text-sm text-accent">{member.title}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
