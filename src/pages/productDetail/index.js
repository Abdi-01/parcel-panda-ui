import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Input, Modal, ModalBody } from 'reactstrap';
import { URL_API } from '../../helper';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { getCart } from "../../actions"

toast.configure()

class ProductDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: [],
            qty: 1,
            cart: [],
            type: [],
            idcart: [],
            detailCart: [],
            idparcel_type: [],
            modal: false,
            selectedIndex: null,
        }
    }

    componentDidMount() {
        this.getProductDetail()
        this.props.getCart()
        // this.getParcelType()
    }


    getProductDetail = () => {
        axios.get(URL_API + `/product/product-detail${this.props.location.search}`)
            .then(res => {
                console.log("detail product", res.data)
                this.setState({ detail: res.data[0] })
                console.log("Detail", this.state.detail)
            }).catch(err => console.log(err))
    }

    incrementQty = () => {
        if (this.state.qty < this.state.detail.stock) {
            return this.setState({ qty: this.state.qty + 1 })
        } else {
            toast.warn('Product out of stock!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        }
    }

    DecrementQty = () => {
        if (this.state.qty > 1) {
            return this.setState({ qty: this.state.qty - 1 })
        }
    }

    getParcelType = (index) => {
        let token = localStorage.getItem("tkn_id")
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.get(URL_API + `/transaction/getcart`, headers)
            .then(res => {
                this.setState({
                    cart: res.data, idcart: res.data[index].idcart,
                    detailCart: res.data[index].detail, idparcel_type: res.data[index].idparcel_type
                })
                axios.get(URL_API + `/parcel/getParcel-type?idparcel_type=${res.data[index].idparcel_type}`)
                    .then(res => {
                        console.log(res.data)
                        this.setState({ type: res.data })
                        console.log("TYPE", this.state.type)
                    }).catch(err => console.log(err))
            }).catch(err => console.log("get cart", err))
    }

    confirmParcel = () => {
        console.log(this.props.cart)
        return this.props.cart.map((item, index) => {
            return (
                <div style={{marginTop: '10px'}}>
                    <div className="detail-box">
                        <div className="row">
                            <div className="col-md-9">
                                <h6>Parcel {item.idparcel_type}</h6>
                                {
                                    item.detail.map((el, idx) => {
                                        return (
                                            <div>
                                                <p className="order">{el.name}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="col-md-3">
                                <Button outline color="warning" onClick={() => this.getParcelType(index)}>
                                    Select
                                </Button>
                            </div>
                        </div>
                        <Link className="btn btn-warning" onClick={() => this.onBtAddToParcel(index)}
                        to={`/cart/${this.props.id}`}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5%',width: '100%' }}>
                        <span class="material-icons" >
                            shopping_cart
                        </span>
                        <span>Add to Parcel</span></Link>
                    </div>
                </div>
            )
        })
    }

    onBtAddToParcel = (i) => {
        let idparcel_type = this.state.idparcel_type
        let idcart = this.state.idcart
        let idproduct = this.state.detail.id
        let idcategory = this.state.detail.idcategory
        let amount = this.state.qty
        let subtotal = this.state.qty * this.state.detail.price
        let token = localStorage.getItem("tkn_id")
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        console.log(idcart, idproduct, idcategory, amount, subtotal)
        if (this.state.type.length <= 0) {
            toast.warn('Choose Parcel First!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        } else {
            if (this.state.type.length > 1) {
                this.state.type.map((item, index) => {
                    if (item.idcategory === this.state.detail.idcategory) {
                        if (this.state.qty > item.max_qty) {
                            toast.error(`Pembelian melebihi batas, pembelian category ini max ${item.max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                        } else {
                            // Dicart category itu masih 0
                            console.log("111111")
                            if (this.state.detailCart.length === 0) {
                                axios.post(URL_API + `/transaction/addParcel`, {
                                    idparcel_type, idcart, idproduct, idcategory, amount, subtotal
                                }, headers)
                                    .then(res => {
                                        console.log(res.data)
                                        this.props.getCart(this.props.id)
                                        toast.success('Success add to parcel!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                    }).catch(err => console.log(err))
                            } else {
                                // Dicart kategory itu > 0
                                let qty_beli = []
                                this.state.detailCart.map(item => {
                                    if (item.idcategory === this.state.detail.idcategory) {
                                        qty_beli.push(item.amount)
                                    }
                                })
                                // di cart kategori itu qtynya udah belum ada
                                if (qty_beli.length === 0) {
                                    console.log("2222222")
                                    axios.post(URL_API + `/transaction/addParcel`, {
                                        idparcel_type, idcart, idproduct, idcategory, amount, subtotal
                                    }, headers)
                                        .then(res => {
                                            console.log(res.data)
                                            this.props.getCart(this.props.id)
                                            toast.success('Success add to parcel!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                        }).catch(err => console.log(err))
                                } else {
                                    let qty_beli = []
                                    this.state.detailCart.map(el => {
                                        if (el.idcategory === this.state.detail.idcategory) {
                                            qty_beli.push(el.amount)
                                        }
                                    })
                                    let idx = this.props.cart[i].detail.findIndex(item => item.idproduct === this.state.detail.id)
                                    console.log("INDEX", idx)
                                    if (idx >= 0) {
                                        this.props.cart[i].detail[idx].amount += this.state.qty
                                        let sum_qty_beli = qty_beli.reduce((val, sum) => {
                                            return val + sum
                                        })
                                        console.log("SUM PRODUCT SAMA", sum_qty_beli)
                                        if (sum_qty_beli + this.state.qty > item.max_qty) {
                                            toast.error(`Pembelian melebihi batas, pembelian category ini max ${item.max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                        } else if (sum_qty_beli === item.max_qty) {
                                            toast.error(`Pembelian melebihi batas, pembelian category ini max ${item.max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                        } else {
                                            axios.patch(URL_API + `/transaction/update-qty`, {
                                                amount: this.props.cart[i].detail[idx].amount, idproduct: idproduct, idcart: idcart
                                            }, headers)
                                                .then(res => {
                                                    console.log("Res Cart:", res.data)
                                                    this.props.getCart(this.props.id)
                                                }).catch(err => console.log(err))
                                        }
                                    } else {
                                        console.log("MASUK KESINI GA")
                                        let sum_qty_beli = qty_beli.reduce((val, sum) => {
                                            return val + sum
                                        })
                                        console.log("SUM CATEGORY SAMA", sum_qty_beli)
                                        let totalQTY = sum_qty_beli + this.state.qty
                                        console.log("CEK", totalQTY, item.max_qty)
                                        if (totalQTY > item.max_qty) {
                                            toast.error(`Pembelian melebihi batas, pembelian category ini max ${item.max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                        } else {
                                            console.log("33333")
                                            axios.post(URL_API + `/transaction/addParcel`, {
                                                idparcel_type, idcart, idproduct, idcategory, amount, subtotal
                                            }, headers)
                                                .then(res => {
                                                    console.log(res.data)
                                                    this.props.getCart(this.props.id)
                                                    toast.success('Success add to parcel!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                                }).catch(err => console.log(err))
                                        }
                                    }

                                }
                            }
                        }
                    }

                })
            } else {
                this.state.type.map((item, index) => {
                    if (item.idcategory === this.state.detail.idcategory) {
                        if (this.state.qty > item.max_qty) {
                            toast.error(`Pembelian melebihi batas, pembelian category ini max ${item.max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                        } else {
                            // Dicart category itu masih 0
                            console.log("444444")
                            if (this.state.detailCart.length === 0) {
                                axios.post(URL_API + `/transaction/addParcel`, {
                                    idparcel_type, idcart, idproduct, idcategory, amount, subtotal
                                }, headers)
                                    .then(res => {
                                        console.log(res.data)
                                        this.props.getCart(this.props.id)
                                        toast.success('Success add to parcel!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                    }).catch(err => console.log(err))
                            } else {
                                // Dicart kategory itu > 0
                                let qty_beli = []
                                this.state.detailCart.map(item => {
                                    if (item.idcategory === this.state.detail.idcategory) {
                                        qty_beli.push(item.amount)
                                    }
                                })
                                // di cart kategori itu qtynya udah belum ada
                                if (qty_beli.length === 0) {
                                    console.log("5555")
                                    axios.post(URL_API + `/transaction/addParcel`, {
                                        idparcel_type, idcart, idproduct, idcategory, amount, subtotal
                                    }, headers)
                                        .then(res => {
                                            console.log(res.data)
                                            this.props.getCart(this.props.id)
                                            toast.success('Success add to parcel!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                        }).catch(err => console.log(err))
                                } else {
                                    console.log("6666")
                                    let qty_beli = []
                                    this.state.detailCart.map(el => {
                                        if (el.idcategory === this.state.detail.idcategory) {
                                            qty_beli.push(el.amount)
                                        }
                                    })
                                    let idx = this.props.cart[i].detail.findIndex(item => item.idproduct === this.state.detail.id)
                                    console.log("INDEX", idx)
                                    if (idx >= 0) {
                                        this.props.cart[i].detail[idx].amount += this.state.qty
                                        let sum_qty_beli = qty_beli.reduce((val, sum) => {
                                            return val + sum
                                        })
                                        console.log("SUM PRODUCT SAMA", sum_qty_beli)
                                        if (sum_qty_beli + this.state.qty > item.max_qty) {
                                            toast.error(`Pembelian melebihi batas, pembelian category ini max ${item.max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                        } else if (sum_qty_beli === item.max_qty) {
                                            toast.error(`Pembelian melebihi batas, pembelian category ini max ${item.max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                        } else {
                                            axios.patch(URL_API + `/transaction/update-qty`, {
                                                amount: this.props.cart[i].detail[idx].amount, idproduct: idproduct, idcart: idcart
                                            }, headers)
                                                .then(res => {
                                                    console.log("Res Cart:", res.data)
                                                    this.props.getCart(this.props.id)
                                                }).catch(err => console.log(err))
                                        }
                                    } else {
                                        console.log("MASUK KESINI GA")
                                        let sum_qty_beli = qty_beli.reduce((val, sum) => {
                                            return val + sum
                                        })
                                        console.log("SUM CATEGORY SAMA", sum_qty_beli)
                                        let totalQTY = sum_qty_beli + this.state.qty
                                        console.log("CEK", totalQTY, item.max_qty)
                                        if (totalQTY > item.max_qty) {
                                            toast.error(`Pembelian melebihi batas, pembelian category ini max ${item.max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                        } else {
                                            console.log("33333")
                                            axios.post(URL_API + `/transaction/addParcel`, {
                                                idparcel_type, idcart, idproduct, idcategory, amount, subtotal
                                            }, headers)
                                                .then(res => {
                                                    console.log(res.data)
                                                    this.props.getCart(this.props.id)
                                                    toast.success('Success add to parcel!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                                }).catch(err => console.log(err))
                                        }
                                    }
                                }
                            }

                        }
                    } else {
                        toast.warn('Product yg ada pilih tidak sesuai dengan Parcel kategori', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                    }
                })
            }

        }
    }

    render() {
        console.log(this.props.id)
        return (
            <div>
                <Container>
                    <div>
                        <Modal isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }) }}>
                            <ModalBody>
                                <Container>
                                    <h2 style={{ fontSize: '17px', letterSpacing: '1px', fontWeight: '500', marginTop: '10px' }}>
                                        PLEASE CHOOSE YOUR PARCEL
                                    </h2>
                                    {this.confirmParcel()}
                                </Container>
                            </ModalBody>
                        </Modal>
                    </div>
                    <div>
                        <p style={{ display: 'flex', color: 'gray' }}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'gray' }}>Home</Link>
                            <span class="material-icons">
                                chevron_right
                            </span>
                            <Link to={`/product?idcategory=${this.state.detail.idcategory}`} style={{ textDecoration: 'none', color: 'gray' }}>{this.state.detail.category}</Link>
                            <span class="material-icons">
                                chevron_right
                            </span>
                            {this.state.detail.name}
                        </p>
                    </div>
                    <div className="row p-5" style={{
                        borderRadius: "15px",
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                        <div className="col-md-5">
                            <img alt="..." src={URL_API + '/static/images/' + this.state.detail.url}
                                width="80%" />
                        </div>
                        <div className="col-md-7" style={{ color: 'gray', alignSelf: 'center' }}>
                            <div>
                                <h4>{this.state.detail.name}</h4>
                                <p>Deskripsi Produk:</p>
                                <p>{this.state.detail.name}</p>
                                <p>Kategori: {this.state.detail.category}</p>
                            </div>
                            <div className="d-flex align-item-center">
                                <Button onClick={this.DecrementQty} size="sm" outline color="warning">
                                    <span class="material-icons" style={{ fontSize: '12px' }}>
                                        remove
                                    </span>
                                </Button>
                                <Input size="sm" style={{ width: '40px', marginLeft: '5px', marginRight: '5px' }}
                                    innerRef={elemen => this.addQty = elemen} value={this.state.qty} />
                                <Button onClick={this.incrementQty} size="sm" outline color="warning">
                                    <span class="material-icons" style={{ fontSize: '12px' }}>
                                        add
                                    </span>
                                </Button>
                            </div>
                            <Button style={{ marginTop: '5%' }} size="sm" color="warning" onClick={() => { this.setState({ modal: !this.state.modal }) }}>
                                Select
                            </Button>
                            {/* <Link className="btn btn-warning" onClick={this.onBtAddToParcel}
                                to={`/cart/${this.props.id}`}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5%', width: '70%' }}>
                                <span class="material-icons" >
                                    shopping_cart
                                </span>
                                <span> Add to Parcel</span></Link> */}
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.id,
        cart: authReducer.cart
    }
}

export default connect(mapStateToProps, { getCart })(ProductDetailPage);