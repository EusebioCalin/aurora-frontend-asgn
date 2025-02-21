import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import MovieCard from "../components/MovieCard/MovieCard";

const mockMovie = {
  id: "1",
  title: "Inception",
  rating: 8.8,
  imageUrl: "https://via.placeholder.com/200x300",
  description: "test",
};

describe("MovieCard Component", () => {
  it("renders movie title, rating, and image correctly", () => {
    render(<MovieCard movie={mockMovie} handleSelectMovie={() => {}} />);

    // Check if title is rendered
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();

    // Check if rating is rendered
    expect(screen.getByText(mockMovie.rating.toString())).toBeInTheDocument();

    // Check if image is rendered
    const image = screen.getByAltText(mockMovie.title) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(mockMovie.imageUrl);
  });

  it("calls handleSelectMovie when clicked", () => {
    const handleSelectMovie = vi.fn();
    render(
      <MovieCard movie={mockMovie} handleSelectMovie={handleSelectMovie} />
    );

    // Simulate click event
    fireEvent.click(screen.getByRole("img", { name: mockMovie.title }));

    // Ensure function was called once with the correct movie ID
    expect(handleSelectMovie).toHaveBeenCalledTimes(1);
    expect(handleSelectMovie).toHaveBeenCalledWith(mockMovie.id);
  });
});
