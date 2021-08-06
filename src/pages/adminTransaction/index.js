import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import DialogImagePayment from '../../components/dialogImage';
import DialogActionTransaction from '../../components/dialogActionTransaction';
import FilterTransactionManagement from '../../components/filterTransaction';
import Pagination from "@material-ui/lab/Pagination";
import Skeleton from '@material-ui/lab/Skeleton';
import { Container } from "react-bootstrap";
import { URL_API } from '../../helper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { 
    Button,
    Chip ,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';
import { 
    ButtonWrapper, 
    PaginationWrapper, 
    ButtonReject, 
} from './adminTransaction';


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
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [countPage, setCountPage] = useState(1)
    const [openAction, setOpenAction] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [paymentStatus, setPaymentStatus] = useState({
        ongoing: false,
        accepted: false,
        rejected: false,
    });
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null,
    });
    const [selectedItem, setSelectedItem] = useState({
        item: null,
        action: null
    })
    const classes = useStyles();

    const handleClickOpenAction = (data, string) => {
        if (data && string) {
            setSelectedItem({...selectedItem, item: data, action: string})
        }
        setOpenAction(true);
    };

    const resetFilter = () => {
        setPaymentStatus({...paymentStatus, ongoing: false, accepted: false, rejected: false})
        setSelectedDayRange({...selectedDayRange, from: null, to: null})
    }

    const handleChange = (event, value) => {
        setPage(value)
    };

    const handleClickOpenImage = (url) => {
        setOpenImage(true)
        setImageURL(url)
    };

    const printRowTable = () => {
        if (data !== null) {
            return data.map((item) => {
                return <StyledTableRow key={item.id}>
                    <StyledTableCell align="left">{item.invoice}</StyledTableCell>
                    <StyledTableCell align="left">{item.date_transaction.substring(0, 10)}</StyledTableCell>
                    <StyledTableCell align="left">{item.date_payment === null ? "-" : item.date_payment.substring(0, 10)}</StyledTableCell>
                    <StyledTableCell>{item.username}</StyledTableCell>
                    <StyledTableCell align="right">{item.amount}</StyledTableCell>
                    <StyledTableCell align="right">IDR {item.subtotal_parcel.toLocaleString()}</StyledTableCell>
                    <StyledTableCell>{item.payment_status}</StyledTableCell>
                    <StyledTableCell align="center">
                        <Button variant="outlined" size="small" onClick={() => handleClickOpenImage(item.url_payment_image)}>
                            View
                        </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                        <ButtonWrapper>
                            {
                                item.payment_status === 'accepted' ?
                                    <Chip label="accepted" color="primary" /> :
                                item.payment_status === 'rejected' ?
                                    <Chip label="rejected" color="secondary" /> :
                                    <div>
                                        <Button variant="contained" size="small" onClick={() => handleClickOpenAction(item, 'accept')} color="primary">
                                            Accept
                                        </Button>
                                        <ButtonReject variant="contained" size="small" onClick={() => handleClickOpenAction(item, 'reject')} color="secondary">
                                            Reject
                                        </ButtonReject>
                                    </div>
                            }
                        </ButtonWrapper>
                    </StyledTableCell>
                </StyledTableRow>
            })
        }
    }

    
    const getTransaction = useCallback(async () => {
        try {
            const setQueryPaymentFilter = () => {
                if (paymentStatus.ongoing || paymentStatus.accepted || paymentStatus.rejected) {
                    let query = 'payment='
                    let values = []
                    for (let payment in paymentStatus) {
                        if (paymentStatus[payment] === true) {
                            values.push(payment)
                        }
                    }
                    return query + values.join(",")
                }
            }
        
            const setQueryDateFilter = () => {
                if (selectedDayRange.from !== null && selectedDayRange.to !== null) {
                    let query = `from=${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}&to=${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`
                    // console.log("Date filter", query)
                    return query
                }
            }
            setLoading(true)
            let queryPayment = ''
            let queryDate = ''
            if (setQueryPaymentFilter() !== undefined) {
                queryPayment = setQueryPaymentFilter()
            }
            if (setQueryDateFilter() !== undefined) {
                queryDate = setQueryDateFilter()
            }
            let token = localStorage.getItem("tkn_id");
            let config = {
                method: 'get',
                url: URL_API + `/transaction-manage/${rowsPerPage}/${rowsPerPage * (page - 1)}?${queryPayment}&${queryDate}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            let response = await axios(config)
            // console.log("Response", response.data.count[0])
            setCountPage(Math.ceil(response.data.count / rowsPerPage))
            setData(response.data.values)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }, [page, rowsPerPage, paymentStatus, selectedDayRange])
    
    useEffect(() => {
        getTransaction()
    }, [getTransaction])

    return (
        <div>
            <Container>
                <FilterTransactionManagement 
                    paymentStatus={paymentStatus}
                    setPaymentStatus={setPaymentStatus}
                    selectedDayRange={selectedDayRange}
                    setSelectedDayRange={setSelectedDayRange}
                    resetFilter={resetFilter}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Invoice</StyledTableCell>
                                <StyledTableCell align="left">Date transaction</StyledTableCell>
                                <StyledTableCell align="left">Date payment</StyledTableCell>
                                <StyledTableCell>Username</StyledTableCell>
                                <StyledTableCell align="right">Amount</StyledTableCell>
                                <StyledTableCell align="right">Subtotal parcel</StyledTableCell>
                                <StyledTableCell>Payment status</StyledTableCell>
                                <StyledTableCell align="center">Payment proof</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {(data !== null) ? printRowTable() : null} */}
                            {loading ? 
                                <TableCell colSpan={10}>
                                    <Skeleton height={120} width="100%" />
                                    <Skeleton height={120} width="100%" />
                                    <Skeleton height={120} width="100%" />
                                </TableCell> : 
                                printRowTable()
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <PaginationWrapper>
                    <Pagination 
                        count={countPage} 
                        page={page}
                        onChange={handleChange}
                        variant="outlined" 
                        shape="rounded" 
                        color="primary" 
                    />
                </PaginationWrapper>
            </Container>
            <DialogImagePayment 
                openImage={openImage} 
                setOpenImage={setOpenImage} 
                imageURL={imageURL}
            />
            <DialogActionTransaction 
                openAction={openAction} 
                setOpenAction={setOpenAction} 
                selectedItem={selectedItem}
                getTransaction={getTransaction}
            />
        </div>
    )
}

export default TransactionManagement
