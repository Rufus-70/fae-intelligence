
import { Button } from '@/components/ui/button';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react'; // Changed ArrowRight to ArrowLeft for clarity

interface TrainingPageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const TrainingPageHeader = ({ title, subtitle, icon }: TrainingPageHeaderProps) => (
  <header className="bg-primary text-primary-foreground py-10 md:py-12 mb-8 text-center rounded-lg shadow-md">
    <div className="container mx-auto px-4 md:px-6">
        {icon && <div className="flex justify-center mb-4">{icon}</div>}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline mb-3">{title}</h1>
      {subtitle && <p className="text-lg sm:text-xl text-primary-foreground/80">{subtitle}</p>}
    </div>
  </header>
);

export default function PerplexityAiGuidePage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12 md:py-16 bg-background">
        <TrainingPageHeader
          title="Perplexity AI Training Guide"
          subtitle="Content Under Development"
          icon={<Search className="h-12 w-12 text-accent" />}
        />

        <div className="bg-card text-foreground shadow-xl rounded-lg p-6 md:p-10">
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-semibold font-headline text-primary mb-4">Perplexity AI Overview</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              This page is a placeholder for the Perplexity AI Training Guide. Content is currently under development and will be available soon.
            </p>
            <div className="mt-10">
              <Button asChild variant="link" className="text-accent hover:underline">
                <Link href="/training-resources">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Training Resources
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
