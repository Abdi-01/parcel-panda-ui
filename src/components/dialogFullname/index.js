import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { URL_API } from "../../helper";
import { getProfile } from "../../actions";
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

const FormDialogProfile = ({ open, setOpen, handleNotify, value }) => {
  const [fullname, setFullname] = useState(value)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setFullname(event.target.value);
  };

  const handleSave = async () => {
    try {
      setLoading(true)
      let token = localStorage.getItem("tkn_id");
      let config = {
        method: 'patch',
        url: URL_API + '/profile/update-data',
        data: {
          "fullname": fullname
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
      console.log(error)
    }
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
            fullWidth
            autoFocus
            margin="dense"
            label="Fullname"
            type="text"
            value={fullname}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <ButtonWrapper>
            <Button 
              onClick={handleSave} 
              variant="contained" 
              color="primary"
            >
              {loading ? "Loading..." : "Save"}
            </Button>
          </ButtonWrapper>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialogProfile;
