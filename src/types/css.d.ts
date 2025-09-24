// Type declarations for importing CSS/SCSS and CSS modules
// This file allows side-effect imports like `import './globals.css'` in TS projects

declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';

// CSS Modules (typed as record of className -> string)
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
