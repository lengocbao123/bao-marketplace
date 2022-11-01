export const getErrorMessage = (error: any) => {
  if (typeof error === 'string') {
    return error;
  }

  if (error.reason) {
    return error.reason;
  }

  return error.message;
};
