export const CODE_MAP = {
  primary_filled: {
    code: `<button 
  class="button" 
  data-variant="primary" 
  data-appearance="filled" 
  data-paint="all"
  >
  Primary Filled
</button>`,
  },
  secondary_ghost: {
    code: `<button 
  class="button" 
  data-variant="secondary" 
  data-appearance="ghost" 
  data-paint="all"
  >
  Secondary Ghost
</button>`,
  },
  accent_outlined: {
    code: `<button 
  class="button" 
  data-variant="accent" 
  data-appearance="outlined" 
  data-paint="all"
>
  Accent Outlined
</button>`,
  },
} as const;

export type CodeKey = keyof typeof CODE_MAP;

export const keys: CodeKey[] = [
  "primary_filled",
  "secondary_ghost",
  "accent_outlined",
];
