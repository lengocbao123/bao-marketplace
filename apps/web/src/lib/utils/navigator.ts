export const copyToClipboard = (data: any, onSuccess?: () => void, onError?: () => void) => {
  navigator.clipboard.writeText(data).then(
    () => onSuccess?.(),
    () => {
      onError?.();
    }
  );
};
