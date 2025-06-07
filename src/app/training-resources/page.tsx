
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MousePointerSquare, BrainCircuit, ArrowRight, BookOpen, Cpu, LayersIcon } from "lucide-react"; // Added BookOpen, Cpu, LayersIcon
import Link from "next/link";

export default function TrainingResourcesPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-16 md:py-24 bg-background">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-3 text-foreground">
            Fae Intelligence Training Resources
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-headline">
            Equip yourself with the knowledge and tools for AI success.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-card border-border/50 shadow-lg flex flex-col">
            <CardHeader className="items-center text-center">
              <MousePointerSquare className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-2xl font-semibold font-headline text-card-foreground">
                Introductory AI Tools
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Get started with user-friendly AI tools that require minimal setup and offer immediate benefits.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <p className="text-muted-foreground text-center">
                Discover foundational tools that can help automate tasks, generate content, and provide basic insights without a steep learning curve.
              </p>
              <div className="space-y-3 mt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/training-resources/perplexity-ai">
                    <BookOpen className="mr-2 h-4 w-4" /> Perplexity AI Guide
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/training-resources/genspark-ai">
                    <Cpu className="mr-2 h-4 w-4" /> GensparK AI Guide
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/training-resources/claude-3">
                    <LayersIcon className="mr-2 h-4 w-4" /> Claude 3 Guide
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50 shadow-lg flex flex-col">
            <CardHeader className="items-center text-center">
              <BrainCircuit className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-2xl font-semibold font-headline text-card-foreground">
                Advanced AI Tools & Techniques
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                (Once you have caught the AI bug!)
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <p className="text-muted-foreground text-center">
                Ready to dive deeper? Explore powerful tools and concepts for more complex AI applications, data analysis, and strategic insights.
              </p>
              <div className="text-center mt-4">
                <Button variant="outline" disabled>
                  Explore Advanced Tools (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/#services">
                  View Our Training Programs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
