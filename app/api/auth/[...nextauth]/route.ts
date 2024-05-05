import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope:
            'openid email profile https://www.googleapis.com/auth/contacts.readonly',
          prompt: 'consent',
          access_type: 'offline',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token;
      }
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.access_token = token.access_token;
      session.id_token = token.id_token;
      return session;
    },
  },
  debug: false,
});

export { handler as GET, handler as POST };
