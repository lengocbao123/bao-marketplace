export const copyToClipboard = (data: any, onSuccess?: () => void, onError?: () => void) => {
  navigator.clipboard.writeText(data).then(
    () => onSuccess?.(),
    () => {
      onError?.();
    }
  );
};

const getUrlExtension = (url: any) => {
  return url.split(/[#?]/)[0].split('.').pop().trim();
};

export const convertImageUrlToFile = (urlImage: string) => {
  try {
    const imgExt = getUrlExtension(urlImage);
    const fileName = new Date().toDateString();

    return fetch(urlImage).then(async (response) => {
      const blob = await response.blob();

      return new File([blob], `${fileName}.${imgExt}`, {
        type: blob.type
      });
    });
  } catch (error) {
    console.warn(error);

    return null;
  }
};
