import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FormDialogAddress from '../dialogAddress';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { URL_API } from '../../helper';
import { getProfile } from '../../actions';
import {
    Button,
    Dialog,
    DialogActions, 
    DialogContent,   
    DialogContentText, 
    DialogTitle, 
    Typography,
} from '@material-ui/core/';
import { 
    AddressContainer, 
    AddressHeader,
    Container,
    ButtonWrapper,
    DataWrapper,
    Label,
    StyledButton,
} from './addressBoxComp'

toast.configure()
const AddressBox = () => {
    const [openDialogAddress, setOpenDialogAddress] = useState(false)
    const [openDialogDelete, setOpenDialogDelete] = useState(false)
    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState(null)
    const [idDelete, setIdDelete] = useState(null)
    const dispatch = useDispatch()

    const printAddress = () => {
        // console.log("My Address Page", address)
        if (address.length > 0) {
            return address.map((item) => {
                return  <Container>
                            <div>
                                <DataWrapper>
                                    <Label>Label</Label>
                                    <Typography variant="subtitle1">{item.label}</Typography>
                                </DataWrapper>
                                <DataWrapper>
                                    <Label>Recipient name</Label>
                                    <Typography variant="subtitle1">{item.recipient_name}</Typography>
                                </DataWrapper>
                                <DataWrapper>
                                    <Label>Phone number</Label>
                                    <Typography variant="subtitle1">{item.phone_number}</Typography>
                                </DataWrapper>
                                <DataWrapper>
                                    <Label>Address</Label>
                                    <Typography variant="subtitle1">{item.address}, {item.city}, {item.postal_code}</Typography>
                                </DataWrapper>
                            </div>
                            <ButtonWrapper>
                                <Button onClick={() => dialogAddress(item)} variant="outlined" color="primary" fontSize="inherit" startIcon={<EditIcon />}>
                                    Edit
                                </Button>
                                <Button onClick={() => deleteAddress(item.id)} variant="outlined" color="secondary" fontSize="inherit" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </ButtonWrapper>
                        </Container>
            })
        }
    }

    const dialogAddress = (item) => {
        if (item) {
            setItem(item)
        }
        setOpenDialogAddress(true)
    }

    const deleteAddress = (id) => {
        setOpenDialogDelete(true)
        setIdDelete(id)
    }

    const handleDeleteAddress = async () => {
        try {
            setLoading(true)
            // console.log("idDelete", idDelete)
            let token = localStorage.getItem("tkn_id");
            let config = {
                method: 'delete',
                url: URL_API + `/profile/delete-address/${idDelete}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            let response = await axios(config)
            dispatch(getProfile(token))
            setLoading(false)
            setOpenDialogDelete(false)
            handleNotify(response.status, response.data.message)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setOpenDialogDelete(false)
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

    const handleCloseDelete = () => {
        setOpenDialogDelete(false);
    };

    const { address } = useSelector(({ authReducer }) => {
        return {
            address: authReducer.profile.address,
        }
    })

    useEffect(() => {
        
    }, [item])

    return (
        <div>
            <AddressContainer>
                <AddressHeader>
                    <h3>My Address</h3>
                    <StyledButton 
                        variant="contained" 
                        color="secondary" 
                        startIcon={<HomeIcon />}
                        onClick={dialogAddress}
                    >
                        Add New Address
                    </StyledButton>
                </AddressHeader>
                {printAddress()}
            </AddressContainer>
            <Dialog
                open={openDialogDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure want to delete this address"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting this address can't be undone after click agree.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Disagree</Button>
                    <Button onClick={handleDeleteAddress} color="secondary">
                        {loading ? "Loading..." : "Agree"}
                    </Button>
                </DialogActions>
            </Dialog>
            <FormDialogAddress 
                open={openDialogAddress}
                setOpen={setOpenDialogAddress}
                data={item}
            />
        </div>
    )
}

export default AddressBox
