import getConfig from 'next/config';
import { UserLoginResponse, UserResponse } from '../../../types';
const { publicRuntimeConfig } = getConfig();

export const login = (username: string, password: string): Promise<UserLoginResponse> => {
  return fetch(publicRuntimeConfig.apiBaseUrl + '/auth/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
    .then((response) => {
      return response.json();
    })
    .then((data: UserLoginResponse) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const register = (email: string, password: string, passwordConfirm: string): Promise<UserResponse> => {
  return fetch(publicRuntimeConfig.apiBaseUrl + '/auth/register', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ username: email, password, email, passwordConfirm })
  })
    .then((response) => {
      return response.json();
    })
    .then((data: UserResponse) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getUserInfo = (accessToken: string): Promise<UserResponse> => {
  return fetch(publicRuntimeConfig.apiBaseUrl + '/user', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((data: Promise<UserResponse>) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const resendVerifyEmail = (email: string, accessToken: string) => {
  return fetch(publicRuntimeConfig.apiBaseUrl + '/auth/resend-verify-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({ email })
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
