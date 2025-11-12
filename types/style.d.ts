export {}; // treat as module, prevents global pollution

declare global {
  interface CSSProperties {
    /** Allow any CSS custom property, e.g. --color-primary, --radius-lg */
    [key: string]: string | number;
  }
}
