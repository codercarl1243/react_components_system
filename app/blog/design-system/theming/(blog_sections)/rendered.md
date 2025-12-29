# Building a Theming System

***A Practical Implementation Guide***

In the previous posts, we focused on architecture and enforcement.

* **Post 1** introduced a layered token model and explained *why* styling systems break without clear boundaries.
* **Post 2** introduced primitives and showed *how* those boundaries can be enforced structurally.

This post is different.

Here, we’ll build the system step by step.

This is a practical, implementation‑focused deep dive. We’ll write real code, make concrete decisions, and look at how the theory from earlier posts translates into something you can actually ship.

If you’re looking for the *why*, start with the earlier posts. If you want to know *how this is built*, you’re in the right place.

---

## What We’re Building

By the end of this post, we’ll have:

* a theme system built on CSS custom properties
* semantic variant tokens that don’t encode presentation
* appearance mappings that sit cleanly on top of variants
* explicit paint channels to control where styling is applied
* a working light / dark theme switch
* a Button component that consumes the system instead of re‑implementing it

Everything we build here is framework‑agnostic at the styling layer. React is used as a consumer, not as the owner of the design system.

---

## Step 1: Defining the Token Layers

We’ll start by defining the same four layers introduced in Post 1:

* **Theme** — the visual environment
* **Variant** — semantic intent
* **Appearance** — visual treatment
* **Paint** — explicit application

At this stage, we are not thinking about components. We are only defining vocabulary and contracts.

---

## Step 2: Define Structural Components

Components define *what* styling properties they can use, but they do not decide *when* those styles are applied. That responsibility belongs to **paint**.

At the component level, we focus only on structure: spacing, typography, layout, and interaction affordances. No color, background, or border styling is applied here.

```css
/* Button Component */
.button {
  /* Structural styling only */
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  font-weight: 500;
  cursor: pointer;

  /* No background, color, or border applied here */
  /* Paint will handle that based on data-paint */
}
```

That’s it. The button defines its shape and behavior. Color and visual treatment come later.

### The Paint Boundary

This separation is critical. If components applied `background: var(--background-color)` directly, every component would need its own paint logic.

Instead, paint is centralized. One set of selectors handles all components:

```css
.block[data-paint~="background"] { background-color: var(--background-color); }
.block[data-paint~="foreground"] { color: var(--foreground-color); }
.block[data-paint~="border"] { border-color: var(--border-color); }
```

Components extend `.block` and inherit paint behavior automatically.

In the next step, we’ll define the **variant** layer that provides those semantic tokens.

---

## Step 3: Semantic Variant Tokens

Next, we’ll define variant tokens that describe *meaning*, not presentation.

Variants like `primary`, `danger`, and `success` will expose consistent semantic values that appearances can consume later.

This section will cover:

* why variants should not encode visuals
* defining variant token contracts
* keeping variant sets intentionally small
* handling emphasis and contrast at the token level

---

## Step 4: Appearance Mappings

With variants in place, we’ll layer appearance on top.

Appearances such as `filled`, `outlined`, and `ghost` will map variant tokens to actual CSS properties like background, border, and text color.

This section will cover:

* mapping one variant to multiple appearances
* avoiding duplication across appearances
* keeping appearance logic centralized
* testing visual treatments across themes

Side‑by‑side examples will show how the same variant behaves under different appearances.

---

## Step 5: Paint Channels

Paint is where many systems fall apart — and where this one becomes explicit.

We’ll introduce paint channels to control *where* styling is applied, rather than letting it happen implicitly.

This section will cover:

* defining paint channels (foreground, surface, border)
* preventing style leakage
* making styling opt‑in
* validating paint combinations

Before‑and‑after examples will demonstrate how paint prevents accidental visual inheritance.

---

## Step 6: Wiring Tokens Together

Once all layers exist independently, we’ll wire them together.

This section focuses on:

* how theme, variant, appearance, and paint interact
* ordering and precedence
* avoiding circular dependencies
* keeping the system predictable

At this point, the design system exists — even without components.

---

## Step 7: Consuming the System in Components

Now we’ll introduce React as a consumer.

Components should not own styling decisions. Instead, they forward intent into the system and let tokens and primitives do the work.

Below is a simplified example of a foundational primitive used to consume the styling contract:

```tsx
function Block({ 
  as, 
  variant, 
  variantAppearance, 
  paint, 
  className, 
  children, 
  ...props 
}) {
  const Component = as || "div";

  // Validate paint combinations (dev-only)
  // Normalize paint prop to attribute string
  // Handle text node wrapping for layout consistency
  // (See full implementation on GitHub)

  return (
    <Component
      className={clsx("block", className)}
      data-variant={variant}
      data-appearance={variantAppearance}
      data-paint={paint}
      {...props}
    >
      {children}
    </Component>
  );
}
```

The implementation details live in small utilities, but the core idea remains simple: map explicit props to data attributes and let CSS do the work. React becomes a consumer of the system, not the place where styling logic lives.

---

## Step 8: Building a Button on Top of the System

We’ll build a Button component that:

* consumes variant, appearance, and paint
* provides sensible defaults
* supports polymorphism
* adds behavior without breaking boundaries

The Button acts as a proving ground for the entire system.

If the Button stays small and predictable, the architecture is working.

---

## Accessibility Considerations

We’ll briefly address accessibility concerns where they naturally arise:

* contrast implications of theme tokens
* focus styles and visibility
* avoiding implicit color inheritance

This is not an exhaustive accessibility guide, but a practical look at how architectural decisions affect outcomes.

---

## Putting It All Together

At the end of this post, you should have a complete picture:

* why the system is structured the way it is
* how the layers fit together
* how components consume the system safely

More importantly, you should be able to adapt these ideas to your own stack — whether you’re using React, another framework, or none at all.

---

## Further Reading

* Design System Foundations — Tokens, Intent, and Explicit Styling
* Primitive Components — Structure, Boundaries, and Composition
