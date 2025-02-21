import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Set JSDOM as the test environment
    setupFiles: './setupTests.ts', // Optional: Setup file for global configurations
    include: ['**/*.test.tsx'],
    globals: true,
  },
});