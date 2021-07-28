import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { getProfile } from '../../actions';
import { URL_API } from '../../helper';
import axios from 'axios';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
} from "@material-ui/core/";
import { ButtonWrapper, StyledButton } from "./dialogAddressComp";

toast.configure()
const FormDialogAddress = ({ open, setOpen, data }) => {
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        label: '',
        recipient_name: '',
        phone_number: '',
        address: '',
        city: '',
        postal_code: ''
    })
    const dispatch = useDispatch()

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            setLoading(true)
            let token = localStorage.getItem("tkn_id")
            let config = {}
            if (data && data.id) {
                console.log("Edit address", values)
                let temp = values
                temp.id = data.id
                config = {
                    method: 'patch',
                    url: URL_API + '/profile/update-address',
                    data: temp,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            } else {
                console.log("Add address", values)
                config = {
                    method: 'post',
                    url: URL_API + '/profile/add-address',
                    data: values,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            }
            let response = await axios(config)
            dispatch(getProfile(token))
            setLoading(false)
            setOpen(false)
            handleNotify(response.status, response.data.message)
            setValues({...values, 
                label: '',
                recipient_name: '',
                phone_number: '',
                address: '',
                city: '',
                postal_code: ''
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            setOpen(false)
            handleNotify(400, "Can't add address")
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

    useEffect(() => {
        // console.log(data)
        if (data) {
            setValues({...values, 
                label: data.label,
                recipient_name: data.recipient_name,
                phone_number: data.phone_number,
                address: data.address,
                city: data.city,
                postal_code: data.postal_code
            })  
        }
    }, [data])

    // console.log(data, data.id)

    return (
        <div>
            <Dialog
                fullWidth
                maxWidth={"sm"}
                open={open}
                onClose={handleClose}
                aria-labelledby="fullname"
            >
                <DialogTitle>
                    { data && data.id ? "Edit Address" : "Add address"}
                </DialogTitle>
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
                    <StyledButton 
                        onClick={handleSave} 
                        variant="contained" 
                        
                    >
                        {loading ? "Loading..." : "Save"}
                    </StyledButton>
                </ButtonWrapper>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default FormDialogAddress
