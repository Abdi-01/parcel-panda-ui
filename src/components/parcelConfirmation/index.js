import React from 'react';
import axios from 'axios';
import { Container, Modal, ModalBody, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import { URL_API } from '../../helper';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

toast.configure()


class ModalParcel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    customToastWithLink = () => (
        <div>
            <p>Please Verify Your Account <span><a className="alert-link" onClick={() => this.resendOTP()}>Request Verification</a></span></p>
        </div>
    );

    resendOTP = () => {
        console.log(this.props.username, this.props.password)
        axios.patch(URL_API + `/auth/reverif`, {
            username: this.props.username, password: this.props.password
        }).then(res => {
            console.log(res.data)
            toast.success('Email verification has been send. Please check your email', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        }).catch(err => console.log(err))
    }


    onBtCart = () => {
        if (this.props.id) {
            if (this.props.idstatus === 1) {
                let token = localStorage.getItem("tkn_id")
                const headers = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                let idparcel_type = this.props.detailParcel.id
                let subtotal = this.props.detailParcel.price
                console.log("add", idparcel_type, subtotal)
                axios.post(URL_API + `/transaction/addCart`, { idparcel_type, subtotal }, headers)
                    .then(res => {
                        console.log("cart", res.data)
                        // this.props.getCart(res.data)
                    }).catch(err => console.log("add cart", err))
            } else {
                toast.error(this.customToastWithLink, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            }
        } else {
            toast.error('Login First!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        }
    }


    render() {
        console.log("detail", this.props.detailParcel, this.props.category)
        // console.log("detail parcel", this.props.detailParcel, this.props.detailParcel.category)
        // let { id, title, url, category } = this.props.detailParcel
        // let ctg = category.join("&")
        return (
            <div>
                <Modal size="lg" isOpen={this.props.modal} toggle={this.props.btClose}>
                    <ModalBody>
                        <Container>
                            <Row className="box">
                                <Col md="6" className="p-0">
                                    <img className="img-log" style={{ objectFit: "fill", borderRadius: "15px 0px 0px 15px", width: "100%", height: "100%" }}
                                        src={`https://drive.google.com/uc?export=view&id=${this.props.detailParcel.url}`} alt="img" />
                                </Col>
                                <Col md="6" className="col2">
                                    <h3>Yay!</h3>
                                    <h4>You Selected Paket {this.props.detailParcel.id}</h4>
                                    <h6>this parcel MUST contains {this.props.detailParcel.title}</h6>
                                    <Link className="btn btn-warning" onClick={this.onBtCart}
                                        to={
                                            this.props.id ?
                                                this.props.idstatus === 1 ?
                                                    `/product?${this.props.category}` : false
                                                : false
                                        }
                                        style={{ textDecoration: "none", color: "black" }}>
                                        Pick goods
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({ parcelReducers, authReducer }) => {
    return {
        ...authReducer,
        parcel: parcelReducers.parcel_list,
    }
}

export default connect(mapStateToProps, {})(ModalParcel);