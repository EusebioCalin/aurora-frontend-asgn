import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, Mock, vi } from "vitest";
import { useMovies } from "../hooks/useMovies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as fetchers from "../api/fetchers";
import { fetchMovies } from "../api/fetchers";

export const movieMock = {
  id: "2a17f05a-873e-46bf-b5f9-36112768faab",
  title: "The Shawshank Redemption",
  description:
    "A banker is sentenced to life in Shawshank State Penitentiary for the murder of his wife and her lover, despite his claims of innocence.",
  imageUrl: "https://placehold.co/400x600?text=The+Shawshank+Redemption",
  rating: 9.3,
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useMovies hook", () => {
  beforeEach(() => {
    vi.spyOn(fetchers, "fetchMovies");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch movies when enabled", async () => {
    const { result } = renderHook(() => useMovies({ isEnabled: true }), {
      wrapper: createWrapper(),
    });

    // vi.runAllTimers(); // Runs all pending timers instantly

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
    expect(result.current.isFetching).toBe(false);
    expect(result.current.data).toEqual({ total: 0, items: [movieMock] });
  });

  it("should not fetch movies when disabled", () => {
    renderHook(() => useMovies({ isEnabled: false }), {
      wrapper: createWrapper(),
    });
    expect(fetchMovies).not.toHaveBeenCalled();
  });

  it("should pass query parameters to fetchMovies", async () => {
    const params = {
      skip: 10,
      limit: 20,
      query: "test",
      isEnabled: true,
    };

    const { result } = renderHook(() => useMovies(params), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMovies).toHaveBeenCalledWith({
      skip: 10,
      limit: 20,
      query: "test",
    });
  });

  it("should handle error states", async () => {
    const error = new Error("Failed to fetch");
    (fetchMovies as Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useMovies({ isEnabled: true }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBe(error);
  });
});
