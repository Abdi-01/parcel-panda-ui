import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { URL_API } from "../../helper";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core/";


toast.configure()
const DialogActionTransaction = ({ openAction, setOpenAction, selectedItem, getTransaction }) => {
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setOpenAction(false);
  };

  const updateTransaction = async () => {
    try {
      setLoading(true)
      let id = selectedItem.item.id
      let action = selectedItem.action
      let token = localStorage.getItem("tkn_id")
      let config = {
        method: 'patch',
        url: URL_API + `/transaction-manage/action/${id}?action=${action}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      let response = await axios(config)
      getTransaction()
      setLoading(false)
      handleNotify(response.status, response.data.message)
      setOpenAction(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      handleNotify(400, "failed to update transaction")
      setOpenAction(false)
    }
  }

  const handleNotify = (status, message) => {
    if (status === 200) {
        toast.success(`Success, ${message} !`, {
            position: toast.POSITION.TOP_CENTER, autoClose: 3000
        });
    } else {
        toast.error(`Error, ${message} !`, {
            position: toast.POSITION.TOP_CENTER, autoClose: 3000
        });
    }
  }

  return (
    <div>
      <Dialog
        open={openAction}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do your agree to ${selectedItem.action} this payment?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This means you can't undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="neutral">
            Cancel
          </Button>
          <Button variant="contained" onClick={updateTransaction} color={selectedItem.action === 'accept' ? "primary" : "secondary"}>
            {loading ? "Loading..." : selectedItem.action}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogActionTransaction;
