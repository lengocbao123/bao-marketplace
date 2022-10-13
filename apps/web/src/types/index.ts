import { FC, SVGProps } from 'react';

export type SVG = FC<SVGProps<SVGSVGElement>>;

export interface UserForm<T, R> {
  show?: boolean;

  onSuccess?: (formData: T, response?: R) => void;

  onError?: (error: any) => void;
}
