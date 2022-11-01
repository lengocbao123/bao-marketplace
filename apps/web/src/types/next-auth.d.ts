import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultSession['user'] {
    roles: any[];
    id: string;
    accessToken: string;
    status: string;
    username?: string;
    avatarUrl?: string;
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface DefaultJWT {
    avatarUrl?: string;
    accessToken: string;
    roles: any[];
    username?: string;
  }
  interface JWT extends DefaultJWT {
    id: string;
  }
}
