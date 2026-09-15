# Tech Stack

This document outlines the technologies and tools used in the **compintel** project.

## Core Framework & Libraries
- **Next.js** (16.3.4) - React framework for production with built-in optimization and deployment features
- **React** (19.2.8) - JavaScript library for building user interfaces with component-based architecture
- **React DOM** (19.2.8) - Renders React components to the DOM for web applications

## Database & ORM
- **Prisma** (6.12.0) - Modern ORM (Object-Relational Mapping) for database management with type-safe queries
- **@prisma/client** (6.19.3) - Prisma client library for executing database operations

## Styling & UI
- **Tailwind CSS** (4) - Utility-first CSS framework for rapid UI development
- **@tailwindcss/postcss** (4) - PostCSS plugin integration for Tailwind CSS

## Data Visualization
- **Recharts** (3.10.1) - React charting library for creating interactive charts and graphs

## Development & Type Safety
- **TypeScript** (5) - Superset of JavaScript that adds static type checking for better code quality
- **ESLint** (9) - JavaScript linter for identifying and fixing code quality issues
- **eslint-config-next** (16.3.4) - ESLint configuration tailored for Next.js projects
- **TSX** (4.23.13) - TypeScript executor for running TypeScript files directly

## Utilities
- **dotenv** (17.4.2) - Loads environment variables from `.env` files for configuration management
- **@types/node** (20) - TypeScript type definitions for Node.js APIs
- **@types/react** (19) - TypeScript type definitions for React
- **@types/react-dom** (19) - TypeScript type definitions for React DOM

## Project Scripts

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build the project for production
npm start          # Start the production server
npm run lint       # Run ESLint to check code quality
```

## Architecture Summary

**compintel** is a modern full-stack web application built with:
- **Frontend**: React with Next.js for server-side rendering and static generation
- **Styling**: Tailwind CSS for responsive and maintainable UI design
- **Backend**: Next.js API routes with Prisma ORM for database operations
- **Database**: Works with any Prisma-supported database (PostgreSQL, MySQL, SQLite, etc.)
- **Visualization**: Recharts for interactive data charts and graphs
- **Type Safety**: Full TypeScript support for development and production code

This stack enables rapid development, type-safe code, and seamless integration between frontend and backend components.
