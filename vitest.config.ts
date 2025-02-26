import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Set JSDOM as the test environment
    setupFiles: './setupTests.ts', // Optional: Setup file for global configurations
  },
});