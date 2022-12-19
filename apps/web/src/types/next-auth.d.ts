import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultSession['user'] {
    id?: string;
    lastName?: string;
    firstName?: string;
    accessToken: string;
    status?: string;
    username?: string;
    socialAccount?: {
      website?: string;
      facebook?: string;
      twitter?: string;
      instagram?: string;
      medium?: string;
    };
    avatar?: string;
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface DefaultJWT {
    accessToken?: string;
    status?: string;
    username?: string;
    email?: string;
    lastName?: string;
    firstName?: string;
    socialAccount?: {
      website?: string;
      facebook?: string;
      twitter?: string;
      instagram?: string;
      medium?: string;
    };
    avatar?: string;
  }

  interface JWT extends DefaultJWT {
    id: string;
  }
}
