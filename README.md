# React Components System

**⚠️⚠️⚠️ WARNING - Current Work in Progress. Some or most of the links in this guide will not work at present. ⚠️⚠️⚠️**

A complete design system built in React, focusing on accessibility, flexibility, and real-world production use.

> ℹ️ Each component includes comprehensive documentation, tests, and linked tutorials

## About This Series

This repository accompanies the Coder Carl YouTube series where we build a production-ready design system from scratch. Each component is designed to be:

**Accessible by default** - WCAG 2.1 AA compliant with full keyboard navigation
**Flexible & composable** - Built to extend and customize for your needs
**Type-safe** - Full TypeScript support with comprehensive type definitions
**Well-tested** - Unit tests with high coverage for reliability
**Performance-focused** - Optimized for bundle size and runtime performance

The purpose of this series is to create a design system in React. We'll explore basic components like Buttons, Links, Cards, and more.
As a component is added to the repo I will link to its' blog post and youtube video.

If you notice any issues that are not addressed - feel free to raise an issue 👆

If you appreciate the work feel free to star the repo and refer the post/video as these will help me.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/[username]/react-components-system
cd react-components-system

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Components

<details open>
<summary><strong>🔘 Interactive Elements</strong></summary>

| Component | Status | Video | Blog | Features |
|-----------|--------|-------|------|----------|
| [Button](./components/button)                        | ✅ Complete    | [Watch →](link)     | [Read →](link)            | Base component, variants, loading states |
| [ToggleButton](./components/button/ToggleButton.tsx) | 🚧 In Progress | Coming Soon         | Coming Soon               | Toggle functionality, pressed states |
| Switch | 📋 Planned | - | - | Toggle with sliding animation |
| Link | 📋 Planned | - | - | Accessible links with variants |

</details>

**Legend:** ✅ Complete | 🚧 In Progress | 📋 Planned

## 🏗️ Architecture

### Component Structure

Each component follows a consistent structure:

```
components/
└── [component-name]/
    ├── index.tsx            		          # Main component export
    ├── [Component].tsx    		            # Component implementation  
    ├── use[Component].ts  		            # Custom hook for logic
    ├── [component].types.ts 		          # TypeScript definitions
    └── [Component].[variant].tsx         # Component variants
tests/
   └── components/
	      └──[component-name]/
          ├── [component].test.tsx 		    # Component unit and integration tests
          └── use[Component].test.tsx     # Hook unit tests
styles/
    └── components/
        └── [component].css # Styling
```

### Design Principles

* **Composition over inheritance** - Components build on each other
* **CSS Custom Properties** - Easy theming and variant creation
* **Data attributes** - Clean separation of styling and behavior
* **Progressive enhancement** - Works without JavaScript
* **Mobile-first responsive** - Designed for all device sizes

## 🎨 Styling System

### CSS Architecture

* **CSS Layers** for proper cascade management
* **Custom Properties** for dynamic theming
* **Logical Properties** for international layouts
* **Container Queries** for truly responsive components

### Color System

**Usage Guidelines:**
* **200 level**: Background fills, subtle borders (not suitable for text)
* **400 level**: Primary text, hover states, medium emphasis borders  
* **600 level**: High contrast text, pressed states, strong emphasis

### Quick Reference

| Level | Purpose | Min Contrast | Use Cases |
|-------|---------|--------------|-----------|
| 200 | Backgrounds | 3.0:1 | Fills, subtle borders |
| 400 | Standard text | 4.5:1 | Body text, interactive elements |
| 600 | High emphasis | 7.0:1+ | Headings, pressed states |

