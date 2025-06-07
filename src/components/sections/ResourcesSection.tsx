
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, FileText, Users } from "lucide-react"; // Example icons

const resources = [
  {
    icon: <BookOpen className="h-8 w-8 text-accent" />,
    title: "Whitepapers & Publications",
    description: "Access our latest research papers, technical reports, and thought leadership articles on the future of AI.",
    link: "#",
    linkText: "Explore Publications",
  },
  {
    icon: <FileText className="h-8 w-8 text-accent" />,
    title: "Case Studies",
    description: "Discover how our AI solutions have delivered tangible results for organizations across various sectors.",
    link: "#",
    linkText: "View Case Studies",
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    title: "Community & Events",
    description: "Join our community forums, attend webinars, and participate in workshops to learn and collaborate.",
    link: "#",
    linkText: "Get Involved",
  },
];

export function ResourcesSection() {
  return (
    <section id="resources" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline">Resources</h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Explore our collection of resources to learn more about AI and our work at Fae Intelligence Reborn.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <Card key={resource.title} className="flex flex-col bg-card border-border/50 shadow-lg hover:shadow-accent/20 transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                {resource.icon}
                <CardTitle className="text-xl font-semibold text-card-foreground">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-muted-foreground">{resource.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="text-accent hover:text-accent/80 p-0">
                  <Link href={resource.link}>
                    {resource.linkText}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
