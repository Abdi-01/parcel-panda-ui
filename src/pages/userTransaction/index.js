import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody } from 'reactstrap';
import earphones from "../../asset/img/earphones.png"
import { getTransaction } from "../../actions"
import ReactPaginate from 'react-paginate';
// import { Dialog } from 'primereact/dialog';
import { URL_API } from "../../helper"
import { toast } from 'react-toastify';
import axios from 'axios';
import "../userTransaction/userTransactionPage.css"
import bill from "../../asset/img/bill.png"
import ReceiptIcon from '@material-ui/icons/Receipt';
import { styled } from "@material-ui/core/styles";
import {
    Grid,
    TextField,
} from "@material-ui/core/";

toast.configure()

const Input = styled("input")({
    display: "none",
});

class UserTransactionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            perPage: 2,
            currentPage: 0,
            displayBasic2: false,
            idpayment_status: [],
            transaction: [],
            payment_status: [],
            selectedIndex: null,
            modal: false,
            modalPaid: false,
            fileName: "File upload (click on icon left)",
            fileUpload: null,
            idtransaksi: null,
        }
    }

    handleFile = (e) => {
        console.log("Files", e.target.files)
        if (e.target.files[0]) {
            this.setState({
                fileName: e.target.files[0].name,
                fileUpload: e.target.files[0]
            })
        }
    }


    componentDidMount() {
        this.props.getTransaction()
        this.getPaymentStatus()
        this.getUserTransaction()
    }

    getPaymentStatus = () => {
        axios.get(URL_API + `/transaction/get-payment-status`)
            .then(res => {
                console.log("PAYMENT STATUS", res.data)
                this.setState({ payment_status: res.data })
            }).catch(err => console.log(err))
    }

    getUserTransaction = () => {
        // console.log("ID", id)
        let token = localStorage.getItem("tkn_id")
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.get(URL_API + `/transaction`, headers)
            .then(res => {
                console.log("OK")
                this.setState({ transaction: res.data, pageCount: Math.ceil(res.data.length / this.state.perPage) })
            }).catch(err => {
                console.log(err)
            })
    }

    handleStatus = (id) => {
        let token = localStorage.getItem("tkn_id")
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.patch(URL_API + `/transaction/filter`, {idpayment_status: id}, headers)
        .then(res => {
            console.log("filter ni", res.data)
            if(res.data.length <= 0){
                // alert("OK")
                toast.warn('Transaksi dengan status ini tidak tersedia!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                this.setState({transaction: res.data, pageCount: Math.ceil(res.data.length / this.state.perPage)})
            } else {
                this.setState({transaction: res.data, pageCount: Math.ceil(res.data.length / this.state.perPage)})
            }
        }).catch(err => console.log(err))
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.printUserTransaction()
        });
    };


    printUserTransaction = () => {
        console.log(this.state.transaction)
        console.log(this.state.idpayment_status)
        return this.state.transaction.slice(this.state.offset, this.state.offset + this.state.perPage).map((item, index) => {
            return (
                <div className="mt-3 card-box">
                    <div className="row top-judul" >
                        <div className="col-md-6">
                            <h6>{item.invoice}</h6>
                            <p className="order">Order at <span className="parcelpanda">Parelpanda </span>
                                <span className="purchase">{item.amount} parcel purchased</span></p>
                        </div>
                        <div className="col-md-6">
                            <div className="row d-flex">
                                <div className="col-md-6">
                                    <p><span>Order Status</span><br />
                                        <span className="order">{item.title}</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p>Total Payment<br />
                                        <span className="total">Rp.{item.total_payment.toLocaleString()}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row history">
                        <div className="col-md-6">
                            <div className="row d-flex">
                                <div className="col-md-8">
                                    <h6 className="invoice">{item.invoice}</h6>
                                    <p className="date"><span>Date transaction: {item.date_transaction}</span>
                                        <br />
                                        <span>amount: {item.amount}</span> <br /><br />
                                        {
                                            item.idpayment_status === 2 ?
                                                <span style={{ color: '#FAB629' }}>Anda belum melakukan pembayaran, segera lakukan pembayaran</span> :
                                                <span style={{ color: '#FAB629' }}>Thank you for your order</span>
                                        }
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    {
                                        item.idpayment_status !== 2 ?
                                            <Button className="btn-payment" color="warning" onClick={() => this.setState({ selectedIndex: index, modal: !this.state.modal })}>Detail</Button>
                                            :
                                            <>
                                                <Button color="warning"onClick={() => this.setState({ selectedIndex: index, modalPaid: !this.state.modalPaid, idtransaksi: item.id })}>
                                                    Paid
                                                </Button>
                                                <Button className="btn-payment" color="warning" onClick={() => this.setState({ selectedIndex: index, modal: !this.state.modal })}>Detail</Button>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row d-flex">
                                <div className="col-md-6">
                                    <p><span className="delivery">Delivery Address</span><br />
                                        <span className="order">{item.address}</span></p>
                                    <p><span className="delivery">Phone Number</span><br />
                                        <span className="order">{item.phone_number}</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p><span className="delivery">Shipping Cost</span><br />
                                        <span className="order">Rp. {item.ongkir.toLocaleString()}</span></p>
                                    <p><span className="delivery">Subtotal</span><br />
                                        <span className="order">Rp.{item.subtotal_parcel.toLocaleString()}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    printDetail = () => {
        return this.state.transaction.slice(this.state.offset, this.state.offset + this.state.perPage).forEach((item, index) => {
            if (this.state.selectedIndex === index) {
                return (
                    <div>
                        <Modal isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }) }}>
                            <ModalBody>
                                <div className="detail-box">
                                    <h6>{item.invoice}</h6>
                                    <p className="order">Order at <span style={{ fontWeight: 'bold', borderRight: '1px solid #DBDBDB', paddingRight: '10px' }}>Parelpanda </span>
                                        <span className="amount">{item.amount} parcel purchased</span></p>
                                </div>
                                <div className="detail-isi">
                                    {
                                        item.detail.map((el, idx) => {
                                            return (
                                                <div className="row" style={{ borderBottom: '1px solid #DDDDDD', }}>
                                                    <div className="col-md-3 mt-3">
                                                        <img src={URL_API + '/static/images/' + el.url} alt="img" style={{ width: '70px', height: '70px', marginLeft: '15px', marginTop: '5px' }} />
                                                    </div>
                                                    <div className="col-md-9 mt-3">
                                                        <p><span className="pname">Parcel {el.parcel}</span><br />
                                                            <span className="elname">{el.name}</span><br />
                                                            <span className="eltitle">{el.title}</span><br />
                                                            <span className="eltitle">Quantity: {el.amount}</span></p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </ModalBody>
                        </Modal>
                    </div>
                )
            }
        })
    }

    paidTransaction = () => {
        return this.state.transaction.slice(this.state.offset, this.state.offset + this.state.perPage).forEach((item, index) => {
            if (this.state.selectedIndex === index) {
                return (
                    <div>
                        <Modal style={{ backgroundColor: '#f7eaa3' }} isOpen={this.state.modalPaid} toggle={() => { this.setState({ modalPaid: !this.state.modalPaid }) }}>
                            <ModalBody>
                                <div className="detail-box">
                                    <div>
                                        <div style={{ textAlign: 'center', alignItems: 'center' }}>
                                            <img alt=".." src={bill} width="50px" height="50px" />
                                            <h2 style={{ fontSize: '17px', letterSpacing: '1px', fontWeight: '500', marginTop: '10px' }}>
                                                PLEASE COMPLETE YOUR PAYMENT PROCESS
                                            </h2>
                                            <p className="order">Halo, <span style={{ fontWeight: 'bold' }}>{item.username}</span></p>
                                            <p className="order">Terima kasih telah memilih Parcelpanda! Silahkan melengkapi proses pembayaran kamu,
                                                agar pesanan kamu dapat segera kami proses.</p>
                                        </div>
                                        <div style={{ border: '1px solid #DDDDDD', alignItems: 'center', backgroundColor: '#FEF5F6' }}>
                                            <div className="row">
                                                <div className="col-md-6" style={{ paddingLeft: '60px' }}>
                                                    <p className="order" style={{ paddingTop: '10px', color: '#7D7D7D' }}>
                                                        <span>Invoice</span><br />
                                                        <span >Date of Order</span><br />
                                                        <span >Payment Method</span><br />
                                                        <span >Total Payment</span><br />
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="order" style={{ paddingTop: '10px', fontWeight: 'bold' }}>
                                                        <span>{item.invoice}</span><br />
                                                        <span >{item.date_transaction}</span><br />
                                                        <span >Bank Transafer</span><br />
                                                        <span >Rp. {item.total_payment.toLocaleString()}</span><br />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item xs={1}>
                                                <label htmlFor="icon-button-file">
                                                    <Input accept="image/*" id="icon-button-file" type="file" onChange={this.handleFile} />
                                                    <ReceiptIcon color="primary" style={{ color: '#FAB629' }} cursor="pointer" />
                                                </label>
                                            </Grid>
                                            <Grid item xs={11}>
                                                <TextField
                                                    disabled
                                                    fullWidth
                                                    id="image"
                                                    label={this.state.fileName}
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button onClick={this.submitPaymentProof} size="sm" color="warning" outline>Submit</Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </ModalBody>
                        </Modal>
                    </div>
                )
            }
        })
    }

    getDate = () => {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let hours = newDate.getHours();
        let minutes = newDate.getMinutes();
        let second = newDate.getSeconds();
        return `${year}-${month}-${date} ${hours}:${minutes}:${second}`
    }

    submitPaymentProof = () => {
        let date_payment = this.getDate()
        console.log(this.state.idtransaksi, date_payment, this.state.fileUpload)
        let fd = new FormData();
        let data = {
            id: this.state.idtransaksi,
            date_payment: date_payment,
        };
        fd.append("data", JSON.stringify(data));
        fd.append("images", this.state.fileUpload);
        let token = localStorage.getItem("tkn_id");
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios.patch(URL_API + `/transaction/payment`, fd, headers)
        .then(res => {
            console.log(res.data)
            toast.success("Thankyou, We will process your payment", { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            this.setState({modalPaid: false})
            this.getUserTransaction(res.data)
        }).catch(err => console.log(err))
    }

    onBtReset = () => {
        window.location.reload()
    }

    render() {
        return (
            <div className="halaman">
                <Container>
                    {this.printDetail()}
                    {this.paidTransaction()}
                    <div className="div-hal">
                        <div className="div-hal2">
                            <div className="top-judul">
                                <p className="my-order">
                                    MY ORDER</p>
                                <div style={{ display: 'flex' }}>
                                    <UncontrolledDropdown>
                                        <DropdownToggle DropdownToggle nav caret className="order-status" style={{color: '#8C8582'}}>
                                            Order Status
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            {
                                                this.state.payment_status.map((item, index) => {
                                                    return (
                                                        // <DropdownItem onClick={() => { this.setState({ idpayment_status: item.id }) }}>
                                                        //     {item.title}
                                                        // </DropdownItem>
                                                        <DropdownItem onClick={() => this.handleStatus(item.id)}>
                                                            {item.title}
                                                        </DropdownItem>
                                                    )
                                                })
                                            }
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <Button style={{ marginBottom: '8px' }} size="sm" outline color="secondary"
                                        onClick={this.onBtReset}>
                                        Reset
                                    </Button>
                                </div>
                            </div>
                            <div className="complain">
                                <img className="ear" src={earphones} alt="..." width="35px" height="35px" />
                                <p className="complain-2">
                                    Jika mengalami kendala dengan orderan kamu, hubungi <span className="help">Help Center</span> kami.
                                </p>
                            </div>
                        </div>
                        {this.printUserTransaction()}
                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = ({ transactionsReducer }) => {
    return {
        transaction: transactionsReducer.transaction_list
    }
}

export default connect(mapStateToProps, { getTransaction })(UserTransactionPage);