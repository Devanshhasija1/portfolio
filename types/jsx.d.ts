import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    linefade?: string;
    hoverstagger?: string;
    'letter-fade'?: string;
    'text-split'?: string;
    welcome?: string;
    playground?: string;
    drag?: string;
    'preloader-wrapper'?: string;
    'js-scrollflip-element'?: string;
    'fs-hacks-element'?: string;
  }
}
