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
  avatar?: string;
  lastName?: string;
  firstName?: string;
  created_at?: string;
  updated_at?: string;
  socialAccount?: {
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    medium?: string;
  };
}

export interface UpdateUserInput extends User {
  wallets?: any[];
  avatar?: any;
}
