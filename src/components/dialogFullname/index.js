import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core/";
import { ButtonWrapper } from "./dialogFullnameComp";

const FormDialogProfile = ({ open, setOpen, handleNotify }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    handleNotify("fullname");
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="fullname"
      >
        <DialogTitle>Edit New Fullname</DialogTitle>
        <DialogContent>
          <DialogContentText>Type new fullname</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Fullname"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <ButtonWrapper>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save Changes
            </Button>
          </ButtonWrapper>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialogProfile;
