
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingDown, UsersRound, Navigation } from "lucide-react";

const challenges = [
  {
    icon: <TrendingDown className="h-10 w-10 text-accent" />,
    title: "Operational Costs Rising?",
    description: "Learn to use AI for process optimization and predictive maintenance. Identify bottlenecks, reduce downtime, and minimize waste with minimal upfront investment.",
  },
  {
    icon: <UsersRound className="h-10 w-10 text-accent" />,
    title: "Skills Gap & Change Resistance?",
    description: "Our workshops demystify AI with hands-on practice using user-friendly tools. We help your teams overcome AI concerns and realize the benefits.",
  },
  {
    icon: <Navigation className="h-10 w-10 text-accent" />,
    title: "Unsure Where to Start with AI?",
    description: "We help you identify high-impact pilot projects, for quick wins and building momentum.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline">Overcome Your Business Challenges with AI</h2>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          We understand the hurdles you face. AI is not just for companies with huge IT budgets. Here is how Fae Intelligence consultancy and training can help:
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge) => (
            <Card key={challenge.title} className="bg-card border-border/50 shadow-lg text-center flex flex-col items-center p-6">
              <CardHeader className="items-center pb-4">
                {challenge.icon}
                <CardTitle className="text-xl font-semibold text-card-foreground mt-4">{challenge.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{challenge.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
