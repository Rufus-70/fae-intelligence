import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/clientApp'; // Adjust path as needed

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          if (userCredential.user) {
            // Ensure this email is the owner's email
            if (userCredential.user.email === process.env.OWNER_EMAIL) {
               // Return a user object for NextAuth session
              return { id: userCredential.user.uid, email: userCredential.user.email, name: userCredential.user.displayName };
            } else {
              // Not the owner
              console.warn("Login attempt by non-owner:", userCredential.user.email);
              return null;
            }
          }
          return null;
        } catch (error) {
          console.error("Firebase Auth Error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin', // A custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
