// is message from server success or not
export const isSuccess = (message?: string | null) => {
  if (message) {
    return message.toLowerCase().includes('success');
  }

  return false;
};
