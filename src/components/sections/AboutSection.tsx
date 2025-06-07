
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, Users, Settings2 } from "lucide-react";

const expertiseAreas = [
  {
    icon: <Target className="h-10 w-10 text-accent" />,
    title: "Custom AI Strategy Development",
    description: "Develop a low-cost AI strategy aligned with your business goals, ensuring practical and measurable outcomes for immediate impact.",
  },
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    title: "Hands-On AI Training Workshops",
    description: "Empower your team with practical AI skills through tailored workshops. We focus on free/low-cost tools to address your unique challenges.",
  },
  {
    icon: <Settings2 className="h-10 w-10 text-accent" />,
    title: "AI Implementation & Support",
    description: "Navigate AI adoption with expert guidance, from selecting accessible tools to implementation and ongoing support, ensuring sustainable improvements.",
  },
];

export function AboutSection() {
  return (
    <>
      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline">Our Expertise: AI, Made Practical</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Fae Intelligence delivers tailored, actionable AI solutions and hands-on training, specifically designed for the unique needs of small to medium-sized businesses. Our focus is on practical, low-cost, high-impact strategies that empower your team.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((service) => (
              <Card key={service.title} className="bg-card border-border/50 shadow-lg text-center flex flex-col items-center p-6">
                <CardHeader className="items-center pb-4">
                  {service.icon}
                  <CardTitle className="text-xl font-semibold text-card-foreground mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section id="founder-intro" className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-headline">From Shop Floor to Smart Factory – Your AI Advantage Starts Here.</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            My consultancy, Fae Intelligence, bridges three decades of hands-on manufacturing operations experience with a passion for practical AI. I partner with you to demystify artificial intelligence and implement sustainable, impactful solutions.
          </p>
          <blockquote className="max-w-2xl mx-auto italic text-muted-foreground border-l-4 border-accent pl-6 py-2">
            <p className="mb-2">&quot;It is not necessary to change. Survival is not mandatory.&quot;</p>
            <footer className="text-sm font-medium text-foreground">- W. Edwards Deming</footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}
