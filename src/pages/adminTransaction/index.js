import React, { useState, useEffect } from 'react'
import { Container } from "react-bootstrap";
import { URL_API } from '../../helper';
import DialogImagePayment from '../../components/dialogImage';
import FilterTransactionManagement from '../../components/filterTransaction';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Pagination from "@material-ui/lab/Pagination";
import Skeleton from '@material-ui/lab/Skeleton';
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
    const [paymentStatus, setPaymentStatus] = useState({
        ongoing: false,
        accepted: false,
        rejected: false,
    });
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null,
    });
    const classes = useStyles();

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
                    <StyledTableCell align="right">{item.invoice}</StyledTableCell>
                    <StyledTableCell align="right">{item.date_transaction.substring(0, 10)}</StyledTableCell>
                    <StyledTableCell align="right">{item.date_payment === null ? "-" : item.date_payment.substring(0, 10)}</StyledTableCell>
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

    const setQueryPaymentFilter = () => {
        if (paymentStatus.ongoing || paymentStatus.accepted || paymentStatus.rejected) {
            let query = '?payment='
            let values = []
            for (let payment in paymentStatus) {
                if (paymentStatus[payment] === true) {
                    values.push(payment)
                }
            }
            return query + values.join(",")
        }
    }
    
    const getTransaction = async () => {
        try {
            setLoading(true)
            let query = ''
            if (setQueryPaymentFilter() !== undefined) {
                query = setQueryPaymentFilter()
            }
            let token = localStorage.getItem("tkn_id");
            let config = {
                method: 'get',
                url: URL_API + `/transaction-manage/5/${5 * (page - 1)}${query}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            let response = await axios(config)
            // console.log("Response", response.data.count[0])
            setCountPage(Math.ceil(response.data.count / 5))
            setData(response.data.values)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTransaction()
    }, [page, paymentStatus, selectedDayRange])

    return (
        <div>
            <Container>
                <h1>Transaction Management</h1>
                <FilterTransactionManagement 
                    paymentStatus={paymentStatus}
                    setPaymentStatus={setPaymentStatus}
                    selectedDayRange={selectedDayRange}
                    setSelectedDayRange={setSelectedDayRange}
                    resetFilter={resetFilter}
                />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="right">Invoice</StyledTableCell>
                                <StyledTableCell align="right">Date transaction</StyledTableCell>
                                <StyledTableCell align="right">Date payment</StyledTableCell>
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
            <DialogImagePayment openImage={openImage} setOpenImage={setOpenImage} imageURL={imageURL}/>
        </div>
    )
}

export default TransactionManagement
