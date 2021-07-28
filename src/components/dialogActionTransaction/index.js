import React from "react";
import { toast } from 'react-toastify';
// import { URL_API } from "../../helper";
// import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core/";


toast.configure()
const DialogActionTransaction = ({ openAction, setOpenAction, selectedItem }) => {
//   const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setOpenAction(false);
  };

  return (
    <div>
      <Dialog
        open={openAction}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do your agree to ${selectedItem.action} this ${selectedItem.item.invoice} payment?`}
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
          <Button variant="contained" color={selectedItem.action === 'accept' ? "primary" : "secondary"}>
            {/* {loading ? "Loading..." : "Agree"} */}
            {selectedItem.action}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogActionTransaction;
