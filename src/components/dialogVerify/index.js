import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@material-ui/core/";
import { ButtonWrapper } from './dialogVerifyComp';
import { URL_API } from '../../helper';
import axios from 'axios';
import { getProfile } from '../../actions';

const FormDialogVerify = ({ open, setOpen, handleNotify }) => {
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
            handleNotify(response.status, response.data.message)
        } catch (error) {
            // console.log(error)
            handleNotify(400, "error verify account")
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
