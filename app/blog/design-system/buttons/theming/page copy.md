# Button Theming & Variants

*Building a flexible, maintainable color system for your design system*

---

## Introduction

You've built a solid button component—it's accessible, handles loading states, and prevents duplicate submissions. But there's one problem: **it only comes in one color**.

In this guide, we'll transform your button into a **themeable component** that supports multiple variants (Primary, Secondary, Accent, Danger) and styles (Filled, Outlined, Ghost) while maintaining all the accessibility and functionality we've built.

**What you'll learn:**
- CSS custom properties for dynamic theming
- Creating color variants without duplicating code
- The `data-*` attribute pattern for variants
- Building a scalable token system

**Estimated time:** 10-12 minutes

---

## The Problem with Hard-Coded Colors

Right now, your button probably looks something like this:

```css
.button {
  background-color: #3b82f6;
  color: #ffffff;
  border: 2px solid #2563eb;
}
```

This works, but it has issues:
- **Not reusable:** Every variant needs its own class
- **Hard to theme:** Changing colors means updating multiple files
- **Not scalable:** Adding a "Danger" variant = rewriting all the CSS

---

## The CSS Custom Property Pattern

Instead of hard-coding colors, we'll use **CSS custom properties** (CSS variables) to create a flexible theming system.

### Step 1: Define Semantic Variables

First, define what our button *needs*, not what it *is*:

```css
.button {
  /* Semantic names describe purpose, not value */
  --button-bg-color: var(--color-primary-400);
  --button-text-color: var(--color-neutral-100);
  --button-border-color: var(--color-primary-600);
  --button-outline-color: var(--color-primary-600);
  
  /* Apply to properties */
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  border-color: var(--button-border-color);
  outline-color: var(--button-outline-color);
}
```

**Why this works:**
- **Separation of concerns:** Button logic is separate from color values
- **Easy overrides:** Change the custom property, not the entire rule
- **Self-documenting:** Names describe what each color does

---

## Building a Color Token System

Before creating variants, let's establish our color tokens. These are the foundation of your design system.

### Color Scale Structure

Each color family needs multiple levels for different use cases:

```css
:root {
  /* Primary (Blue) - Action colors */
  --color-primary-100: hsl(203, 31%, 95%);  /* Backgrounds */
  --color-primary-200: hsl(211, 38%, 88%);  /* Subtle borders */
  --color-primary-400: hsl(212, 75%, 40%);  /* Text & interactive (4.5:1 contrast) */
  --color-primary-600: hsl(212, 76%, 28%);  /* High contrast states */

  /* Secondary (Green) - Success/confirmation */
  --color-secondary-100: hsl(155, 33%, 93%);
  --color-secondary-200: hsl(153, 29%, 84%);
  --color-secondary-400: hsl(155, 65%, 26%);
  --color-secondary-600: hsl(155, 67%, 18%);

  /* Accent (Pink) - Emphasis */
  --color-accent-100: hsl(327, 22%, 90%);
  --color-accent-200: hsl(316, 25%, 88%);
  --color-accent-400: hsl(314, 71%, 41%);
  --color-accent-600: hsl(314, 71%, 28%);

  /* Danger (Red) - Destructive actions */
  --color-danger-200: hsl(0, 32%, 89%);
  --color-danger-400: hsl(0, 87%, 35%);
  --color-danger-600: hsl(0, 86%, 29%);

  /* Neutral - Text and UI elements */
  --color-neutral-100: #ffffff;
  --color-neutral-200: #e0e0e0;
  --color-neutral-400: hsl(0, 0%, 46%);  /* AA compliant text */
  --color-neutral-600: hsl(0, 0%, 30%);
  --color-neutral-800: hsl(0, 0%, 15%);
}
```

**Naming Convention:**
- `100-200`: Backgrounds and subtle borders (not for text)
- `400`: Primary text and interactive elements (4.5:1 contrast minimum)
- `600`: High contrast states (hover, pressed, emphasis)

> 💡 **Accessibility Note:** All `400` and `600` level colors are chosen to meet WCAG AA contrast requirements (4.5:1) against white backgrounds.

---

## Creating Style Variants

Now we'll create three button **styles**: Filled, Outlined, and Ghost.

### The Data Attribute Pattern

