import React, { useState } from "react";
import { toast } from 'react-toastify';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core/";
import { URL_API } from "../../helper";
import axios from "axios";

toast.configure()
const DialogAlert = ({ open, setOpen, id, getProductData }) => {
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      setLoading(true)
      let token = localStorage.getItem("tkn_id");
      let config = {
        method: 'delete',
        url: URL_API + `/product-manage/delete/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
      let response = await axios(config)
      getProductData()
      toast.success(`Success, ${response.data.message}!`, {
        position: toast.POSITION.TOP_CENTER
      });
      setLoading(false)
      setOpen(false)
    } catch (error) {
      console.log(error)
      toast.error("Error delete product !", {
        position: toast.POSITION.TOP_CENTER
      });
      setLoading(false)
      setOpen(false)
    }
  }


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do your agree to delete this product?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This means you are no longer can access this data after agree this
            deletion
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="neutral">
            Disagree
          </Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            {loading ? "Loading..." : "Agree"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogAlert;
