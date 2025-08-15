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

<pre class="font-ui border-border-100/50 overflow-x-scroll w-full rounded border-[0.5px] shadow-[0_2px_12px_hsl(var(--always-black)/5%)]"><table class="bg-bg-100 min-w-full border-separate border-spacing-0 text-sm leading-[1.88888] whitespace-normal"><thead class="border-b-border-100/50 border-b-[0.5px] text-left"><tr class="[tbody>&]:odd:bg-bg-500/10"><th class="text-text-000 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] px-2 [&:not(:first-child)]:border-l-[0.5px]">Component</th><th class="text-text-000 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] px-2 [&:not(:first-child)]:border-l-[0.5px]">Status</th><th class="text-text-000 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] px-2 [&:not(:first-child)]:border-l-[0.5px]">Video</th><th class="text-text-000 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] px-2 [&:not(:first-child)]:border-l-[0.5px]">Blog Post</th><th class="text-text-000 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] px-2 [&:not(:first-child)]:border-l-[0.5px]">Features</th></tr></thead><tbody><tr class="[tbody>&]:odd:bg-bg-500/10"><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]"><a class="underline" href="./components/button">Button</a></td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">✅ Complete</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]"><a class="underline" href="link">Watch →</a></td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]"><a class="underline" href="link">Read →</a></td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">Base component with variants, loading states, full accessibility</td></tr><tr class="[tbody>&]:odd:bg-bg-500/10"><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]"><a class="underline" href="./components/button/ToggleButton.tsx">ToggleButton</a></td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">🚧 In Progress</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">Coming Soon</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">Coming Soon</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">Toggle functionality, pressed states, smooth animations</td></tr><tr class="[tbody>&]:odd:bg-bg-500/10"><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">Switch</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">📋 Planned</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td></tr><tr class="[tbody>&]:odd:bg-bg-500/10"><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">Card</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">📋 Planned</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td></tr><tr class="[tbody>&]:odd:bg-bg-500/10"><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">Link</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">📋 Planned</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td></tr><tr class="[tbody>&]:odd:bg-bg-500/10"><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">Modal</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">📋 Planned</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td></tr><tr class="[tbody>&]:odd:bg-bg-500/10"><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">Tab Panels</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">📋 Planned</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">-</td></tr></tbody></table></pre>

**Legend:** ✅ Complete | 🚧 In Progress | 📋 Planned


## 🏗️ Architecture

### Component Structure

Each component follows a consistent structure:

```
components/
└── [component-name]/
    ├── index.tsx            		# Main component export
    ├── [Component].tsx    		# Component implementation  
    ├── use[Component].ts  		# Custom hook for logic
    ├── [component].types.ts 		# TypeScript definitions
    └── [Component].[variant].tsx       # Component variants
tests/
   └── components/
	└──[component-name]/
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

```css
	/* Primary (Blue) */
        --color-primary-200: hsl(212, 61%, 78%);
        --color-primary-400: hsl(212, 70%, 50%);
        --color-primary-600: hsl(212, 85%, 22%);

        /* Secondary (Green) */
        --color-secondary-200: hsl(150, 61%, 78%);
        --color-secondary-400: hsl(150, 55%, 45%);
        --color-secondary-600: hsl(150, 80%, 20%);

        /* Accent (Purple) */
        --color-accent-200: hsl(314, 70%, 78%);
        --color-accent-400: hsl(314, 80%, 50%);
        --color-accent-600: hsl(314, 80%, 24%);

        /* Neutral colors */
        --color-neutral-100: hsl(0, 0%, 100%);
        --color-neutral-200: hsl(0, 0%, 88%);
        --color-neutral-300: hsl(0, 0%, 70%);
        --color-neutral-400: hsl(0, 0%, 50%);
        --color-neutral-600: hsl(0, 0%, 30%);
        --color-neutral-800: hsl(0, 0%, 15%);
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
