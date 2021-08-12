import React, { Fragment, useState } from "react";
import axios from "axios";
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch } from "react-redux";
import { URL_API } from "../../helper";
import { getProfile } from "../../actions";
import { toast } from 'react-toastify';
import { MuiPickersUtilsProvider} from '@material-ui/pickers';
import { DatePicker } from "@material-ui/pickers";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core/";
import { ButtonWrapper } from "./dialogDateBirthComp";

toast.configure()
const FormDialogDateBirth = ({ open, setOpen, value }) => {
//   const [selectedDate, handleDateChange] = useState(new Date(value));
  const [selectedDate, handleDateChange] = useState(new Date(value));
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true)
      let token = localStorage.getItem("tkn_id");
      let dateValue = new Date(selectedDate)
      // console.log(dateValue)
      dateValue.setDate(dateValue.getDate() + 1)
      // console.log(selectedDate, selectedDate.toISOString(), selectedDate.toISOString().slice(0, 10))
      let config = {
        method: 'patch',
        url: URL_API + '/profile/update-data',
        data: {
          "date_birth": dateValue.toISOString().slice(0, 10)
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
      setLoading(false)
      setOpen(false);
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
        <DialogTitle>Edit Date Birth</DialogTitle>
        <DialogContent>
            <DialogContentText>Choose date</DialogContentText>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Fragment>
                <DatePicker
                    disableFuture
                    fullWidth
                    openTo="year"
                    format="dd/MM/yyyy"
                    label="Date of birth"
                    views={["year", "month", "date"]}
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </Fragment>
            </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <ButtonWrapper>
            <Button 
              onClick={handleSave} 
              variant="contained" 
              color="primary"
              disabled={selectedDate.length === 0}
            >
              {loading ? "Loading..." : "Save"}
            </Button>
          </ButtonWrapper>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialogDateBirth;
