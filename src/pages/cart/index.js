import axios from 'axios';
import React from 'react';
import { Container } from 'reactstrap';
import { URL_API } from '../../helper';
import { Button, Table, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getCart } from "../../actions"

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
                <tr style={{ border: '1px solid #DDDDDD' }}>
                    {/* <td>
                        <img src={item.images[0].images} alt="..." width="200vw" />
                    </td> */}
                    <td>
                        <div style={{ fontWeight: "bolder", textAlign: 'center' }}>Parcel {item.idparcel_type}</div>
                        {/* <div>{item.kategori}</div> */}
                        {/* <div>{item.type}</div>
                        <div><h4 style={{ fontWeight: "bolder" }}>{item.harga.toLocaleString()}</h4></div> */}
                    </td>
                    <td>
                        {
                            item.detail.map((el, idx) => {
                                return (
                                    <div>
                                        <tr>
                                            <td style={{ width: '30%' }}><img src={URL_API + '/static/images/' + el.url} alt="img" style={{ width: '150px', height: '150px' }} /></td>
                                            <td style={{ width: '30%' }}>
                                                <div style={{ fontSize: '16px', lineHeight: '20px', letterSpacing: '0.5px' }}>
                                                    {el.name}
                                                </div>
                                                <div style={{ color: 'gray', width: '170px' }}>{el.title}</div>
                                            </td>
                                            <td style={{ width: '30%', alignContent: 'center', paddingLeft: '10px' }}>
                                                <span style={{ width: '40%', display: 'flex', alignItems: 'center', border: '1px solid gray', height: '100%' }}>
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
                    <td style={{ fontSize: '15px', fontWeight: 'bold', textAlign: 'center' }}>
                        Rp. {item.subtotal.toLocaleString()}
                    </td>
                </tr>
            )
        })
    }

    totalQty = () => {
        return this.props.cart.map((item, index) => {
            item.detail.map((val, idx) => {
                return val.amount
            })
        }).reduce((a, b) => a + b, 0)
    }

    subTotalCart = () => {
        return this.props.cart.map((item, index) => {
            return item.subtotal
        }).reduce((a, b) => a + b, 0)
    }


    render() {
        return (
            <div>
                <Container>
                    <div style={{ borderBottom: "1px solid #E5E5E5", borderTop: "1px solid #E5E5E5", height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h2 style={{ fontSize: '24px', letterSpacing: '2px', lineHeight: '17px', }}>SHOPPING CART</h2>
                    </div>
                    <div className="row f-flex">
                        <div className="col-md-9">
                            <div className="mt-5" style={{ border: '1px solid #DDDDDD', borderRadius: '10px' }}>
                                <Table borderless>
                                    <thead>
                                        <tr style={{ border: '1px solid #DDDDDD' }}>
                                            {/* <th style={{textAlign: 'center'}}>gambar</th> */}
                                            <th style={{ fontSize: '16px', letterSpacing: '1px', lineHeight: '20px', textAlign: 'center' }}>PARCEL</th>
                                            <th style={{ fontSize: '16px', letterSpacing: '1px', lineHeight: '20px', textAlign: 'center' }}>PRODUCT</th>
                                            <th style={{ fontSize: '16px', letterSpacing: '1px', lineHeight: '20px', textAlign: 'center' }}>SUBTOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getDataCart()}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className="col-md-3 mt-5">
                            <div style={{ border: '1px solid #DDDDDD', margin: '0 0 20px 0', padding: '15px 15px 15px 15px', borderRadius: '10px' }}>
                                <h4 style={{ fontSize: '16px', letterSpacing: '1px', lineHeight: '20px' }}>ORDER</h4>
                                <div style={{ display: 'flex', borderBottom: '1px dashed #DDDDDD', justifyContent: 'space-between' }}>
                                    <h6 style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'left' }}>Total Parcel(s)</h6>

                                    <h6 style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'right', fontWeight: 'bold', }}>{this.props.cart.length}</h6>
                                </div>
                                <div style={{ borderBottom: '1px dashed #DDDDDD', paddingTop: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h6 style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'left' }}>Subtotal</h6>
                                        <h6 style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'right', fontWeight: 'bold', }}>Rp.{this.subTotalCart().toLocaleString()}</h6>
                                    </div>
                                    <p style={{ fontSize: '10px', fontStyle: 'italic' }}><span style={{ fontWeight: 'bold' }}>Tanpa biaya tambahan</span> <span>(belum termasuk ongkir)</span></p>
                                </div>
                                <div style={{ paddingTop: '10px' }}>
                                    <Button color="warning" block style={{ fontSize: '16px', letterSpacing: '1px', lineHeight: '20px' }}>Checkout</Button>
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
        id: authReducer.idtb_user,
        cart: authReducer.cart
    }
}

export default connect(mapStateToProps, { getCart })(CartPages);