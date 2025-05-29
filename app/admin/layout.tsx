'use client'; // Required for useSession and useEffect

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Don't do anything while loading
    if (!session) {
      router.push('/auth/signin'); // Redirect if not authenticated
    }
    // Additional check for owner email if needed, though authorize should handle this.
    // if (session && session.user?.email !== process.env.NEXT_PUBLIC_OWNER_EMAIL_FOR_CLIENT) {
    //   router.push('/'); // Redirect if not owner (though they shouldn't get a session if not owner)
    // }
  }, [session, status, router]);

  if (status === 'loading' || !session) {
    // You can render a loading spinner here
    return <p>Loading session...</p>;
  }

  // Ensure NEXT_PUBLIC_OWNER_EMAIL_FOR_CLIENT is set in .env.local if using the client-side check
  // if (session.user?.email !== process.env.NEXT_PUBLIC_OWNER_EMAIL_FOR_CLIENT) {
  //    return <p>Access Denied. You are not authorized to view this page.</p>;
  // }

  return (
    <section className="flex">
      <aside className="w-64 bg-slate-800 text-white p-4 min-h-screen">
        <h2 className="text-xl font-semibold mb-4">Admin Menu</h2>
        <nav>
          <ul>
            <li className="mb-2"><Link href="/admin/dashboard" className="hover:text-sky-400">Dashboard</Link></li>
            <li className="mb-2"><Link href="/admin/prompts" className="hover:text-sky-400">Prompts</Link></li>
            <li className="mb-2"><Link href="/admin/workflows" className="hover:text-sky-400">Workflows</Link></li>
            <li className="mb-2"><Link href="/admin" className="hover:text-sky-400">Admin Home</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        {children}
      </main>
    </section>
  );
}
