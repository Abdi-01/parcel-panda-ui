import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody } from 'reactstrap';
import earphones from "../../asset/img/earphones.png"
import { getTransaction } from "../../actions"
// import { Dialog } from 'primereact/dialog';
import { URL_API } from "../../helper"
import { toast } from 'react-toastify';
import axios from 'axios';

toast.configure()

class UserTransactionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayBasic2: false,
            idpayment_status: [],
            transaction: [],
            payment_status: [],
            selectedIndex: null,
            modal: false
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
                this.setState({ transaction: res.data })
            }).catch(err => {
                console.log(err)
            })
    }

    handleStatus = (id) => {
        console.log("id", id)
        let dataFilter = this.state.transaction.filter((item) => item.idpayment_status === id)
        console.log("cek", dataFilter)
        if (dataFilter.length === 0) {
            toast.warn('Hey 👋 Transaksi tidak tersedia!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        } else {
            toast.success('Hey 👋 Success!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })

            // this.setState({ transaction: dataFilter })
        }
    }


    printUserTransaction = () => {
        console.log(this.state.transaction)
        // console.log(this.state.idpayment_status)
        return this.state.transaction.map((item, index) => {
            return (
                <div className="mt-3" style={{ padding: '15px 15px 10px 15px', border: '1px solid #DDDDDD', backgroundColor: 'white', borderRadius: '5px' }}>
                    <div className="row" style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between', borderBottom: '1px solid #DDDDDD' }}>
                        <div className="col-md-6">
                            <h6>{item.invoice}</h6>
                            <p style={{ fontSize: '14px' }}>Order at <span style={{ fontWeight: 'bold', borderRight: '1px solid #DBDBDB', paddingRight: '10px' }}>Parelpanda </span>
                                <span style={{ paddingLeft: '10px' }}>{item.amount} parcel purchased</span></p>
                        </div>
                        <div className="col-md-6">
                            <div className="row d-flex">
                                <div className="col-md-6">
                                    <p><span>Order Status</span><br />
                                        <span style={{ fontSize: '14px' }}>{item.title}</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p>Total Payment<br />
                                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Rp.{item.total_payment.toLocaleString()}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ display: 'flex', alignContent: 'center', paddingTop: '15px' }}>
                        <div className="col-md-6">
                            <div className="row d-flex">
                                <div className="col-md-8">
                                    <h6 style={{ fontSize: '15px', letterSpacing: '1.5px', lineHeight: '17px' }}>{item.invoice}</h6>
                                    <p style={{ fontSize: '13px', lineHeight: '17px' }}><span>Date transaction: {item.date_transaction}</span>
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
                                            <Button style={{ marginLeft: '10px' }} color="warning" onClick={() => this.setState({ selectedIndex: index, modal: !this.state.modal })}>Detail</Button>
                                            :
                                            <>
                                                <Button color="warning">Paid</Button>
                                                <Button style={{ marginLeft: '10px' }} color="warning" onClick={() => this.setState({ selectedIndex: index, modal: !this.state.modal })}>Detail</Button>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row d-flex">
                                <div className="col-md-6">
                                    <p><span style={{ fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>Delivery Address</span><br />
                                        <span style={{ fontSize: '14px' }}>{item.address}</span></p>
                                    <p><span style={{ fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>Phone Number</span><br />
                                        <span style={{ fontSize: '14px' }}>{item.phone_number}</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p><span style={{ fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>Shipping Cost</span><br />
                                        <span style={{ fontSize: '14px' }}>Rp. {item.ongkir.toLocaleString()}</span></p>
                                    <p><span style={{ fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>Subtotal</span><br />
                                        <span style={{ fontSize: '14px' }}>Rp.{item.subtotal_parcel.toLocaleString()}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    printDetail = () => {
        return this.state.transaction.map((item, index) => {
            if (this.state.selectedIndex === index) {
                return (
                    <div>
                        <Modal isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }) }}>
                            <ModalBody>
                                <div style={{ padding: '15px 15px 10px 15px', border: '1px solid #DDDDDD', backgroundColor: 'white', borderRadius: '5px' }}>
                                    <h6>{item.invoice}</h6>
                                    <p style={{ fontSize: '14px' }}>Order at <span style={{ fontWeight: 'bold', borderRight: '1px solid #DBDBDB', paddingRight: '10px' }}>Parelpanda </span>
                                        <span style={{ paddingLeft: '10px' }}>{item.amount} parcel purchased</span></p>
                                </div>
                                <div style={{ padding: '15px 15px 10px 15px', border: '1px solid #DDDDDD', backgroundColor: 'white', borderRadius: '5px', marginTop: '10px' }}>
                                    {
                                        item.detail.map((el, idx) => {
                                            return (
                                                <div className="row" style={{ borderBottom: '1px solid #DDDDDD', }}>
                                                    <div className="col-md-3 mt-3">
                                                        <img src={URL_API + '/static/images/' + el.url} alt="img" style={{ width: '70px', height: '70px', marginLeft: '15px', marginTop: '5px' }} />
                                                    </div>
                                                    <div className="col-md-9 mt-3">
                                                        <p><span style={{ fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>Parcel {el.parcel}</span><br />
                                                            <span style={{ fontSize: '16px', lineHeight: '20px', letterSpacing: '0.5px' }}>{el.name}</span><br />
                                                            <span style={{ color: 'gray', fontSize: '14px' }}>{el.title}</span><br />
                                                            <span style={{ color: 'gray', fontSize: '14px' }}>Quantity: {el.amount}</span></p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </ModalBody>
                        </Modal>
                        {/* <Dialog header="Transaction Detail" visible={this.state.displayBasic2} style={{ width: '50vw' }} footer={this.renderFooter('displayBasic2')} onHide={() => this.onHide('displayBasic2')}>
                            
                        </Dialog> */}
                    </div>
                )
            }
        })
    }

    onBtReset = () => {
        window.location.reload()
    }

    render() {
        return (
            <div style={{ backgroundColor: '#f7eaa3', marginBottom: '-50px' }}>
                <Container>
                    {this.printDetail()}
                    <div style={{ padding: '20px 0 20px 0', }}>
                        <div style={{ padding: '15px 15px 10px 15px', border: '1px solid #DDDDDD', backgroundColor: 'white', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between', borderBottom: '1px solid #DDDDDD' }}>
                                <p style={{ fontSize: '16px', letterSpacing: '2px', lineHeight: '20px', fontWeight: 'bold' }}>
                                    MY ORDER</p>
                                <div style={{ display: 'flex' }}>
                                    <UncontrolledDropdown>
                                        <DropdownToggle DropdownToggle nav caret style={{ fontSize: '14px', letterSpacing: '1px', lineHeight: '16px', whiteSpace: 'nowrap', color: '#8C8582' }}>
                                            Order Status
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            {
                                                this.state.payment_status.map((item, index) => {
                                                    return (
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
                            <div style={{ display: 'flex', alignContent: 'center' }}>
                                <img style={{ marginTop: '8px' }} src={earphones} alt="..." width="35px" height="35px" />
                                <p style={{ fontSize: '13px', lineHeight: '16px', padding: '10px 0 0 10px', marginTop: '8px' }}>
                                    Jika mengalami kendala dengan orderan kamu, hubungi <span style={{ color: '#FAB629' }}>Help Center</span> kami.
                                </p>
                            </div>
                        </div>
                        {this.printUserTransaction()}
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