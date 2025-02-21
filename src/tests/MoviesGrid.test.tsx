import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MoviesGrid from "../components/MoviesGrid/MoviesGrid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../api/fetchers", () => ({
  fetchMovies: vi.fn(() => Promise.resolve({ total: 0, items: [] })), // Default mock implementation
}));

describe("MoviesGrid Component", () => {
  beforeEach(() => {
    // Clear previous mock calls before each test
    vi.clearAllMocks();
  });

  it("renders skeletons when loading", async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MoviesGrid />
      </QueryClientProvider>
    );

    // Expect skeletons to be rendered
    expect(screen.getAllByTestId("skeleton").length).toBeGreaterThan(0);
  });
});
