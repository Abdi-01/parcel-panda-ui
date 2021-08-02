import React from 'react';
import { Container, Input, Label, Button, Modal, ModalBody, Row, Col, CardImg, Spinner } from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import "../product/productPage.css"
import { Checkbox } from '@material-ui/core';
import axios from 'axios';
import { URL_API } from '../../helper';
import { toast } from 'react-toastify';
import "../parcel/parcelPage.css"

toast.configure()

class ParcelPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            perPage: 4,
            currentPage: 0,
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
        this.dataParcel()
        this.handleSort()
    }


    dataParcel = () => {
        axios.get(URL_API + `/parcel/get-parcel`)
            .then(res => {
                this.setState({ parcel: res.data, pageCount: Math.ceil(res.data.length / this.state.perPage) })
            }).catch(err => console.log(err))
    }

    getData = () => {
        console.log(this.state.parcel)
        return this.state.parcel.slice(this.state.offset, this.state.offset + this.state.perPage).map((item, index) => {
            return <div className="col-md-3 mt-5">
                <Card >
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
                </Card>
            </div>
        })
    }

    printConfirm = () => {
        return this.state.parcel.slice(this.state.offset, this.state.offset + this.state.perPage).map((item, index) => {
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
        axios.get(URL_API + `/parcel/filter-parcel?${filter}`)
            .then(res => {
                console.log("filter", res.data)
                console.log("nama", this.state.filterName)
                this.setState({ parcel: res.data, pageCount: Math.ceil(res.data.length / this.state.perPage) })
            }).catch(err => console.log(err))
    }

    handleSort = () => {
        if (this.sort.value === "nama-asc") {
            this.state.parcel.sort((a, b) => {
                return a.id - b.id
            })
        } else if (this.sort.value === "nama-desc") {
            this.state.parcel.sort((a, b) => {
                return b.id - a.id
            })
        } else if (this.sort.value === "harga-asc") {
            this.state.parcel.sort((a, b) => {
                return a.price - b.price
            })
        } else if (this.sort.value === "harga-desc") {
            this.state.parcel.sort((a, b) => {
                return b.price - a.price
            })
        } else if (this.sort.value === "id-asc") {
            return this.state.parcel
        }
        this.setState(this.state.parcel)
        this.getData()
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getData()
        });
    };


    render() {
        return (
            <Container>
                <div className="row" >
                    {this.printConfirm()}
                    <div className="col-md-3 mt-3">
                        <div>
                            <h2 className="h2-sort">SORT</h2>
                            <Input style={{ width: '200px' }} type="select" onClick={this.handleSort} innerRef={elemen => this.sort = elemen} >
                                <option selected disabled>-</option>
                                <option value="nama-asc" >A - Z</option>
                                <option value="nama-desc">Z - A</option>
                                <option value="harga-asc">Price Low-High</option>
                                <option value="harga-desc">Price High-Low</option>
                            </Input>
                            {/* <div className="p-field ">
                                <div>
                                    <span className="p-input-icon-right">
                                        <InputText value={this.state.filterName} onChange={(e) => this.setState({ filterName: e.target.value })} />
                                        <i className="pi pi-search" />
                                    </span>
                                </div>
                            </div> */}
                            <h2 className="mt-5 h2-sort">PARCEL CATEGORY</h2>
                            <div className="div-checkbox" >
                                <Checkbox className="chkbox" color="primary" name="idcategori=1" onChange={this.checkbox} />
                                <Label className="label-chk">Food</Label>
                            </div>
                            <div className="div-checkbox">
                                <Checkbox className="chkbox" color="primary" name="idcategori=3" onChange={this.checkbox} />
                                <Label className="label-chk">Drinks</Label>
                            </div>
                            <div className="div-checkbox">
                                <Checkbox className="chkbox" color="primary" name="idcategori=2" onChange={this.checkbox} />
                                <Label className="label-chk">Fruits</Label>
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
                        <div className="div-box-parcel">
                            <h2 className="h2-produk">PARCEL</h2>
                        </div>
                        <div className="row">
                            {
                                this.props.parcel ?
                                    <>
                                        {this.getData()}
                                    </>
                                    :
                                    <>
                                        <Spinner color="warning" />
                                    </>
                            }
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