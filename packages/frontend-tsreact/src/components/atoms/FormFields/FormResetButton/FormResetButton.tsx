import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { type FormResetButtonProps } from "./FormResetButton.type";

export const FormResetButton = ({
  openDialog,
  handleClose,
  onClick,
}: FormResetButtonProps): JSX.Element => (
  <Dialog open={openDialog} onClose={handleClose}>
    <DialogTitle>Delete Listing</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete this listing?
      </DialogContentText>
    </DialogContent>
    <DialogActions
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        margin: "20px auto",
      }}
    >
      <Button
        sx={{
          width: "130px",
          border: "1px solid #50086E",
          borderRadius: "32px",
          backgroundColor: "#FFFFFF",
          color: "#323232",
          textTransform: "capitalize",
          ":hover": {
            color: "#FFFFFF",
            background: "#50086E",
          },
        }}
        onClick={handleClose}
      >
        No, Cancel
      </Button>
      <Button
        sx={{
          width: "130px",
          border: "1px solid #50086E;",
          borderRadius: "32px",
          backgroundColor: "#FFFFFF",
          color: "#323232",

          textTransform: "initial",
          ":hover": {
            background: "#50086E",
            color: "#FFFFFF",
          },
        }}
        onClick={() => {
          onClick();
          handleClose();
        }}
      >
        Yes, delete.
      </Button>
    </DialogActions>
  </Dialog>
);
