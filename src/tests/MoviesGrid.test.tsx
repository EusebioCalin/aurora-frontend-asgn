import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import MoviesGrid from "../components/MoviesGrid/MoviesGrid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { movieMock } from "../mocks/movieMock";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/node";
import { getMoviesUrl } from "../utils/endpoints";

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

describe("MoviesGrid Component", () => {
  beforeAll(() => {});

  beforeEach(() => {});

  afterAll(() => {});

  afterEach(() => {
    // This will remove any runtime request handlers
    // after each test, ensuring isolated network behavior.
    server.resetHandlers();
  });

  it("should render fetched movie", async () => {
    const component = render(<MoviesGrid />, {
      wrapper: createWrapper(),
    });

    const { getAllByTestId, queryByTestId, getByTestId } = component;
    expect(getAllByTestId("skeleton").length).toBeGreaterThan(0);

    await waitFor(() => {
      expect(queryByTestId("skeleton")).toBe(null);
    });
    await waitFor(() => {
      expect(getByTestId(`movie-title-test-id-${movieMock.id}`)).toBeVisible();
    });
  });

  it("should render error message if fetching movies fails", async () => {
    server.use(
      http.get(getMoviesUrl(), () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { getAllByTestId, queryByTestId, getByText } = render(
      <MoviesGrid />,
      {
        wrapper: createWrapper(),
      }
    );

    expect(getAllByTestId("skeleton").length).toBeGreaterThan(0);

    await waitFor(() => {
      expect(queryByTestId("skeleton")).toBe(null);
    });
    await waitFor(() => {
      expect(getByText("😵 An error occurred")).toBeVisible();
    });
  });
});
