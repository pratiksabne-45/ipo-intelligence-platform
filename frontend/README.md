# Indian IPO Intelligence Platform — Frontend

A modern Next.js 15 App Router web application built with React 19, TypeScript, Tailwind CSS, shadcn/ui, and Recharts.

## Architecture & Technology Stack

- **Framework**: Next.js 15 (App Router with Server Components & Client Components)
- **UI Library**: React 19, Tailwind CSS v3, shadcn/ui primitives
- **Visualizations**: Recharts
- **Forms & Validation**: React Hook Form, Zod
- **Type Safety**: TypeScript 5 in strict mode
- **SEO Ready**: Dynamic sitemap, robots.txt, metadata generators, OpenGraph tags

## Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Setup local environment
cp .env.local.example .env.local

# 3. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Quality Scripts

- `npm run dev` - Launch hot-reloading development server
- `npm run build` - Compile production build
- `npm run start` - Run production server
- `npm run lint` - Run ESLint checks
- `npm run type-check` - Validate TypeScript types without emitting code
