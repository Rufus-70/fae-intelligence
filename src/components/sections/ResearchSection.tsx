
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const researchPapers = [
  {
    title: "Towards Scalable and Reliable Generative AI",
    authors: "Jane Doe, John Smith, et al.",
    publication: "Proceedings of AI Conference 2024",
    date: "October 2024",
    abstract: "This paper explores novel architectures and training methodologies aimed at enhancing the scalability and reliability of large generative models, addressing current limitations in coherence and factual accuracy.",
    link: "#",
  },
  {
    title: "Ethical Frameworks for Artificial General Intelligence",
    authors: "Alice Brown, Bob Green",
    publication: "Journal of AI Ethics, Vol 2",
    date: "August 2024",
    abstract: "We propose a comprehensive ethical framework for the development and deployment of AGI, emphasizing safety, fairness, and transparency to ensure beneficial outcomes for humanity.",
    link: "#",
  },
  {
    title: "Advancements in Multi-Modal Understanding",
    authors: "Carol White, David Black",
    publication: "Workshop on Multi-Modal Learning 2024",
    date: "June 2024",
    abstract: "This work presents new techniques for integrating and reasoning across diverse data modalities, including text, image, and audio, leading to significant improvements in understanding complex scenarios.",
    link: "#",
  },
];

export function ResearchSection() {
  return (
    <section id="research" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline">Our Research</h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          We are committed to advancing the frontiers of artificial intelligence through rigorous research and open collaboration.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchPapers.map((paper, index) => (
            <Card key={index} className="flex flex-col bg-card border-border/50 shadow-lg hover:shadow-accent/20 transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-card-foreground">{paper.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {paper.authors} - <span className="italic">{paper.publication}, {paper.date}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-card-foreground text-sm">{paper.abstract}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="text-accent hover:text-accent/80 p-0">
                  <Link href={paper.link}>
                    Read Paper <ArrowRight className="ml-2 h-4 w-4" />
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
