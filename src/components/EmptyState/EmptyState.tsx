import { Box, Typography } from "@mui/material";
import { StyledButton } from "../StyledButton/StyledButton";

interface EmptyStateProps {
  isError?: boolean;
  handleRetry?: () => void;
}
const EmptyState = ({ isError, handleRetry }: EmptyStateProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "300px",
        textAlign: "center",
        borderRadius: 2,
        p: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {isError ? "😵 An error occurred" : "We couldn't find anything"}
      </Typography>
      {isError && (
        <StyledButton
          variant="contained"
          color="info"
          onClick={handleRetry}
          sx={{ mt: 2 }}
        >
          Retry
        </StyledButton>
      )}
    </Box>
  );
};

export default EmptyState;
