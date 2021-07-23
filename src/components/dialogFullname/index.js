import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { URL_API } from "../../helper";
import { getProfile } from "../../actions";
import { toast } from 'react-toastify';
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

toast.configure()
const FormDialogProfile = ({ open, setOpen, value }) => {
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
      // console.log(response)
      dispatch(getProfile(token))
      setLoading(false)
      setOpen(false);
      toast.success(`Success, ${response.data.message}!`, {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      console.log(error)
      toast.error("Error update profile !", {
        position: toast.POSITION.TOP_CENTER
      });
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
