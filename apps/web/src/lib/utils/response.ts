// is message from server success or not
import { isString } from 'next/dist/build/webpack/plugins/jsconfig-paths-plugin';

export const isSuccess = (message?: string | null | string[]) => {
  if (message && isString(message)) {
    return message.toLowerCase().includes('success');
  }

  return false;
};
