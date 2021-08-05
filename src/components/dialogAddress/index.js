import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { getProfile } from '../../actions';
import { URL_API } from '../../helper';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core/";
import { ButtonWrapper, StyledButton } from "./dialogAddressComp";

toast.configure()
const FormDialogAddress = ({ open, setOpen, data }) => {
    const [loading, setLoading] = useState(false)
    const [listCity, setListCity] = useState([])
    // const [city, setCity] = useState('')
    const [values, setValues] = useState({
        label: '',
        recipient_name: '',
        phone_number: '',
        address: '',
        idcity: '',
        postal_code: ''
    })
    const dispatch = useDispatch()

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeCity = (event) => {
        // setAge(event.target.value);
        // console.log("handleChangeCity", event.target.value)
        setValues({ ...values, idcity: event.target.value })
    }

    const handleSave = async () => {
        try {
            setLoading(true)
            let token = localStorage.getItem("tkn_id")
            let config = {}
            if (data && data.id) {
                // console.log("Edit address", values)
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
                // console.log("Add address", values)
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
                idcity: '',
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
        const fetchData = () => {
            if (data) {
                setValues(values => ({
                    ...values, 
                    label: data.label,
                    recipient_name: data.recipient_name,
                    phone_number: data.phone_number,
                    address: data.address,
                    idcity: data.idcity,
                    postal_code: data.postal_code
                }))
            }
        }
        const getCity = async () => {
            try {
                let token = localStorage.getItem("tkn_id")
                let config = {
                    method: 'get',
                    url: URL_API + '/profile/city',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                let response = await axios(config)
                setListCity(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        getCity()
    }, [data])

    // console.log(data)

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
                            <FormControl variant="standard" fullWidth margin="dense">
                                <InputLabel id="city-label">City</InputLabel>
                                <Select
                                    labelId="city-label"
                                    id="demo-simple-select-standard"
                                    defaultValue={values.idcity}
                                    onChange={handleChangeCity}
                                    label="City"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        listCity.length > 0 ?
                                            listCity.map((item) => {
                                                return <MenuItem value={item.idcity}>{item.city}</MenuItem>
                                            }) : ''
                                    }
                                </Select>
                            </FormControl>
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
