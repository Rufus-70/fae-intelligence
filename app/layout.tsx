import SessionProvider from './context/SessionProvider'; // Adjust path if necessary
import './globals.css'; // Assuming you have a global CSS file
import { GeistSans } from 'geist/font/sans'; // Example font, adjust as needed

export const metadata = {
  title: 'Fae Intelligence',
  description: 'AI Consultancy Tools',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The session is initialized client-side by the SessionProvider
  // by not passing a session prop, or passing undefined.
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
