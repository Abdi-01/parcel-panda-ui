import React from 'react';
import { Container } from 'reactstrap';
import { URL_API } from '../../helper';
import { Table, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getCart, getProfile } from "../../actions"
import { toast } from 'react-toastify';
import "../cart/cartPage.css"
toast.configure()

class CartPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
    }

    componentDidMount() {
        this.props.getCart()
    }

    getDataCart = () => {
        console.log("YUHUU", this.props.cart)
        return this.props.cart.map((item, index) => {
            return (
                <tr className="box-cart">
                    {/* <td>
                        <img src={item.images[0].images} alt="..." width="200vw" />
                    </td> */}
                    <td>
                        <div className="cart-name">Parcel {item.idparcel_type}</div>
                    </td>
                    <td>
                        {
                            item.detail.map((el, idx) => {
                                return (
                                    <div>
                                        <tr>
                                            <td className="td-detail"><img src={URL_API + '/static/images/' + el.url} alt="img" style={{ width: '150px', height: '150px' }} /></td>
                                            <td style={{ width: '30%' }}>
                                                <div style={{ fontSize: '16px', lineHeight: '20px', letterSpacing: '0.5px' }}>
                                                    {el.name}
                                                </div>
                                                <div style={{ color: 'gray', width: '170px' }}>{el.title}</div>
                                            </td>
                                            <td style={{ width: '30%', alignContent: 'center', paddingLeft: '20px' }}>
                                                <span style={{ width: '50%', display: 'flex', alignItems: 'center', border: '1px solid gray', height: '100%' }}>
                                                    <span onClick={() => this.DecrementQty(idx)} class="material-icons" >
                                                        remove
                                                    </span>
                                                    <Input size="sm" placeholder="qty" style={{ width: '60%', display: 'inline-block' }}
                                                        innerRef={elemen => this.addQty = elemen} value={el.amount} />
                                                    <span onClick={() => this.incrementQty(idx)} class="material-icons">
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

    handleToCheckOut =() => {
        if(this.totalQty() < this.props.cart.length * 5){
            toast.warn('Kuantity anda kurang, pilih produk lagi!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        } 
        else {
            this.props.getCart(this.props.id)
        }
    }


    render() {
        return (
            <div>
                <Container>
                    <div className="cart-judul">
                        <h2 className="shopping-cart">SHOPPING CART</h2>
                    </div>
                    <div className="row f-flex">
                        <div className="col-md-9">
                            <div className="mt-5 table-cart" >
                                <Table borderless>
                                    <thead>
                                        <tr style={{ border: '1px solid #DDDDDD' }}>
                                            {/* <th style={{textAlign: 'center'}}>gambar</th> */}
                                            <th className="th-cart">PARCEL</th>
                                            <th className="th-cart">PRODUCT</th>
                                            <th className="th-cart">SUBTOTAL</th>
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
                                    <Link onClick={() => this.handleToCheckOut()} to={`/checkout/${this.props.id}`} className="btn btn-warning btn-block" style={{ fontSize: '13px', letterSpacing: '2px', lineHeight: '18px', }}>
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

export default connect(mapStateToProps, { getCart, getProfile})(CartPages);