import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core/";
import { ButtonWrapper, RadioWrapper } from "./dialogGenderComp";

const FormDialogGender = ({ open, setOpen, handleNotify }) => {
  const [value, setValue] = useState("male");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSave = () => {
    setOpen(false);
    handleNotify("gender");
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="gender"
      >
        <DialogTitle>Edit Gender</DialogTitle>
        <DialogContent>
          <DialogContentText>Choose new gender</DialogContentText>
          <RadioWrapper>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="male" 
                control={<Radio />} 
                label="Male" 
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </RadioWrapper>
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

export default FormDialogGender;
