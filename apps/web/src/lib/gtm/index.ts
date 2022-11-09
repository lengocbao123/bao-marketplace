import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const GTM_ID = publicRuntimeConfig.googleTagManagerId;

export const pageView = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
};
