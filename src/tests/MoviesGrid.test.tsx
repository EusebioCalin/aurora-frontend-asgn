import { render, renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import MoviesGrid from "../components/MoviesGrid/MoviesGrid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
// import * as mod from "../api/fetchers";

// vi.spyOn(mod, "fetchMovies", () => Promise.resolve({ total: 0, items: [] }));

// // vi.mock("../api/fetchers", () => ({
// //   fetchMovies: vi.fn(() => Promise.resolve({ total: 0, items: [] })), // Default mock implementation
// // }));

import { http, HttpResponse } from "msw";
import { getMoviesUrl } from "../utils/endpoints";
import { useMovies } from "../hooks/useMovies";

const results = {
  items: [],
  total: 0,
};
export const restHandlers = [
  http.get(getMoviesUrl(), ({ request }) => {
    console.log("Outgoing:", getMoviesUrl(), request.url, request.method);
    return HttpResponse.json({ success: false }, { status: 401 });
    return HttpResponse.json(results);
  }),
];
const server = setupServer(...restHandlers);

server.events.on("request:start", ({ request }) => {
  console.log("Outgoing:", request.method, request.url);
});

describe("MoviesGrid Component", () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

  beforeEach(() => {
    vi.useFakeTimers();
    // Clear previous mock calls before each test
    vi.clearAllMocks();
  });

  // Close server after all tests
  afterAll(() => server.close());

  afterEach(() => {
    // Reset handlers after each test for test isolation
    server.resetHandlers();
  });

  it("assert 2 + 2", () => {
    expect(2 + 2).toBe(4);
  });

  // it("renders skeletons when loading", async () => {
  //   const queryClient = new QueryClient({
  //     defaultOptions: {
  //       queries: {
  //         retry: false,
  //       },
  //     },
  //   });

  //   const wrapper = ({ children }: { children: React.ReactNode }) => (
  //     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  //   );

  //   vi.runAllTimers();

  //   const { getAllByTestId } = render(<MoviesGrid />, { wrapper });
  //   expect(getAllByTestId("skeleton").length).toBeGreaterThan(0);
  // });
});
