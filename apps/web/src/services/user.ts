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
  const body = new FormData();
  body.append('firstName', input.firstName);
  body.append('lastName', input.lastName);
  body.append('avatar', input.avatar);
  body.append('socialAccount.website', input.socialAccount.website);
  body.append('socialAccount.facebook', input.socialAccount.facebook);
  body.append('socialAccount.twitter', input.socialAccount.twitter);
  body.append('socialAccount.instagram', input.socialAccount.instagram);
  body.append('socialAccount.medium', input.socialAccount.medium);

  return fetch(`${publicRuntimeConfig.apiBaseUrl}/user/update-info`, {
    method: 'PUT',
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body,
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      return error;
    });
};
