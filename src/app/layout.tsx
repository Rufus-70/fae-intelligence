
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Montserrat, Lato } from 'next/font/google'; // Changed from Inter, Space_Grotesk
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// Initialize new fonts
const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'], // Added weights for flexibility
  variable: '--font-lato',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'], // Added weights for flexibility
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Fae Intelligence',
  description: 'Rebuilding our understanding of intelligence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
