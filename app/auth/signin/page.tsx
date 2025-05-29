'use client'; // Required for event handlers

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await signIn('credentials', {
      redirect: false, // Handle redirect manually
      email,
      password,
    });

    if (result?.error) {
      setError('Invalid login credentials. Only the owner can log in.');
      console.error("SignIn Error:", result.error);
    } else if (result?.ok) {
      router.push('/admin'); // Redirect to admin dashboard on successful login
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Admin Sign In</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email:</label><br/>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                 style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password">Password:</label><br/>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                 style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}/>
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}
