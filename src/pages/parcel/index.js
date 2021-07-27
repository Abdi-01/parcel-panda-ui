import React from 'react';
import { Container, Input, Label, Button, Modal, ModalBody, Row, Col, CardImg } from 'reactstrap';
import { InputText } from 'primereact/inputtext';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import "../product/productPage.css"
import { Checkbox } from '@material-ui/core';
import food from "../../asset/img/food.jpg";
import axios from 'axios';
import { URL_API } from '../../helper';
import { toast } from 'react-toastify';
// import {getCart} from "../../actions"

toast.configure()

class ParcelPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 12,
            currentPage: 0,
            dataProduct: props.products,
            filterCtg: [],
            checkedCtg: {
                1: false,
                2: false,
                3: false
            },
            filter: [],
            filterName: '',
            dataFilterName: [],
            modal: false,
            selectedIndex: null,
            parcel: []
        }
    }

    componentDidMount() {
        this.getData()
        this.handleSort()
    }


    getData = () => {
        return this.props.parcel.map((item, index) => {
            return <div className="col-md-3 mt-5">
                <Card >
                    <Link to={`/product?${item.category.join("&")}`} style={{ textDecoration: "none", color: "black" }} >
                        {
                            item.url.includes('.jpg') || item.url.includes('.png') || item.url.includes('.jpeg') ?
                                <CardImg style={{ height: '170px' }} src={URL_API + '/static/images/' + item.url} alt="img" /> :
                                <CardImg style={{ height: '170px' }} src={'https://drive.google.com/uc?export=view&id=' + item.url} alt="img" />
                        }
                        <CardContent>
                            <Typography gutterBottom component="div">
                                Parcel {item.id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ color: 'gray' }}>
                                {item.title}
                            </Typography>
                            <Typography gutterBottom component="div">
                                Rp. {item.price.toLocaleString()}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link onClick={() => { this.setState({ modal: !this.state.modal, selectedIndex: index, }) }} className="btn btn-warning">
                                Add to Cart
                            </Link>
                        </CardActions>
                    </Link>
                </Card>
            </div>
        })
    }

    printConfirm = () => {
        return this.props.parcel.map((item, index) => {
            if (this.state.selectedIndex === index) {
                return (
                    <div>
                        <Modal size="lg" isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }) }}>
                            <ModalBody>
                                <Container>
                                    <Row className="box">
                                        <Col md="6" className="p-0">
                                            {
                                                item.url.includes('.jpg') || item.url.includes('.png') || item.url.includes('.jpeg') ?
                                                    <img className="img-log" style={{ objectFit: "fill", borderRadius: "15px 0px 0px 15px", width: "100%", height: "100%" }}
                                                        src={URL_API + '/static/images/' + item.url} alt="img" /> :
                                                    <img className="img-log" style={{ objectFit: "fill", borderRadius: "15px 0px 0px 15px", width: "100%", height: "100%" }}
                                                        src={'https://drive.google.com/uc?export=view&id=' + item.url} alt="img" />
                                            }
                                        </Col>
                                        <Col md="6" className="col2">
                                            <h3>Yay!</h3>
                                            <h4>You Selected Paket {item.id}</h4>
                                            <h6>this parcel MUST contains {item.title}</h6>
                                            <Link onClick={() => this.onBtCart(item)} className="btn btn-warning"
                                                to={
                                                    this.props.id ?
                                                        this.props.idstatus === 1 ?
                                                            `/product?${item.category.join("&")}` : false
                                                        : false
                                                } style={{ textDecoration: "none", color: "black" }}>
                                                Pick goods
                                            </Link>
                                        </Col>
                                    </Row>
                                </Container>
                            </ModalBody>
                        </Modal>
                    </div>
                )
            }
        })
    }

    resetCheckbox = () => {
        window.location.reload()
    }

    resendOTP = () => {
        console.log(this.props.username, this.props.password)
        axios.patch(URL_API + `/auth/reverif`, {
            username: this.props.username, password: this.props.password
        }).then(res => {
            console.log(res.data)
            toast.success('Email verification has been send. Please check your email', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        }).catch(err => console.log(err))
    }

    customToastWithLink = () => (
        <div>
          <p>Please Verify Your Account <span><a className="alert-link" onClick={() => this.resendOTP()}>Request Verification</a></span></p>
        </div>
    );

    onBtCart = (item) => {
        if (this.props.id) {
            if (this.props.idstatus === 1) {
                console.log("PARCEL", item)
                let token = localStorage.getItem("tkn_id")
                const headers = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                let idparcel_type = item.id
                let subtotal = item.price
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

    checkbox = (e) => {
        var { name, checked } = e.target
        this.setState((e) => {
            var selectedCtg = e.checkedCtg
            return selectedCtg[name] = checked
        })
    }

    handleFilter = () => {
        var display = Object.keys(this.state.checkedCtg).filter((x) => this.state.checkedCtg[x])
        var filter = display.join("&")
        console.log("fff", display)
        let dataFilter = this.props.parcel.filter((item =>
            item.category.includes(display)))
        this.setState({ parcel: dataFilter })
    }

    handleSort = () => {
        if (this.sort.value === "nama-asc") {
            this.props.parcel.sort((a, b) => {
                return a.id - b.id
            })
            console.log(this.props.products)
        } else if (this.sort.value === "nama-desc") {
            this.props.parcel.sort((a, b) => {
                return b.id - a.id
            })
        } else if (this.sort.value === "harga-asc") {
            this.props.parcel.sort((a, b) => {
                return a.price - b.price
            })
        } else if (this.sort.value === "harga-desc") {
            this.props.parcel.sort((a, b) => {
                return b.price - a.price
            })
        } else if (this.sort.value === "id-asc") {
            return this.props.parcel
        }
        this.setState(this.props.parcel)
        this.getData()
    }


    render() {
        return (
            <Container>
                <div className="row" >
                    {this.printConfirm()}
                    <div className="col-md-3 mt-3">
                        <div>
                            <h2 style={{ fontSize: '16px', letterSpacing: '2px', lineHeight: '17px' }}>PARCEL NAME</h2>
                            <div className="p-field ">
                                <div>
                                    <span className="p-input-icon-right">
                                        <InputText value={this.state.filterName} onChange={(e) => this.setState({ filterName: e.target.value })} />
                                        <i className="pi pi-search" />
                                    </span>
                                </div>
                            </div>
                            <h2 className="mt-5" style={{ fontSize: '16px', letterSpacing: '2px', lineHeight: '17px' }}>PARCEL</h2>
                            <div style={{ display: 'block', alignItems: 'center', color: 'gray', height: '32px' }}>
                                <Checkbox style={{ verticalAlign: 'middle' }} color="primary" name="idcategory=1" onChange={this.checkbox} />
                                <Label style={{ fontSize: '16px', display: 'inline-block' }}>Food</Label>
                            </div>
                            <div style={{ display: 'block', alignItems: 'center', color: 'gray', height: '32px' }}>
                                <Checkbox style={{ verticalAlign: 'middle' }} color="primary" name="idcategory=3" onChange={this.checkbox} />
                                <Label style={{ fontSize: '16px', display: 'inline-block' }}>Drinks</Label>
                            </div>
                            <div style={{ display: 'block', alignItems: 'center', color: 'gray', height: '32px' }}>
                                <Checkbox style={{ verticalAlign: 'middle' }} color="primary" name="idcategory=2" onChange={this.checkbox} />
                                <Label style={{ fontSize: '16px', display: 'inline-block' }}>Fruits</Label>
                            </div>
                            <div style={{ marginTop: '15px', display: 'flex' }}>
                                <Button onClick={() => this.resetCheckbox()} color="secondary">
                                    Reset
                                </Button>
                                <Button onClick={this.handleFilter} color="warning" style={{ background: "#FAB629", color: "black", marginLeft: '15px' }}>
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div style={{ borderBottom: "1px solid #E5E5E5", borderTop: "1px solid #E5E5E5", height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h2 style={{ fontSize: '24px', letterSpacing: '2px', lineHeight: '17px', }}>PARCEL</h2>
                            <div style={{ display: "flex", justifyContent: "flex-end", }}>
                                <h2 style={{ fontSize: '14px', letterSpacing: '1px', lineHeight: '17px', color: '#8C8582', display: "inline", padding: '9px 12px 9px 0' }}>SORT</h2>
                                <Input type="select" onClick={this.handleSort} innerRef={elemen => this.sort = elemen} >
                                    <option selected disabled>-</option>
                                    <option value="nama-asc" >A - Z</option>
                                    <option value="nama-desc">Z - A</option>
                                    <option value="harga-asc">Price Low-High</option>
                                    <option value="harga-desc">Price High-Low</option>
                                </Input>
                            </div>
                        </div>
                        <div className="row">
                            {this.getData()}
                        </div>
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
                </div>
            </Container>
        );
    }
}

const mapStateToProps = ({ parcelReducers, authReducer }) => {
    return {
        ...authReducer,
        parcel: parcelReducers.parcel_list,
    }
}

export default connect(mapStateToProps, {})(ParcelPage);