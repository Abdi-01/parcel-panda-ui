import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from "react-bootstrap";
import { URL_API } from '../../helper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Pagination from "@material-ui/lab/Pagination";
import { 
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';
import { PaginationWrapper } from './adminTransaction';
import DialogImagePayment from '../../components/dialogImage';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    root: {
      display: 'flex',
      '& > *': {
        marginTop: theme.spacing(2),
      }
    },
    formControl: {
      margin: theme.spacing(1),
    },
    paper: {
        position: 'fixed',
        width: '400px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
}));

const TransactionManagement = () => {
    const [data, setData] = useState(null)
    const [openImage, setOpenImage] = useState(false)
    const [imageURL, setImageURL] = useState(null)
    const classes = useStyles();

    const getTransaction = async () => {
        try {
            let token = localStorage.getItem("tkn_id");
            let config = {
                method: 'get',
                url: URL_API + `/transaction-manage/`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            let response = await axios(config)
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickOpenImage = (url) => {
        setOpenImage(true)
        setImageURL(url)
    };

    const printRowTable = () => {
        if (data.length > 0) {
            return data.map((item) => {
                return <StyledTableRow key={item.id}>
                    <StyledTableCell align="right">{item.id}</StyledTableCell>
                    <StyledTableCell align="right">{item.date_transaction.substring(0, 10)}</StyledTableCell>
                    <StyledTableCell align="right">{item.date_payment === null ? "-" : item.date_payment.substring(0, 10)}</StyledTableCell>
                    <StyledTableCell>{item.username}</StyledTableCell>
                    <StyledTableCell>{item.parcel_type}</StyledTableCell>
                    <StyledTableCell align="right">{item.amount}</StyledTableCell>
                    <StyledTableCell align="right">IDR {item.subtotal_parcel.toLocaleString()}</StyledTableCell>
                    <StyledTableCell>{item.payment_status}</StyledTableCell>
                    <StyledTableCell align="center">
                        <Button variant="outlined" size="small" onClick={() => handleClickOpenImage(item.url_payment_image)}>
                            View
                        </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                        <Button variant="contained" size="small" color="primary">
                            Accept
                        </Button>
                        <Button variant="contained" size="small" color="secondary">
                            Reject
                        </Button>
                    </StyledTableCell>
                </StyledTableRow>
            })
        }
    }

    useEffect(() => {
        getTransaction()
    }, [])

    return (
        <div>
            <Container>
                <h1>Transaction Management</h1>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="right">ID</StyledTableCell>
                                <StyledTableCell align="right">Date transaction</StyledTableCell>
                                <StyledTableCell align="right">Date payment</StyledTableCell>
                                <StyledTableCell>Username</StyledTableCell>
                                <StyledTableCell>Parcel type</StyledTableCell>
                                <StyledTableCell align="right">Amount</StyledTableCell>
                                <StyledTableCell align="right">Subtotal parcel</StyledTableCell>
                                <StyledTableCell>Payment status</StyledTableCell>
                                <StyledTableCell align="center">Payment proof</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(data !== null) ? printRowTable() : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                <PaginationWrapper>
                    <Pagination count={10} variant="outlined" shape="rounded" color="primary" />
                </PaginationWrapper>
            </Container>
            <DialogImagePayment openImage={openImage} setOpenImage={setOpenImage} imageURL={imageURL}/>
        </div>
    )
}

export default TransactionManagement
