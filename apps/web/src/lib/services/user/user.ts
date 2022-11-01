import getConfig from 'next/config';
import { UserResponse } from '../../../types';
const { publicRuntimeConfig } = getConfig();

export const login = (username: string, password: string) => {
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
