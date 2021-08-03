import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { ButtonWrapper } from './dialogVerifyComp';
import { URL_API } from '../../helper';
import { getProfile } from '../../actions';
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

toast.configure()
const FormDialogVerify = ({ open, setOpen }) => {
    const [otp, setOtp] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setOtp(event.target.value);
    };

    const handleSave = async () => {
        try {
            setLoading(true)
            let token = localStorage.getItem("tkn_id");
            let config = {
                method: 'patch',
                url: URL_API + '/auth/verify',
                data: {
                    "otp": otp
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            let response = await axios(config)
            dispatch(getProfile(token))
            // console.log(response)
            toast.success(`Success, ${response.data.message}!`, {
                position: toast.POSITION.TOP_CENTER
            });
        } catch (error) {
            console.log(error)
            toast.error("Error verify email !", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        setLoading(false)
        setOpen(false)
    };

    return (
        <div>
            <Dialog
                fullWidth
                maxWidth={"sm"}
                open={open}
                onClose={handleClose}
                aria-labelledby="account-verify"
            >
                <DialogTitle>Verify account</DialogTitle>
                <DialogContent>
                <DialogContentText>Type OTP</DialogContentText>
                <TextField
                    fullWidth
                    autoFocus
                    margin="dense"
                    label="OTP"
                    type="text"
                    onChange={handleChange}
                />
                </DialogContent>
                <DialogActions>
                <ButtonWrapper>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        {loading ? "Loading..." : "Verify"}
                    </Button>
                </ButtonWrapper>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default FormDialogVerify
