/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    jsxInject: `
import React from 'react';
const jest = vi; // Uncomment this line if you are migrating from jest to vitest
`,
  },
  test: {
    // Do not process css files (is slow)
    css: false,
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest/setupTests.ts'],
  },
});
