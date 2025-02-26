import { Box, styled, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import { Movie } from "../../types/types";

interface MovieCardProps {
  movie: Movie;
  handleSelectMovie: (movieId: string) => void;
}

const StyledBox = styled(Box)({
  width: "200px",
  height: "300px",
  borderRadius: "8px",
  position: "relative",
});

const StyledMovieTitle = styled(Typography)({
  position: "absolute",
  top: "4px",
  left: "12px",
  maxWidth: "60%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const StyledMovieRating = styled(Typography)({
  position: "absolute",
  top: "4px",
  right: "12px",
  color: "#FF4500",
});

const StyledStarIcon = styled(StarIcon)({
  color: "#FF4500",
  fontSize: 16,
  verticalAlign: "text-bottom",
  marginRight: 0.5,
});

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  handleSelectMovie,
}) => {
  return (
    <StyledBox key={movie.id} onClick={() => handleSelectMovie(movie.id)}>
      <StyledMovieTitle
        data-testid={`movie-title-test-id-${movie.id}`}
        variant="body2"
      >
        {movie.title}
      </StyledMovieTitle>
      <StyledMovieRating variant="body2">
        {movie.rating} <StyledStarIcon />
      </StyledMovieRating>
      <Box
        sx={{
          ":hover": {
            cursor: "pointer",
          },
        }}
      >
        <img
          src={movie.imageUrl}
          alt={movie.title}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </Box>
    </StyledBox>
  );
};

export default MovieCard;
