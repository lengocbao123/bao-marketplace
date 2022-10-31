import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login, getUserInfo } from '../../../lib/services';
import { isSuccess } from '../../../lib/utils/response';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials) {
        try {
          const { email: username, password } = credentials as { email: string; password: string };
          const auth = await login(username, password);

          if (isSuccess(auth.message)) {
            const { data: user } = await getUserInfo(auth.data.accessToken);

            return {
              ...user,
              ...auth.data
            };
          } else {
            console.warn(auth.message);
          }
        } catch (error) {
          console.warn(error);
        }
        return null;
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = String(user.accessToken);
        token.id = user.id;
        token.roles = user.roles;
        token.username = user.username;
        token.avatarUrl = user.avatarUrl;
        token.name = user.name || user.username;
        token.image = user.image || user.avatarUrl;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = String(token.id || null);
      session.user.roles = token.roles;
      session.user.username = token.username || null;
      session.user.avatarUrl = token.avatarUrl || null;
      session.user.name = token.name || null;
      session.user.image = token.avatarUrl || null;

      return session;
    }
  },

  pages: {
    signIn: '/auth/sign-in'
  },

  jwt: {
    maxAge: 60 * 60 * 12 // 12 hours
  },

  session: {
    maxAge: 60 * 60 * 12 // 12 hours
  }
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    ...authOptions,
    callbacks: {
      ...authOptions.callbacks
    }
  });
}
