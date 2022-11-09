export const redirectIfAuthenticated = () => ({
  redirect: {
    destination: '/',
    permanent: false,
  },
});

export const redirectIfUnverified = () => ({
  redirect: {
    destination: '/auth/verify-request',
    permanent: false,
  },
});
