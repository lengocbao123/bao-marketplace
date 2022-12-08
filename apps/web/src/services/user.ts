import { UpdateUserInput, UserLoginResponse, UserResponse } from 'types/data';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const login = (username: string, password: string): Promise<UserLoginResponse> => {
  return fetch(`${publicRuntimeConfig.apiBaseUrl}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      return error;
    });
};

export const register = (
  username: string,
  email: string,
  password: string,
  passwordConfirm: string,
): Promise<UserResponse> => {
  return fetch(`${publicRuntimeConfig.apiBaseUrl}/auth/register`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ username, password, email, passwordConfirm }),
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      return error;
    });
};

export const getUserInfo = (accessToken: string): Promise<UserResponse> => {
  return fetch(`${publicRuntimeConfig.apiBaseUrl}/user`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      return error;
    });
};

export const resendVerifyEmail = (email: string) => {
  return fetch(`${publicRuntimeConfig.apiBaseUrl}/auth/resend-verify-email`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ email }),
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      return error;
    });
};

export const updateUserInfo = (input: UpdateUserInput, accessToken): Promise<UserResponse> => {
  return fetch(`${publicRuntimeConfig.apiBaseUrl}/user-info`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(input),
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      return error;
    });
};
