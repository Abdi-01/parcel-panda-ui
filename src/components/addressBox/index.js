import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
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
    return (
        <div>
            <AddressContainer>
                <AddressHeader>
                    <h3>My Address</h3>
                    <Button variant="contained" color="secondary" startIcon={<HomeIcon />}>
                        Add New Address
                    </Button>
                </AddressHeader>
                <Container>
                    <div>
                        <DataWrapper>
                            <Label>Label</Label>
                            <Typography variant="subtitle1">Home</Typography>
                        </DataWrapper>
                        <DataWrapper>
                            <Label>Recipient name</Label>
                            <Typography variant="subtitle1">Jerry</Typography>
                        </DataWrapper>
                        <DataWrapper>
                            <Label>Phone number</Label>
                            <Typography variant="subtitle1">021200200</Typography>
                        </DataWrapper>
                        <DataWrapper>
                            <Label>Address</Label>
                            <Typography variant="subtitle1">Jl. HR. Rasuna Said, 12345, Jakarta</Typography>
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
                <Container>
                    <div>
                        <DataWrapper>
                            <Label>Label</Label>
                            <Typography variant="subtitle1">Home</Typography>
                        </DataWrapper>
                        <DataWrapper>
                            <Label>Recipient name</Label>
                            <Typography variant="subtitle1">Jerry</Typography>
                        </DataWrapper>
                        <DataWrapper>
                            <Label>Phone number</Label>
                            <Typography variant="subtitle1">021200200</Typography>
                        </DataWrapper>
                        <DataWrapper>
                            <Label>Address</Label>
                            <Typography variant="subtitle1">Jl. HR. Rasuna Said, 12345, Jakarta</Typography>
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
            </AddressContainer>
        </div>
    )
}

export default AddressBox
