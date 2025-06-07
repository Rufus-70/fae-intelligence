
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function AdminPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)]">
          <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
            <CardHeader className="items-center text-center">
              <ShieldAlert className="h-16 w-16 text-primary mb-4" />
              <CardTitle className="text-2xl font-bold font-headline">Admin Area</CardTitle>
              <CardDescription className="text-muted-foreground">
                This section is for authorized personnel only.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-card-foreground">
                In a real application, this page would be protected by an authentication system.
                You would need to log in to access administrative features and content.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
