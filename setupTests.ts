import '@testing-library/jest-dom'; // Enables additional matchers for Testing Library
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from './src/mocks/node';


expect.extend(matchers);


beforeAll(() => {
  // Setup global configurations
  server.listen(
    // This tells MSW to throw an error whenever it
    // encounters a request that doesn't have a
    // matching request handler.
    { onUnhandledRequest: 'error', }
  );
}
);
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close()
})