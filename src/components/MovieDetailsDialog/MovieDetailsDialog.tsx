import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Movie } from "../../types/types";
import { Box, Typography } from "@mui/material";
import { StyledButton } from "../StyledButton/StyledButton";

interface MovieDetailsDialog {
  movie: Movie;
  handleClose: () => void;
}
export default function MovieDetailsDialog({
  movie,
  handleClose,
}: MovieDetailsDialog) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle
        sx={{ backgroundColor: "#F8F9FA" }}
        id="responsive-dialog-title"
      >
        {movie.title}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#F8F9FA" }}>
        <DialogContentText>
          <Box display="flex" gap="16px">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              style={{ width: "300px", height: "400px", borderRadius: "8px" }}
            />
            <Box>
              <Typography variant="subtitle1">
                Rating: {movie.rating}
              </Typography>
              <Typography variant="subtitle1">Description</Typography>
              <Typography variant="body1">{movie.description}</Typography>
            </Box>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#F8F9FA" }}>
        <StyledButton variant="contained" color="primary" onClick={handleClose}>
          Close
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
}
