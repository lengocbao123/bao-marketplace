import { BaseResponse } from './response';

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
  avatarUrl?: string;
}
