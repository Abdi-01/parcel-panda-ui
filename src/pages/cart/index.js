import React from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';
import { URL_API } from '../../helper';
import { Table, Input, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getCart, getProfile, updateCart } from "../../actions"
import { toast } from 'react-toastify';
import "../cart/cartPage.css"
toast.configure()

class CartPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            type: [],
            idparcel_type: [],
            idcart: [],
            detailCart: [],
            idcartEdit: [],
            parcel_type: []
        }
    }

    componentDidMount() {
        this.props.getCart()
    }

    incrementQty = (idx, index, idcategory) => {
        if (this.state.type.length < 0) {
            toast.warn(`Klik icon Edit sebelum menambahkan!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        } else {
            let { cart, updateCart } = this.props
            cart[index].detail[idx].amount += 1
            if (this.state.type.length === 1) {
                // cart[index].detail[idx].amount += 1
                this.state.type.map((item, i) => {
                    let qty_beli = []
                    console.log(this.state.detailCart)
                    cart[index].detail.map(el => {
                        if (item.idcategory === el.idcategory) {
                            qty_beli.push(el.amount)
                        }
                    })
                    console.log('qty beli', qty_beli)
                    let sum_qty_beli = qty_beli.reduce((val, sum) => {
                        return val + sum
                    })
                    console.log("BRP NI", sum_qty_beli)
                    // console.log("BRP NI", cart[index].detail[idx].amount, item.max_qty)
                    if (sum_qty_beli > item.max_qty) {
                        toast.error(`Pembelian melebihi batas, pembelian category ini max ${item.max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                    } else {
                        updateCart({ amount: cart[index].detail[idx].amount, idproduct: cart[index].detail[idx].idproduct, idcart: cart[index].idcart })
                    }
                })
            } else if (this.state.type.length > 1) {
                // console.log(idcategory)
                let i = this.state.type.findIndex(item => item.idcategory === idcategory)
                console.log("IDX CATEGORY", i)
                console.log("MAX QTY", this.state.type[i].max_qty)
                console.log("DETAIL CART", cart[index].detail)
                // let val = cart[index].detail.findIndex(item => item.idcategory === idcategory)
                // console.log(val)
                let qty_beli = []
                cart[index].detail.map(el => {
                    if (el.idcategory === idcategory) {
                        qty_beli.push(el.amount)
                    }
                })
                console.log('qty beli', qty_beli)
                let sum_qty_beli = qty_beli.reduce((val, sum) => {
                    return val + sum
                })
                console.log("BRP NI", sum_qty_beli, cart[index].detail[idx].amount)
                if (sum_qty_beli > this.state.type[i].max_qty) {
                    toast.error(`Pembelian melebihi batas, pembelian category ini max ${this.state.type[i].max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                } else {
                    updateCart({ amount: cart[index].detail[idx].amount, idproduct: cart[index].detail[idx].idproduct, idcart: cart[index].idcart })
                }
                // let qty_beli = []
                // this.state.type.map((item, i) => {
                //     console.log(this.state.detailCart)
                //     cart[index].detail.map(el => {
                //         if (item.idcategory === el.idcategory) {
                //             qty_beli.push(el.amount)
                //         }
                //     })
                //     console.log('qty beli', qty_beli)
                //     let sum_qty_beli = qty_beli.reduce((val, sum) => {
                //         return val + sum
                //     })
                //     console.log("BRP NI", sum_qty_beli)
                //     // console.log("BRP NI", cart[index].detail[idx].amount, item.max_qty)
                //     if (sum_qty_beli > item.max_qty) {
                //         toast.error(`Pembelian melebihi batas, pembelian category ini max ${item.max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                //     } 
                //     else {
                //         toast.success(`OK!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                //         // updateCart({ amount: cart[index].detail[idx].amount, idproduct: cart[index].detail[idx].idproduct, idcart: cart[index].idcart })
                //     }
                // })
            }
        }
    }

    DecrementQty = (idx, index) => {
        if (this.state.type.length < 0) {
            toast.warn(`Klik icon Edit sebelum menambahkan!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        } else {
            let { cart, updateCart } = this.props
            cart[index].detail[idx].amount -= 1
            updateCart({ amount: cart[index].detail[idx].amount, idproduct: cart[index].detail[idx].idproduct, idcart: cart[index].idcart })
        }
    }

    deleteCart = (idcart) => {
        let token = localStorage.getItem("tkn_id")
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.patch(URL_API + `/transaction/del-cart`, {
            idcart: idcart
        }, headers)
            .then(res => {
                console.log(res.data)
                this.props.getCart(this.props.id)
            }).catch(err => console.log(err))
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

    getDataCart = () => {
        console.log("YUHUU", this.props.cart)
        return this.props.cart.map((item, index) => {
            return (
                <tr className="box-cart">
                    <td>
                        <div className="cart-name">Parcel {item.idparcel_type}</div>
                    </td>
                    <td>
                        {
                            item.detail.map((el, idx) => {
                                return (
                                    <div >
                                        <tr>
                                            <td className="td-detail" style={{padding: '10px'}}><img src={URL_API + '/static/images/' + el.url} alt="img" style={{ width: '150px', height: '150px' }} /></td>
                                            <td style={{ width: '30%' }}>
                                                <div style={{ fontSize: '16px', lineHeight: '20px', letterSpacing: '0.5px' }}>
                                                    {el.name}
                                                </div>
                                                <div style={{ color: 'gray', width: '170px' }}>{el.title}</div>
                                            </td>
                                            <td style={{ width: '30%', alignContent: 'center', paddingLeft: '20px' }}>
                                                <span style={{ width: '60%', display: 'flex', alignItems: 'center', border: '1px solid gray', height: '100%' }}>
                                                    <span onClick={() => this.DecrementQty(idx, index)} class="material-icons" >
                                                        remove
                                                    </span>
                                                    <Input size="sm" placeholder="qty" style={{ width: '60%', display: 'inline-block' }}
                                                        innerRef={elemen => this.addQty = elemen} value={el.amount} />
                                                    <span onClick={() => this.incrementQty(idx, index, el.idcategory)} class="material-icons">
                                                        add
                                                    </span>
                                                </span>
                                            </td>
                                        </tr>
                                    </div>
                                )
                            })
                        }
                    </td>
                    <td className="det-subtotal">
                        Rp. {item.subtotal.toLocaleString()}
                    </td>
                    <td>
                        <Button outline color="warning" size="sm"
                            onClick={() => this.getParcelType(index)}>
                            <span class="material-icons" size="18dp" >
                                edit
                            </span>
                        </Button> <br />
                        <Button outline color="warning" size="sm"
                            onClick={() => this.deleteCart(item.idcart)}>
                            <span class="material-icons" size="18dp" >
                                delete
                            </span>
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    totalQty = () => {
        return this.props.cart.map((item, index) => {
            return item.detail.map((val, idx) => {
                return val.amount
            }).reduce((a, b) => a + b, 0)
        }).reduce((a, b) => a + b, 0)
    }

    subTotalCart = () => {
        return this.props.cart.map((item, index) => {
            return item.subtotal
        }).reduce((a, b) => a + b, 0)
    }

    handleToCheckOut = () => {
        if (this.totalQty() < this.props.cart.length * 5) {
            toast.warn('Kuantity anda kurang, pilih produk lagi!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        }
    }


    render() {
        return (
            <div style={{minHeight: '100%', height: '100%'}}>
                <Container>
                    <div className="cart-judul">
                        <h2 className="shopping-cart">SHOPPING CART</h2>
                    </div>
                    <div className="row f-flex">
                        <div className="col-md-9">
                            <div className="mt-5 table-cart" >
                                <Table borderless>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #DDDDDD' }}>
                                            {/* <th style={{textAlign: 'center'}}>gambar</th> */}
                                            <th className="th-cart">PARCEL</th>
                                            <th className="th-cart">PRODUCT</th>
                                            <th className="th-cart">SUBTOTAL</th>
                                            <th className="th-cart">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getDataCart()}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className="col-md-3 mt-5">
                            <div className="box-sum">
                                <h4 className="sum-order">ORDER</h4>
                                <div className="sum-total">
                                    <h6 className="h6-total">Total Parcel(s)</h6>
                                    <h6 className="h6-hasil">{this.totalQty()}</h6>
                                </div>
                                <div className="sum-2">
                                    <div className="sum-2x">
                                        <h6 className="h6-total">Subtotal</h6>
                                        <h6 className="h6-hasil">Rp.{this.subTotalCart().toLocaleString()}</h6>
                                    </div>
                                    <p className="sum-ongkir"><span style={{ fontWeight: 'bold' }}>Tanpa biaya tambahan</span> <span>(belum termasuk ongkir)</span></p>
                                </div>
                                <div style={{ paddingTop: '10px' }}>
                                    <Link 
                                    onClick={() => this.handleToCheckOut()} 
                                    to={
                                        this.totalQty() === this.props.cart.length * 5 ?
                                        `/checkout/${this.props.id}`: false} className="btn btn-warning btn-block" style={{ fontSize: '13px', letterSpacing: '2px', lineHeight: '18px', }}>
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

const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.id,
        cart: authReducer.cart
    }
}

export default connect(mapStateToProps, { getCart, getProfile, updateCart })(CartPages);