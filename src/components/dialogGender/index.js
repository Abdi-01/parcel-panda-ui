import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import { URL_API } from "../../helper";
import axios from "axios";
import { getProfile } from "../../actions";

const FormDialogGender = ({ open, setOpen, handleNotify, id, value }) => {
  const [gender, setGender] = useState(value);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("tkn_id")
      let config = {
        method: 'patch',
        url: URL_API + '/profile/update-data',
        data: {
          "gender": gender
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
      let response = await axios(config)
      dispatch(getProfile(token))
      setLoading(false)
      setOpen(false);
      handleNotify(response.status, response.data.message);
    } catch (error) {
      
    }
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
              value={gender}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="Male" 
                control={<Radio />} 
                label="Male" 
              />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </RadioWrapper>
        </DialogContent>
        <DialogActions>
          <ButtonWrapper>
            <Button onClick={handleSave} variant="contained" color="primary">
              {loading ? "Loading..." : "Save"}
            </Button>
          </ButtonWrapper>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialogGender;
