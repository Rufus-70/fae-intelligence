
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Brain, ShieldCheck } from "lucide-react"; // Example icons

const services = [
  {
    icon: <Brain className="h-10 w-10 text-accent" />,
    title: "AI Research & Development",
    description: "Pioneering research in core AI, machine learning, and cognitive architectures to push the boundaries of artificial general intelligence.",
  },
  {
    icon: <Zap className="h-10 w-10 text-accent" />,
    title: "Custom AI Solutions",
    description: "Developing tailored AI products and platforms for various industries, leveraging our cutting-edge research and engineering expertise.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-accent" />,
    title: "AI Ethics & Safety Consulting",
    description: "Providing guidance and frameworks for the ethical development and deployment of AI systems, ensuring safety and alignment with human values.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline">Our Services</h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          We offer a range of services to help organizations harness the power of AI responsibly and effectively.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
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
  );
}
