import '@testing-library/jest-dom'; // Enables additional matchers for Testing Library
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from './src/mocks/node';


expect.extend(matchers);


beforeAll(() => {
  // Setup global configurations
  server.listen();
}
);
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close()
})