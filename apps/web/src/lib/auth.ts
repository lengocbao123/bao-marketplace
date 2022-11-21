export const refreshUserProfile = (isReload = true) => {
  return fetch('/api/auth/session?update=true').then(() => {
    if (!isReload) {
      return;
    }
    window.location.reload();
  });
};
