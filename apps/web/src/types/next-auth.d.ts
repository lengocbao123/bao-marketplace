import { Maybe, Scalars } from '@/lib/graphql/generated/graphql';
import { DataUserRolesItems } from '@/types/index';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultSession['user'] {
    roles: Array<Maybe<DataUserRolesItems>>;
    id: Scalars['ID'];
    accessToken: string;
    status: string;
    username?: Maybe<Scalars['String']>;
    avatarUrl?: Maybe<Scalars['String']>;
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface DefaultJWT {
    avatarUrl?: Maybe<Scalars['String']>;
    accessToken: string;
    roles: Array<Maybe<DataUserRolesItems>>;
    username?: Maybe<Scalars['String']>;
  }
  interface JWT extends DefaultJWT {
    id: Scalars['ID'];
  }
}
