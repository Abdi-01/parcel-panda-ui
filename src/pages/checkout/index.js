import React from 'react';
import { Button, Container, Modal, ModalBody, Table } from 'reactstrap';
import { Link } from "react-router-dom";
import truck from "../../asset/img/truck.png"
import { connect } from 'react-redux';
import { getProfile, getCart, getTransaction } from "../../actions"
import axios from 'axios';
import { URL_API } from '../../helper';
import "../checkout/checkOutPage.css"
import { toast } from 'react-toastify';

toast.configure()

class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: null,
            isOpen: false,
            modal: false,
            address: [],
            destination: [],
            origin: 152,
            ongkir: [],
            addressFix: [],
            cart_detail: []
        }
    }

    componentDidMount() {
        this.props.getCart()
        this.getDataAddress()
        this.getAddress()
        this.getDataCart()
        this.getCartDetail()
    }

    getDataAddress = () => {
        let token = localStorage.getItem("tkn_id")
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.get(URL_API + `/profile`, headers)
            .then(res => {
                console.log("ADDRESS", res.data[0].address)
                this.setState({ address: res.data[0].address })
            }).catch(err => console.log(err))
    }

    getAddress = () => {
        let address = this.state.address.filter((item, index) => index === this.state.selectedIndex)
        console.log("ADDRESS", address)
        return address.map((item, index) => {
            return (
                <p style={{ fontSize: '14px', lineHeight: '20px', width: '385px' }}>
                    <span style={{ fontWeight: 'bold' }}>{item.recipient_name}, </span>
                    <span>{item.address} <span>{item.postal_code}</span></span>
                    <br /><span>{item.phone_number}</span>
                </p>
            )
        })
    }

    handleOtherAddress = () => {
        return this.state.address.map((item, index) => {
            return (
                <div className="box-address">
                    <h4 style={{ fontSize: '12px', letterSpacing: '1px', lineHeight: '16px', color: '#8C8582' }}>MY ADDRESS</h4>
                    <p style={{ fontSize: '14px', lineHeight: '20px', width: '385px' }}>
                        <span style={{ fontWeight: 'bold' }}>{item.recipient_name}, </span>
                        <span>{item.address} <span>{item.postal_code}</span></span>
                        <br /><span>{item.phone_number}</span>
                    </p>
                    <div style={{ borderTop: '1px dashed #DDDDDD', paddingTop: '10px' }}>
                        <Button onClick={() => this.setState({ selectedIndex: index, destination: item.idcity }, this.getOngkir(item.idcity))} outline color="warning">Select</Button>
                    </div>
                </div>
            )
        })
    }

    getOngkir = (id) => {
        let cart = this.props.cart.length
        console.log("origin", this.state.origin)
        console.log("destination", id)
        console.log("weight", cart * 1000)
        axios.post(URL_API + `/ongkir/cost`, {
            origin: this.state.origin,
            destination: id,
            weight: cart * 1000,
        }).then(res => {
            console.log("ONGKIR", res.data)
            console.log("FIX", res.data[1].cost[0].value)
            this.setState({ ongkir: res.data[1]?.cost[0]?.value })
        }).catch(err => console.log("err ongkir", err))
    }

    subTotalCart = () => {
        return this.props.cart.map((item, index) => {
            return item.subtotal
        }).reduce((a, b) => a + b, 0)
    }

    subTotalProduk = () => {
        return this.props.cart.map((item, index) => {
            return item.detail.map((val, idx) => {
                return val.subtotal
            }).reduce((a, b) => a + b, 0)
        }).reduce((a, b) => a + b, 0)
    }

    getInvoice = () => {
        let inv = Date.now()
        let inv2 = inv.toString()
        let inv3 = parseInt(inv2.slice(0, 8))
        return `#PP/${inv3}`
    }

    getDataCart = () => {
        console.log("YUHUU", this.props.cart)
        return this.props.cart.map((item, index) => {
            return (
                <tr >
                    <td>
                        <div style={{ fontWeight: "bolder", textAlign: 'center' }}>Parcel {item.idparcel_type}</div>
                    </td>
                    <td>
                        {
                            item.detail.map((el, idx) => {
                                return (
                                    <div>
                                        <tr>
                                            <td style={{ width: '30%', padding: '10px' }}><img src={URL_API + '/static/images/' + el.url} alt="img" style={{ width: '150px', height: '150px' }} /></td>
                                            <td style={{ width: '30%' }}>
                                                <div style={{ fontSize: '16px', lineHeight: '20px', letterSpacing: '0.5px' }}>
                                                    {el.name}
                                                </div>
                                                <div style={{ color: 'gray', width: '170px' }}>{el.title}</div>
                                                <div style={{ color: 'gray', width: '170px' }}>Quantity: {el.amount}</div>
                                            </td>
                                        </tr>
                                    </div>
                                )
                            })
                        }
                    </td>
                    <td style={{ fontSize: '15px', fontWeight: 'bold', textAlign: 'center' }}>
                        Rp. {item.subtotal.toLocaleString()}
                    </td>
                </tr>
            )
        })
    }

    getCartDetail = () => {
        let token = localStorage.getItem("tkn_id")
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.get(URL_API + `/transaction/getcart-detail`, headers)
            .then(res => {
                console.log("cart detail", res.data)
                this.setState({ cart_detail: res.data })
            }).catch(err => console.log("get cart detail error", err))
    }

    onBtCheckOut = () => {
        console.log("cart", this.props.cart)
        console.log("cart detail", this.state.cart_detail)
        console.log("product", this.props.product)
        console.log("SELECTED IDX", this.state.selectedIndex)
        if (this.state.selectedIndex === null) {
            toast.warn('Pilih alamat Pengiriman!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        } else {
            let detail = this.state.cart_detail
            let invoice = this.getInvoice()
            let idaddress = this.state.address[this.state.selectedIndex].id
            let amount = this.props.cart.length
            let subtotal_product = this.subTotalProduk()
            let subtotal_parcel = this.subTotalCart()
            let ongkir = this.state.ongkir
            let total_payment = subtotal_parcel + ongkir
            let idpayment_status = 2
            console.log(invoice, idaddress, amount, subtotal_product, subtotal_parcel, ongkir, total_payment, idpayment_status, detail)

            this.state.cart_detail.forEach((item, index) => {
                this.props.product.forEach((value, idx) => {
                    if (item.idproduct === value.id) {
                        value.stock -= item.amount
                        console.log("STOCK TERKINI KAK", value.stock)

                        axios.patch(URL_API + `/product/manage-stock/${value.id}`, {
                            stock: value.stock
                        }).then(res => {
                            console.log("pengurangan stock", res.data)
                        }).catch(err => console.log("pengurangan stock err", err))
                    }
                })
            })

            let token = localStorage.getItem("tkn_id")
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }

            axios.post(URL_API + `/transaction/checkout`, {
                invoice, idaddress, amount, subtotal_product, subtotal_parcel, ongkir, total_payment, idpayment_status, detail
            }, headers)
                .then(res => {
                    console.log("POST", res.data)
                    this.props.getCart(this.props.id)
                    this.props.getTransaction(this.props.id)
                }).catch(err => console.log("post trans", err))
        }
    }



    render() {
        console.log(this.state.address, "ADDRESS", this.props.cart, this.state.destination)
        return (
            <div>
                <Container>
                    <div className="judul-confirm">
                        <h2 className="h2-confirm">CONFIRMATION</h2>
                    </div>
                    {/* MODAL ALAMAT */}
                    <Modal isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }) }}>
                        <ModalBody>
                            <Container>
                                <div>
                                    <h4 className="h4-pilihalamat">PILIH ALAMAT</h4>
                                </div>
                                <div className="div-alamat">
                                    <p className="p-alamat">
                                        alamat tersimpan</p>
                                    <Link to={`/user-profile`} style={{ fontSize: '14px', lineHeight: '18px', color: '#FAB629', textDecoration: 'none' }}>+Tambah Alamat</Link>
                                </div>
                                {this.handleOtherAddress()}
                            </Container>
                        </ModalBody>
                    </Modal>

                    <div className="row d-flex">
                        {/* ALAMAT */}
                        <div className="col-md-9">
                            <div className="mt-5 box-alamat-fix" >
                                <div style={{ height: '40px' }}>
                                    <h2 className="h2-alamat-pengiriman">ALAMAT PENGIRIMAN</h2>
                                </div>
                                <div className="div-alamat2">
                                    <p className="p-my-address">MY ADDRESS</p>
                                    <Button outline color="warning" size="sm" onClick={() => {
                                        this.setState({ modal: !this.state.modal });
                                    }}>Pilih alamat</Button>
                                </div>
                                <div className="div-get-address">
                                    {this.getAddress()}
                                </div>
                                <div style={{ paddingTop: '8px' }}>
                                    <Link to={`/user-profile`} style={{ textDecoration: 'none solid rgb(34, 34, 34)', fontSize: '14px', color: 'black', fontWeight: 'bold' }}>
                                        Tambah alamat baru
                                    </Link>
                                </div>
                            </div>

                            {/* METODE PENGIRIMAN */}
                            <div className="mt-5 box-alamat-fix">
                                <div className="h-alamat">
                                    <h2 className="h2-alamat-pengiriman">METODE PENGIRIMAN</h2>
                                </div>
                                <div className="box-pengiriman">
                                    <img src={truck} alt="..." width="65px" height="65px" />
                                    <div style={{ paddingLeft: '10px' }}>
                                        <h6 className="h6-shipping">
                                            Regular Shipping
                                        </h6>
                                        <p className="p-estimasi">
                                            Estimasi Pengiriman: 3-5 hari kerja setelah tanggal konfirmasi pembayaran atau pembayaran sukses.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* RINGKASAN ORDER */}
                            <div className="mt-5 box-ro">
                                <div className="h-alamat">
                                    <h2 className="h2-ro">RINGKASAN ORDER</h2>
                                </div>
                                <div>
                                    <Table borderless>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.getDataCart()}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>

                        </div>

                        {/* SUMMARY ORDER */}
                        <div className="col-md-3 mt-5">
                            <div className="box-ro">
                                <h4 className="h4-so">SUMMARY ORDER</h4>
                                <div style={{ display: 'flex', borderBottom: '1px dashed #DDDDDD', justifyContent: 'space-between' }}>
                                    <h6 style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'left' }}>
                                        Subtotal
                                    </h6>
                                    <h6 style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'right', fontWeight: 'bold', }}>
                                        Rp. {this.subTotalCart().toLocaleString()}
                                    </h6>
                                </div>
                                <div style={{ borderBottom: '1px dashed #DDDDDD', paddingTop: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h6 style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'left' }}>
                                            Shipping Cost</h6>
                                        <h6 style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'right', fontWeight: 'bold', }}>
                                            Rp.{this.state.ongkir.toLocaleString()}</h6>
                                    </div>
                                </div>
                                <div style={{ borderBottom: '1px dashed #DDDDDD', paddingTop: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h6 style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'left' }}>
                                            TOTAL</h6>
                                        <h6 style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'right', fontWeight: 'bold', }}>
                                            Rp.{(this.subTotalCart() + this.state.ongkir).toLocaleString()}</h6>
                                    </div>
                                    <p style={{ fontSize: '10px', fontStyle: 'italic' }}><span style={{ fontWeight: 'bold' }}>Tanpa biaya tambahan</span></p>
                                </div>
                                <div style={{ paddingTop: '10px' }}>
                                    <Link onClick={this.onBtCheckOut} to={this.state.selectedIndex !== null ? `/user-transaction/${this.props.id}`: false} className="btn btn-warning btn-block" style={{ fontSize: '13px', letterSpacing: '2px', lineHeight: '18px', }}>
                                        PROCEED TO CHECKOUT
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer, productReducers }) => {
    return {
        id: authReducer.id,
        profile: authReducer.profile,
        cart: authReducer.cart,
        product: productReducers.products_list
    }
}

export default connect(mapStateToProps, { getProfile, getCart, getTransaction })(CheckoutPage);