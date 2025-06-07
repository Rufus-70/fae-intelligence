
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Added ArrowRight here
import Link from "next/link";
import { Button } from "@/components/ui/button";

// This is a basic structure. In a real app, you'd fetch post data based on the slug.
// For example, from a CMS or local markdown files.

// Dummy content function
function getDummyPostContent(slug: string) {
  const posts: { [key: string]: { title: string; content: string; date: string } } = {
    "first-post": {
      title: "Our First Blog Post",
      content: "<p>This is the full content of our first blog post. We're excited to share our insights with you. Stay tuned for more articles on AI, business, and technology.</p><p>In this space, we'll explore various topics, including:</p><ul><li>The impact of AI on small to medium-sized businesses.</li><li>Practical tips for implementing AI tools.</li><li>Case studies and success stories.</li><li>The latest trends in artificial intelligence.</li></ul><p>Thank you for joining us on this journey!</p>",
      date: "October 26, 2023" // Example date
    },
    "ai-in-business": {
      title: "The Future of AI in Business",
      content: "<p>Artificial Intelligence (AI) is no longer a futuristic concept; it's a present-day reality transforming how businesses operate. From automating mundane tasks to providing deep data insights, AI offers unprecedented opportunities for growth and innovation.</p><p>Small and medium-sized enterprises (SMEs) can particularly benefit from AI by leveling the playing field against larger corporations. Accessible AI tools can help SMEs enhance customer service, optimize marketing efforts, and streamline operations without significant upfront investment.</p><p>However, adopting AI also comes with challenges, such as data privacy concerns, the need for skilled personnel, and the ethical implications of AI decision-making. It's crucial for businesses to approach AI strategically, focusing on areas where it can deliver the most value while mitigating risks.</p>",
      date: "October 27, 2023" // Example date
    },
    "practical-ai-tips": {
      title: "Practical AI Tips for SMEs",
      content: "<p>For small to medium enterprises (SMEs), diving into Artificial Intelligence can seem daunting. However, many practical AI tools are readily available and can offer immediate benefits. Here are a few tips:</p><ol><li><strong>Start Small:</strong> Identify one or two specific pain points in your business that AI could address. Don't try to overhaul everything at once.</li><li><strong>Leverage Free or Low-Cost Tools:</strong> Many AI-powered tools for tasks like content creation, customer service chatbots, or data analysis offer free tiers or affordable subscriptions.</li><li><strong>Focus on Data Quality:</strong> AI models are only as good as the data they are trained on. Ensure your data is clean, organized, and relevant.</li><li><strong>Train Your Team:</strong> Invest in basic AI literacy for your employees. Fae Intelligence offers workshops designed for this purpose.</li><li><strong>Stay Informed:</strong> The AI landscape is constantly evolving. Keep up with new tools and best practices relevant to your industry.</li></ol><p>By taking a practical and incremental approach, SMEs can successfully integrate AI into their operations and gain a competitive edge.</p>",
      date: "October 28, 2023" // Example date
    }
  };
  return posts[slug] || { title: "Post Not Found", content: "<p>The content for this post could not be found. Please check the URL or navigate back to the blog.</p>", date: new Date().toLocaleDateString() };
}


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getDummyPostContent(params.slug);

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button variant="outline" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          <Card className="bg-card border-border/50 shadow-lg">
            <CardHeader className="border-b border-border/30">
              <CardTitle className="text-3xl md:text-4xl font-bold font-headline text-primary">
                {post.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground pt-2">Published on {post.date}</p>
            </CardHeader>
            <CardContent className="py-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert text-card-foreground">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </CardContent>
          </Card>

           <div className="mt-12 text-center">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/#contact">
                  Discuss AI for Your Business <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
           </div>
        </div>
      </main>
      <Footer />
      {/* Add Tailwind Typography CDN for prose styling until proper setup */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@tailwindcss/typography@0.5.x/dist/typography.min.css" rel="stylesheet" />

    </>
  );
}

// Optional: Generate static paths if you know all slugs upfront
// export async function generateStaticParams() {
//   // In a real app, fetch slugs from your data source
//   const slugs = ["first-post", "ai-in-business", "practical-ai-tips"];
//   return slugs.map((slug) => ({
//     slug,
//   }));
// }

// Optional: Add metadata
// export async function generateMetadata({ params }: { params: { slug: string } }) {
//   const post = getDummyPostContent(params.slug);
//   return {
//     title: post.title,
//     description: "A blog post from Fae Intelligence.", // Or generate a better description
//   };
// }
