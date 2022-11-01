// Redirect to login page
export const redirectIfUnauthenticated = () => ({
  redirect: {
    destination: '/auth/sign-in',
    permanent: false
  }
});

export const redirectIfAuthenticated = () => ({
  redirect: {
    destination: '/',
    permanent: false
  }
});
