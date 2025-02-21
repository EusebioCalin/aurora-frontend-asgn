import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  MenuItem,
  Pagination,
  Select,
  Box,
  Skeleton,
  SelectChangeEvent,
  styled,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import debounce from "lodash.debounce";
import { useMovies } from "../../hooks/useMovies";
import EmptyState from "../EmptyState/EmptyState";
import MovieCard from "../MovieCard/MovieCard";
import { Cancel } from "@mui/icons-material";
import MovieDetailsDialog from "../MovieDetailsDialog/MovieDetailsDialog";
import { Movie } from "../../types/types";

const PAGE_SIZE = [8, 10, 12];

const StyledControlsWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  mb: "16px",
  gap: "8px",
});

const StyledInputLabel = styled(InputLabel)({
  "&.MuiFormLabel-root.MuiInputLabel-root": {
    "&.Mui-focused": {
      color: "#FF4500",
    },
  },
});
const StyledOutlinedInput = styled(OutlinedInput)({
  "&.MuiOutlinedInput-root": {
    backgroundColor: "#E0E0E0",
    "&:hover fieldset": {
      borderColor: "#FF4500", // Outline color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FF4500", // Outline color when focused
    },
  },
});

const StyledInputIconButton = styled(IconButton)({
  color: "#FF4500",
  ":focus": {
    outline: "unset",
  },
});

const StyledPagination = styled(Pagination)({
  "&.MuiPagination-root": {
    marginTop: "16px",
    "& .MuiButtonBase-root.MuiPaginationItem-root": {
      backgroundColor: "#F8F9FA",
      "&:hover": {
        backgroundColor: "#FF4500",
      },
      "&:focus": {
        outline: "1px auto #FF4500",
      },
      "&.Mui-selected": {
        backgroundColor: "#FF4500",
      },
    },
    backgroundColor: "#F8F9FA",
  },
});

const StyledSelect = styled(Select<number>)({
  backgroundColor: "#E0E0E0",
  "&.MuiOutlinedInput-root": {
    backgroundColor: "#E0E0E0",
    "&:hover fieldset": {
      borderColor: "#FF4500", // Outline color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FF4500", // Outline color when focused
    },
  },
});

const MoviesGrid: React.FC<object> = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE[0]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isFetching, isPending, isError, refetch } = useMovies({
    isEnabled: true,
    skip,
    limit: pageSize,
    query: debouncedSearch,
  });
  const { items: movies } = data || {};

  useEffect(() => {
    if (data) {
      const { total } = data;
      const result = total ? Math.ceil(total / pageSize) : 0;
      setTotalPages(result);
    }
  }, [data, pageSize]);

  useEffect(() => {
    setSkip((page - 1) * pageSize);
  }, [page, pageSize]);

  const handleResetSearch = () => {
    setSkip(0);
    setPage(1);
    setSearch("");
    setDebouncedSearch("");
  };

  const handleDebounce = (value: string) => {
    setDebouncedSearch(value);
    setPage(1);
    setSkip(0);
  };

  const debouncedOnChange = useCallback(debounce(handleDebounce, 400), []);
  const handleOnSearchChange = (value: string) => {
    setSearch(value);
    debouncedOnChange(value);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>): void => {
    setPageSize(Number(event?.target?.value));
    setPage(1); // Reset to first page on size change
  };

  const handleSelectMovie = (movieId: string) => {
    const selectedMovie = movies?.find(({ id }) => id === movieId);
    if (selectedMovie) {
      setSelectedMovie(selectedMovie);
    }
  };

  const showPagination = !!totalPages && !isError;
  let renderedItems = null;

  if (isFetching || isPending) {
    renderedItems = [...Array(pageSize)].map((_, index) => (
      <Skeleton
        data-testid="skeleton"
        height={300}
        key={index}
        sx={{ borderRadius: "8px" }}
        variant="rectangular"
        width={200}
      />
    ));
  } else if (isError) {
    renderedItems = <EmptyState isError handleRetry={refetch} />;
  } else if (movies?.length) {
    renderedItems = movies?.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        handleSelectMovie={handleSelectMovie}
      />
    ));
  } else {
    renderedItems = <EmptyState />;
  }

  return (
    <Container sx={{ alignItems: "stretch" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={8}>
          <StyledControlsWrapper>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <StyledInputLabel htmlFor="outlined-adornment-search">
                Search
              </StyledInputLabel>
              <StyledOutlinedInput
                id="outlined-adornment-search"
                type="text"
                onChange={(e) => handleOnSearchChange(e.target.value)}
                value={search}
                endAdornment={
                  <InputAdornment position="end">
                    <StyledInputIconButton
                      aria-label={"close"}
                      onClick={handleResetSearch}
                      disabled={!search}
                      edge="end"
                    >
                      <Cancel />
                    </StyledInputIconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <StyledSelect value={pageSize} onChange={handlePageSizeChange}>
              {PAGE_SIZE.map((size) => (
                <MenuItem key={size} value={size}>
                  {size} per page
                </MenuItem>
              ))}
            </StyledSelect>
          </StyledControlsWrapper>
        </Grid>
      </Grid>
      <Container sx={{ textAlign: "center", mt: 4 }} maxWidth="md">
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
          {renderedItems}
        </Box>
        {showPagination && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <StyledPagination
              shape="rounded"
              count={totalPages || 0}
              page={page}
              onChange={handlePageChange}
              color="secondary"
            />
          </Box>
        )}
      </Container>
      {selectedMovie && (
        <MovieDetailsDialog
          movie={selectedMovie}
          handleClose={() => setSelectedMovie(null)}
        />
      )}
    </Container>
  );
};

export default MoviesGrid;
