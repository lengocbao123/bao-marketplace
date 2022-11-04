import { fetcher } from 'lib/utils/fetcher';
import { ResendVerifyEmailResponse, UserLoginResponse, UserResponse } from 'types/data';

export const login = (username: string, password: string): Promise<UserLoginResponse> => {
  return fetcher<UserLoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const register = (email: string, password: string, passwordConfirm: string): Promise<UserResponse> => {
  return fetcher<UserResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username: email, password, email, passwordConfirm })
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getUserInfo = (): Promise<UserResponse> => {
  return fetcher<UserResponse>('/user', {})
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const resendVerifyEmail = (email: string) => {
  return fetcher<ResendVerifyEmailResponse>('/auth/resend-verify-email', {
    method: 'POST',
    body: JSON.stringify({ email })
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
