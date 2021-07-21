import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import { useSelector } from "react-redux";
import {
    Button,
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

const AddressBox = () => {

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
                                <Button variant="outlined" color="primary" fontSize="inherit" startIcon={<EditIcon />}>
                                    Edit
                                </Button>
                                <Button variant="outlined" color="secondary" fontSize="inherit" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </ButtonWrapper>
                        </Container>
            })
        }
    }

    const { address } = useSelector(({ authReducer }) => {
        return {
            address: authReducer.profile.address
        }
    })

    return (
        <div>
            <AddressContainer>
                <AddressHeader>
                    <h3>My Address</h3>
                    <Button variant="contained" color="secondary" startIcon={<HomeIcon />}>
                        Add New Address
                    </Button>
                </AddressHeader>
                {printAddress()}
            </AddressContainer>
        </div>
    )
}

export default AddressBox