We use `data-style` attributes instead of classes because:
- **Clearer intent:** `data-style="filled"` is more semantic than `button--filled`
- **Easy to query:** `[data-style="filled"]` works in CSS and JavaScript
- **No specificity wars:** Data attributes have the same specificity as classes

```css
/* Default: Filled style with neutral colors */
.button {
  --button-primary-color: var(--color-neutral-100);
  --button-secondary-color: var(--color-neutral-800);
  --button-accent-color: var(--color-neutral-600);

  /* Map semantic names to actual properties */
  background-color: var(--button-secondary-color);
  color: var(--button-primary-color);
  border-color: var(--button-accent-color);
}

/* Outlined: Transparent background, colored border */
.button[data-style="outlined"] {
  --button-bg-color: var(--button-primary-color);
  --button-text-color: var(--button-secondary-color);
  --button-border-color: var(--button-accent-color);
}

/* Ghost: No border, hover shows background */
.button[data-style="ghost"] {
  --button-bg-color: transparent;
  --button-text-color: var(--button-secondary-color);
  --button-border-color: transparent;
}

.button[data-style="ghost"]:hover {
  --button-bg-color: color-mix(in srgb, var(--button-accent-color) 10%, transparent);
}
```

---

## Creating Color Variants

Now the fun part—creating Primary, Secondary, Accent, and Danger variants.

### The Key: Indirection

Notice we're not setting `background-color` directly. We're setting **semantic variables** that map to **color tokens**:

```css
/* Primary (Blue) - Main actions */
.button[data-variant="primary"] {
  --button-primary-color: var(--color-neutral-100);
  --button-secondary-color: var(--color-primary-400);
  --button-accent-color: var(--color-primary-600);
}

/* Secondary (Green) - Confirmations */
.button[data-variant="secondary"] {
  --button-primary-color: var(--color-neutral-100);
  --button-secondary-color: var(--color-secondary-400);
  --button-accent-color: var(--color-secondary-600);
}

/* Accent (Pink) - Emphasis */
.button[data-variant="accent"] {
  --button-primary-color: var(--color-neutral-100);
  --button-secondary-color: var(--color-accent-400);
  --button-accent-color: var(--color-accent-600);
}

/* Danger (Red) - Destructive actions */
.button[data-variant="danger"] {
  --button-primary-color: var(--color-neutral-100);
  --button-secondary-color: var(--color-danger-400);
  --button-accent-color: var(--color-danger-600);
}
```

### How It Works

When you combine `data-style` and `data-variant`:

```tsx
<Button data-style="outlined" data-variant="primary">
  Primary Outlined
</Button>
```

The CSS cascade works like this:
1. Base `.button` sets default semantic colors
2. `[data-variant="primary"]` overrides with primary color tokens
3. `[data-style="outlined"]` maps those to background/border/text
4. Result: Blue outlined button

**The beauty:** Adding a new style (like "soft" or "subtle") only requires defining ONE new mapping. All variants work automatically.

---

## TypeScript Support

Update your button types to include the new attributes:

```typescript
export type TVariant = 'primary' | 'secondary' | 'accent' | 'danger';
export type TButtonStyle = 'outlined' | 'filled' | 'ghost';

export type BaseButtonProps = {
  disabled?: boolean;
  isLoading?: boolean;
  icon?: IconProps['icon'];
  'data-style'?: TButtonStyle;
  'data-variant'?: TVariant;
  onClick?: ButtonClickHandler;
} & Omit<ComponentPropsWithRef<'button'>, 'onClick' | 'disabled'>;
```

Now TypeScript will autocomplete and validate your variants!

---

## Usage Examples

### All Combinations

```tsx
{/* Filled variants (default style) */}
<Button data-variant="primary">Save</Button>
<Button data-variant="secondary">Confirm</Button>
<Button data-variant="accent">Subscribe</Button>
<Button data-variant="danger">Delete</Button>

{/* Outlined variants */}
<Button data-style="outlined" data-variant="primary">Edit</Button>
<Button data-style="outlined" data-variant="secondary">Add</Button>

{/* Ghost variants */}
<Button data-style="ghost" data-variant="primary">Learn More</Button>
<Button data-style="ghost" data-variant="danger">Cancel</Button>

{/* With icons */}
<Button data-variant="primary" icon={RiSaveLine}>
  Save Changes
</Button>

{/* Loading states maintain variant colors */}
<Button data-variant="secondary" isLoading>
  Processing...
</Button>
```

