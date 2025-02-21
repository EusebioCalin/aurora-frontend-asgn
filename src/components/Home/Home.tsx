import React from "react";
import MoviesGrid from "../MoviesGrid/MoviesGrid";
import { Box, Container, Typography } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Container>
      <Box textAlign="center" my={4}>
        <Typography variant="h4">🎬 Movie Explorer 🍿</Typography>
      </Box>
      <MoviesGrid />
    </Container>
  );
};

export default Home;
