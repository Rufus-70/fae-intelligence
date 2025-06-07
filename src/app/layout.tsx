
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Lato, Space_Grotesk as SpaceGrotesk } from 'next/font/google';
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// Initialize Lato for body
const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-lato',
});

// Initialize Space Grotesk for headlines
const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-space-grotesk',
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
    <html lang="en" className={`${lato.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
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