---

## Handling Disabled States

Disabled buttons should look obviously non-interactive, regardless of variant:

```css
.button:is(:disabled, [aria-disabled="true"]),
.button[data-variant]:is(:disabled, [aria-disabled="true"]),
.button[data-style]:is(:disabled, [aria-disabled="true"]) {
  /* Override all variants when disabled */
  --button-bg-color: var(--color-neutral-200);
  --button-text-color: var(--color-neutral-800);
  --button-border-color: var(--color-neutral-400);
  cursor: not-allowed;
}
```

The `:is()` selector ensures disabled styles always win, no matter how many `data-*` attributes are applied.

---

## Interactive States

Each variant needs hover, focus, and active states:

```css
.button:hover {
  outline: 1px solid var(--button-outline-color);
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

.button:focus-visible {
  outline: 2px solid var(--button-outline-color);
  outline-offset: var(--spacing);
}

.button:active,
.button[data-pressed="true"] {
  outline: 1px dotted var(--button-outline-color);
  transform: translateY(1px);
}
```

Because we're using `var(--button-outline-color)`, these states automatically adapt to each variant's colors!

---

## Building a Visual Reference

Create a showcase page to see all variants:

```tsx
export function ButtonShowcase() {
  const variants: TVariant[] = ['primary', 'secondary', 'accent', 'danger'];
  const styles: TButtonStyle[] = ['filled', 'outlined', 'ghost'];

  return (
    <div className="grid gap-8">
      {styles.map(style => (
        <section key={style}>
          <h3>{style} Buttons</h3>
          <div className="flex gap-4">
            {variants.map(variant => (
              <Button 
                key={variant}
                data-style={style}
                data-variant={variant}
              >
                {variant}
              </Button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
```

---

## Adding New Variants

Want to add a "warning" variant? Just add the color tokens:

```css
:root {
  --color-warning-200: hsl(45, 93%, 88%);
  --color-warning-400: hsl(45, 93%, 47%);
  --color-warning-600: hsl(45, 93%, 35%);
}

.button[data-variant="warning"] {
  --button-primary-color: var(--color-neutral-100);
  --button-secondary-color: var(--color-warning-400);
  --button-accent-color: var(--color-warning-600);
}
```

Update your TypeScript types:

```typescript
export type TVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'warning';
```

Done! The new variant works with all three styles automatically.

---

## Dark Mode Support

The custom property pattern makes dark mode straightforward:

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Adjust color tokens for dark backgrounds */
    --color-primary-400: hsl(212, 85%, 55%);  /* Lighter for contrast */
    --color-neutral-100: hsl(0, 0%, 10%);     /* Dark background */
    --color-neutral-800: hsl(0, 0%, 95%);     /* Light text */
  }
}
```

All your buttons automatically adapt because they reference tokens, not hard-coded colors.

---

## Summary

**What we built:**
- ✅ Flexible theming system using CSS custom properties
- ✅ Three button styles (Filled, Outlined, Ghost)
- ✅ Four color variants (Primary, Secondary, Accent, Danger)
- ✅ Type-safe variant props
- ✅ Accessible disabled states
- ✅ Easy to extend (adding variants takes ~5 lines)

**Key Principles:**
1. **Semantic variables** describe purpose, not appearance
2. **Color tokens** are your single source of truth
3. **Data attributes** are cleaner than class naming conventions
4. **Indirection** makes variants composable and scalable

---

## What's Next

Now that you have a themeable button, consider:
- **Button Groups** - Managing multiple buttons with shared styling
- **Icon Buttons** - Buttons with only icons (no text)
- **Loading Variants** - Different spinner styles per variant
- **Theme Builder** - Let users customize your design tokens

---

## Complete Code

All the code from this article is available in the Resources section below, including:
- Full CSS with all variants
- TypeScript type definitions
- React component with variant support
- Color token system

**Related Articles:**
- [Building Your First Button](link) - Foundation and accessibility
- [Advanced Button Patterns](link) - Async handling and testing
- [Button Groups & Toolbars](link) - Coming next