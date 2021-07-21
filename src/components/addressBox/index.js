import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import { useSelector } from "react-redux";
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
} from './addressBoxComp'
import FormDialogAddress from '../dialogAddress';

const AddressBox = () => {
    const [openDialogAddress, setOpenDialogAddress] = useState(false)
    const [openDialogDelete, setOpenDialogDelete] = useState(false)
    const [data, setData] = useState(null)

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
                                <Button onClick={() => editAddress(item)} variant="outlined" color="primary" fontSize="inherit" startIcon={<EditIcon />}>
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

    const editAddress = (item) => {
        setOpenDialogAddress(true)
        setData(item)
    }

    const deleteAddress = () => {
        setOpenDialogDelete(true)
    }
    
    const handleNotify = (status, message) => {
        if (status === 200) {
          toast.success(`Hey 👋, ${message}`);
        } else {
          toast.error(`Hey 👋, ${message}`);
        }
    };

    const handleDeleteAddress = () => {
        console.log("delete")
    }

    const handleCloseDelete = () => {
        setOpenDialogDelete(false);
    };

    const { address } = useSelector(({ authReducer }) => {
        return {
            address: authReducer.profile.address
        }
    })

    console.log("address", address)

    return (
        <div>
            <AddressContainer>
                <AddressHeader>
                    <h3>My Address</h3>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        startIcon={<HomeIcon />}
                        onClick={editAddress}
                    >
                        Add New Address
                    </Button>
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
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <FormDialogAddress 
                open={openDialogAddress}
                setOpen={setOpenDialogAddress}
                handleNotify={handleNotify}
                data={data}
            />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default AddressBox
