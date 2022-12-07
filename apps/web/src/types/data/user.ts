import { BaseResponse } from './response';
import { User } from 'next-auth';

export interface UserResponse extends BaseResponse {
  data: UserData;
}

export interface UserLoginResponse extends BaseResponse {
  data: {
    accessToken: string;
    user: UserData;
  };
}

export interface ResendVerifyEmailResponse extends BaseResponse {
  data: boolean;
}

export interface UserData {
  id?: string;
  email?: string;
  username?: string;
  status?: string;
  bannerUrl?: any;
  avatarUrl?: string;
  last_name?: string;
  first_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateUserInput extends User {
  username?: string;
  email?: string;
  avatarUrl?: any;
  bannerUrl?: any;
  bio?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  medium?: string;
  wallets?: any[];
}
