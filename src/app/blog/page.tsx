
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

// Dummy blog post data
const dummyPosts = [
  { slug: "first-post", title: "Our First Blog Post", excerpt: "An introduction to our thoughts and ideas." },
  { slug: "ai-in-business", title: "The Future of AI in Business", excerpt: "Exploring how AI is reshaping industries." },
  { slug: "practical-ai-tips", title: "Practical AI Tips for SMEs", excerpt: "Actionable advice for small to medium enterprises." },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-3 text-foreground">
            Fae Intelligence Blog
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-headline">
            Insights, News, and Practical AI Applications
          </p>
        </div>

        {dummyPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col bg-card border-border/50 shadow-lg hover:shadow-accent/20 transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-card-foreground hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                  <Button variant="link" asChild className="text-accent hover:text-accent/80 p-0">
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No blog posts yet. Check back soon for updates!
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
