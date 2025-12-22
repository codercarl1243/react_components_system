export const CODE_MAP = {
  primary_filled: {
    tokens: ["primary", "filled"],
    code: `<button class="button" data-variant="primary" data-appearance="filled">
  Primary Filled
</button>`,
  },
  secondary_ghost: {
    tokens: ["secondary", "ghost"],
    code: `<button class="button" data-variant="secondary" data-appearance="ghost">
  Secondary Ghost
</button>`,
  },
  accent_outlined: {
    tokens: ["accent", "outlined"],
    code: `<button class="button" data-variant="accent" data-appearance="outlined">
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