> ℹ️ **Contrast ratios listed below are against white (#ffffff)**  
> Colors at 400 and 600 levels have been chosen to ensure a minimum contrast ratio of 4.5:1, meeting WCAG AA requirements.  
> For neutral color pairing, consider: 800 & 100 (15.7:1) or 600 & 200 (6.4:1)

```css
/* Primary (Blue) */
--color-primary-200: hsl(212, 61%, 61%);    /* 3.1:1  - backgrounds only */
--color-primary-400: hsl(212, 70%, 48%);    /* 5.3:1  - AA compliant text */
--color-primary-600: hsl(212, 85%, 22%);    /* 12.9:1 - high contrast text */

/* Secondary (Green) */
--color-secondary-200: hsl(154, 20%, 52%);  /* 3.3:1  - backgrounds only */
--color-secondary-400: hsl(155, 45%, 35%);  /* 5.9:1  - AA compliant text */
--color-secondary-600: hsl(154, 80%, 20%);  /* 12.7:1 - high contrast text */

/* Accent (Purple) */
--color-accent-200: hsl(314, 20%, 55%);     /* 3.2:1  - backgrounds only */
--color-accent-400: hsl(314, 80%, 47%);     /* 5.2:1  - AA compliant text */
--color-accent-600: hsl(314, 80%, 24%);     /* 9.3:1  - high contrast text */

/* Neutral colors */
--color-neutral-100: hsl(0, 0%, 100%);      /* 1.0:1  - white background */
--color-neutral-200: hsl(0, 0%, 88%);       /* 1.6:1  - light backgrounds */
--color-neutral-300: hsl(0, 0%, 70%);       /* 2.6:1  - subtle borders */
--color-neutral-400: hsl(0, 0%, 46%);       /* 4.6:1  - AA compliant text */
--color-neutral-600: hsl(0, 0%, 30%);       /* 8.5:1  - high contrast text */
--color-neutral-800: hsl(0, 0%, 15%);       /* 15.7:1 - strongest contrast */
```

### Example combinations:
```css
/* 12.9:1 ratio */
.primary-text-on-light { 
  color: var(--color-primary-600);
  background: var(--color-neutral-100); 
}

/* 15.7:1 ratio */
.neutral-card {
  color: var(--color-neutral-800);     
  background: var(--color-neutral-100);
}
/* 5.9:1 ratio - use for changes in state only. The contrast meets AA standard only.*/
.secondary-button-hover {
  color: var(--color-neutral-100);
  background: var(--color-secondary-400); 
}
```

## ♿ Accessibility Features

* **WCAG 2.1 AA compliance** - Minimum 4.5:1 color contrast
* **44px minimum touch targets** - Mobile-friendly interaction areas
* **Keyboard navigation** - Full functionality without mouse
* **Screen reader support** - Proper ARIA attributes and semantic markup
* **Reduced motion respect** - Honors `prefers-reduced-motion`
* **Focus management** - Clear, visible focus indicators

## 🧪 Testing Strategy

* **Unit tests** with Jest and React Testing Library
* **Accessibility tests** with jest-axe
* **Visual regression tests** (planned)
* **Cross-browser testing** (planned)

bash

```bash
To run tests:
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 🛠️ Development

### Prerequisites

* Node.js 18+
* npm or yarn

### Tech Stack

* **React 19** - Latest features and performance improvements
* **TypeScript** - Type safety and better developer experience
* **Next.js** - Development environment and SSR support
* **Jest & React Testing Library** - Testing framework
* **CSS Modules** - Scoped styling

### Available Scripts

bash

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 📚 Learning Resources

### Essential Reading

* [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
* [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
* [React TypeScript Best Practices](https://react-typescript-cheatsheet.netlify.app/)

### Tools Used

* [RemixIcon](https://remixicon.com/) - Icon library
* [clsx](https://github.com/lukeed/clsx) - Conditional class names
* [Jest](https://jestjs.io/) - Testing framework

## 🤝 Contributing

Found an issue or want to contribute?

1. **Issues** - Report bugs or request features using GitHub issues
2. **Pull Requests** - Contributions welcome! Please read our [contributing guide](./CONTRIBUTING.MD "./CONTRIBUTING.MD") first
3. **Discussions** - Have questions? Start a discussion

## 📖 Documentation

Detailed documentation for each component is available in their respective directories. Each includes:

* Usage examples
* Props API reference
* Accessibility considerations
* Customization guide
* Migration notes

## 🌟 Support the Project

If this helps you build better accessible components:

* ⭐ **Star the repository**
* 👍 **Like the YouTube videos**
* 🔗 **Share with your team**
* 💬 **Leave feedback and suggestions**

Your support helps create more content like this!

## 📄 License

MIT License - feel free to use this code in your projects.

---

**Coder Carl** | [YouTube](link) | [Blog](link) | [Twitter](link)

*Building accessible, maintainable React components one video at a time.*
