import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Input } from 'reactstrap';
import { URL_API } from '../../helper';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

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
            detailCart: []
        }
    }

    componentDidMount() {
        this.getProductDetail()
    }


    getProductDetail = () => {
        axios.get(URL_API + `/product-manage/product-detail${this.props.location.search}`)
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
            alert('Product out of stock')
        }
    }

    DecrementQty = () => {
        if (this.state.qty > 1) {
            return this.setState({ qty: this.state.qty - 1 })
        }
    }

    render() {
        return (
            <div>
                <Container>
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
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }}>
                        <div className="col-md-5">
                            <img src={URL_API + '/static/images/' + this.state.detail.url}
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
                            <Link className="btn btn-warning" onClick={this.onBtAddToParcel}
                                // to={`/cart/${this.props.id}`}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5%', width: '70%' }}>
                                <span class="material-icons" >
                                    shopping_cart
                                </span>
                                <span> Add to Parcel</span></Link>
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

export default connect(mapStateToProps, {})(ProductDetailPage);