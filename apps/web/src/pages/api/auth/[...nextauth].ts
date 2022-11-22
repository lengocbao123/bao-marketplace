import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserInfo, login } from 'lib/services';
import { isSuccess } from 'lib/utils/response';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const { username, password } = credentials as { username: string; password: string };
          const { message, data } = await login(username, password);
          if (isSuccess(message)) {
            return {
              accessToken: data.accessToken,
              ...data.user,
            };
          } else {
            console.warn(message);
          }
        } catch (error) {
          console.warn(error);
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = String(user.accessToken);
        token.id = user.id;
        token.roles = user.roles;
        token.status = user.status;
        token.username = user.username;
        token.email = user.email;
        token.avatarUrl = user.avatarUrl;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = String(token.id || null);
      session.user.roles = token.roles || null;
      session.user.username = token.username || null;
      session.user.image = token.avatarUrl || null;
      session.user.status = token.status || null;
      session.user.name = token.username;
      session.user.email = token.email;

      return session;
    },
  },

  pages: {
    signIn: '/auth/sign-in',
  },

  jwt: {
    maxAge: 60 * 60 * 12, // 12 hours
  },

  session: {
    maxAge: 60 * 60 * 12, // 12 hours
  },
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    ...authOptions,
    callbacks: {
      ...authOptions.callbacks,
      async jwt({ token, user }) {
        if (token.accessToken && 'update' in req.query && req.query.update === 'true') {
          const response = await getUserInfo(token.accessToken);
          if (response.data) {
            token.id = response.data.id;
            token.status = response.data.status;
            token.avatarUrl = response.data.avatarUrl;
          }
        } else if (user) {
          token.accessToken = String(user.accessToken);
          token.id = user.id;
          token.roles = user.roles;
          token.email = user.email;
          token.status = user.status;
          token.username = user.username;
          token.avatarUrl = user.avatarUrl;
        }

        return token;
      },
    },
  });
}
