## 🛠 About This Project

This application serves as a **technical showcase and a development playground**. While my primary commercial work is protected by **strict NDAs**, this project is an open-source demonstration of my architectural approach, coding standards, and mastery of the modern Next.js ecosystem.

It is designed as a **continuous learning sandbox** where I implement and refine advanced full-stack patterns—from rigorous server-side security to complex state management—ensuring every feature adheres to industry best practices before being applied in production environments.

### 🚀 Tech Stack

A high-performance blogging platform demo built with Next.js 16+, focusing on server-side efficiency, robust data validation, and a seamless user experience.

- Framework: [Next.js](https://nextjs.org) (App Router) – Leveraging Server Components, Streaming, and Server Actions.
- Database: [Neon](https://neon.com) (PostgreSQL) – Serverless Postgres with instant branching.
- ORM: [Prisma](https://www.prisma.io) – Type-safe database client and migrations.
- Styling: SCSS Modules – Encapsulated styles with mixins and custom design tokens.
- Validation: [Zod](https://zod.dev) – Strict schema validation for Server Actions.
- Editor: [Quill](https://quilljs.com) – Powerful Rich Text editor for content creation.

## ✨ Key Features

### 🔔 Custom Alert System

Developed a specialized notification engine using React Context and useReducer.

- Anti-Spam Logic: Integrated isPending state blocking to prevent duplicate notifications during rapid interactions.
- Smart Auto-dismiss: Alerts persist for 6 seconds with manual close support.
- Flash Messages: Reliable notification delivery across page redirects via Server Actions and client-side state synchronization.

### 🌓 Advanced Theming (Dark Mode)

- Zero-Flash Injection: Implemented a blocking inline script in the <head> to prevent the "white flash" (FOUC) during initial page loads.
- Persistence: Automatic user preference synchronization with localStorage.

### ♿ Accessibility (WAI-ARIA)

Designed with inclusivity and standard web patterns in mind:

- Keyboard Navigation: Full support for Esc key modal closing and Tab focus management.
- Semantic HTML: Strict adherence to HTML5 structural tags and ARIA roles.
- Hydration Safety: Used suppressHydrationWarning to manage theme mismatches gracefully.

### 🎨 Custom Design & Performance

- Original UI: A unique visual identity built from scratch without pre-made UI kits.
- Responsive Layout: Mobile-first architecture with custom breakpoints synchronized across JS and SCSS.
- Layout Stability: Skeleton loaders prevent layout shifts (CLS) during data fetching.

### 🛡 Security & Server-Side Validation

- End-to-End Type Safety: Used TypeScript interfaces and Prisma-generated types to ensure data consistency from the database layer to the UI components.
- Schema Enforcement: Zod validation layers in Server Actions reject malformed requests that bypass client-side HTML restrictions.
- HTML Sanitization: All editor content is processed via sanitize-html on the server before database persistence, neutralizing XSS threats while maintaining formatting.

### 🧪 Test Suite & Quality Assurance

The project features an Integration Testing strategy focused on user outcomes and UI reliability.

- Runner: [Vitest](https://vitest.dev) for high-performance execution and seamless Vite integration.
- DOM Testing: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for interacting with components as a user would.
- User Simulation: user-event to handle realistic keyboard and mouse interactions.
- Environment: [Happy DOM](https://github.com/capricorn86/happy-dom) to provide a browser-like Web API layer in Node.js.
- Mocking: Custom global setup for Server Actions and third-party Rich Text Editors using Vitest's mocking engine.
- Assertions: jest-dom for descriptive, "human-readable" expectations (e.g., .toBeInTheDocument()).
