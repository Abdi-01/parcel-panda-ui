import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
} from "@material-ui/core/";
import { ButtonWrapper } from "./dialogAddressComp";

const FormDialogAddress = ({ open, setOpen, handleNotify, data }) => {
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        label: '',
        recipient_name: '',
        phone_number: '',
        address: '',
        city: '',
        postal_code: ''
    })

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleInitialData = () => {
        if (data !== undefined && data !== null) {
            setValues({
                ...values,
                label: data.label,
                recipient_name: data.recipient_name,
                phone_number: data.phone_number,
                address: data.address,
                city: data.city,
                postal_code: data.postal_code
            });
        }
    }

    useEffect(() => {
        handleInitialData()
    },[])

    console.log(data)

    return (
        <div>
            <Dialog
                fullWidth
                maxWidth={"sm"}
                open={open}
                onClose={handleClose}
                aria-labelledby="fullname"
            >
                <DialogTitle>Edit Address</DialogTitle>
                <DialogContent>
                <DialogContentText>Type address data</DialogContentText>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Label"
                        type="text"
                        value={values.label}
                        onChange={(event) =>
                            setValues({ ...values, label: event.target.value })
                        }
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Recipient name"
                        type="text"
                        value={values.recipient_name}
                        onChange={(event) =>
                            setValues({ ...values, recipient_name: event.target.value })
                        }
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Phone number"
                        type="text"
                        value={values.phone_number}
                        onChange={(event) =>
                            setValues({ ...values, phone_number: event.target.value })
                        }
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Address"
                        type="text"
                        value={values.address}
                        onChange={(event) =>
                            setValues({ ...values, address: event.target.value })
                        }
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Postal code"
                                type="text"
                                value={values.postal_code}
                                onChange={(event) =>
                                    setValues({ ...values, postal_code: event.target.value })
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                label="City"
                                type="text"
                                value={values.city}
                                onChange={(event) =>
                                    setValues({ ...values, city: event.target.value })
                                }
                            />
                        </Grid>
                    </Grid>
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
    )
}

export default FormDialogAddress
