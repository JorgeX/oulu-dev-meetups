import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'api',
    testTimeout: 40000,
  },
});