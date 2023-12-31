/* ---------------------------------------------------------------------------------------------------------------------
 * Window
 * ------------------------------------------------------------------------------------------------------------------ */
declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

/* ---------------------------------------------------------------------------------------------------------------------
 * SVG
 * ------------------------------------------------------------------------------------------------------------------ */
declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const SVG: FC<SVGProps<SVGSVGElement>>;

  export default SVG;
}
