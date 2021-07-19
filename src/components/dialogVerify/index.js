import React from 'react'
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

const FormDialogVerify = ({ open, setOpen, handleNotify }) => {
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(false);
        handleNotify("account");
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
                    autoFocus
                    margin="dense"
                    label="OTP"
                    type="text"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <ButtonWrapper>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Verify Account
                    </Button>
                </ButtonWrapper>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default FormDialogVerify
