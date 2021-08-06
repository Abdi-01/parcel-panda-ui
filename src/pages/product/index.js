import React from 'react';
import { Container, Input, Label, Button, CardImg, Spinner, Modal, ModalBody } from 'reactstrap';
import { InputText } from 'primereact/inputtext';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import "../product/productPage.css"
import { Checkbox } from '@material-ui/core';
import axios from 'axios';
import { URL_API } from '../../helper';
import { getCart } from '../../actions';
import { Link } from "react-router-dom";
import GifPlayer from "react-gif-player";
import product from "../../asset/gif/product.gif";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { toast } from 'react-toastify';

toast.configure()

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
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
            product: [],
            activeIndex: null,
            qty: 1,
            selectedIndex: null,
            modal: false,
            cart: [],
            idcart: [],
            detailCart: [],
            type: [],
            idparcel_type: [],
            stock: [],
            modalConfirm: false,
            idproduct: [],
            idcategory: [],
            price: [],
            idxCart: []
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.getData()
        this.handleSort()
        this.getDataProduct()
        this.props.getCart()
    }

    onClick(itemIndex) {
        let activeIndex = this.state.activeIndex ? [...this.state.activeIndex] : [];
        if (activeIndex.length === 0) {
            activeIndex.push(itemIndex);
        }
        else {
            const index = activeIndex.indexOf(itemIndex);
            if (index === -1) {
                activeIndex.push(itemIndex);
            }
            else {
                activeIndex.splice(index, 1);
            }
        }
        this.setState({ activeIndex });
    }

    getData = () => {
        const product = this.state.product
        const slice = product.slice(this.state.offset, this.state.offset + this.state.perPage)
        return slice.map((item, index) => {
            return <div className="col-md-3 mt-5">
                <Card style={{ boxShadow: '5px 5px 5px #DDDDDD', }}>
                    <div style={{ display: 'flex' }}>
                        <CardImg style={{ height: '175px' }} src={URL_API + '/static/images/' + item.url} />
                    </div>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" style={{ color: 'gray' }}>
                            {item.category}
                        </Typography>
                        <Typography gutterBottom component="div" style={{ height: '55px' }}>
                            {item.name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="sm" outline color="secondary"
                            onClick={() => { this.setState({ selectedIndex: index, modal: !this.state.modal, idproduct: item.id, idcategory: item.idcategory, price: item.price }) }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                            <span class="material-icons" style={{ fontSize: '17px' }}>
                                visibility
                            </span> <span>Lihat Detail</span>
                        </Button>
                    </CardActions>
                </Card>
            </div>
        })
    }



    printDetail = () => {
        return this.state.product.slice(this.state.offset, this.state.offset + this.state.perPage).forEach((item, index) => {
            if (this.state.selectedIndex === index) {
                return (
                    <div>
                        <Modal size="lg" isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }) }}>
                            <ModalBody>
                                <Container>
                                    <div className="row p-5" style={{
                                        borderRadius: "15px",
                                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                                    }}>
                                        <div className="col-md-5">
                                            <img alt="..." src={URL_API + '/static/images/' + item.url}
                                                width="80%" />
                                        </div>
                                        <div className="col-md-7" style={{ color: 'gray', alignSelf: 'center' }}>
                                            <div>
                                                <h4>{item.name}</h4>
                                                <p>Deskripsi Produk:</p>
                                                <p>{item.name}</p>
                                                <p>Kategori: {item.category}</p>
                                            </div>
                                            <div className="d-flex align-item-center">
                                                <Button onClick={() => this.DecrementQty(item.stock)} size="sm" outline color="warning">
                                                    <span class="material-icons" style={{ fontSize: '12px' }}>
                                                        remove
                                                    </span>
                                                </Button>
                                                <Input size="sm" style={{ width: '40px', marginLeft: '5px', marginRight: '5px' }}
                                                    innerRef={elemen => this.addQty = elemen} value={this.state.qty} />
                                                <Button onClick={() => this.incrementQty(item.stock)} size="sm" outline color="warning">
                                                    <span class="material-icons" style={{ fontSize: '12px' }}>
                                                        add
                                                    </span>
                                                </Button>
                                            </div>
                                            <Button style={{ marginTop: '5%' }} size="sm" color="warning" onClick={() => { this.setState({ modalConfirm: !this.state.modalConfirm }) }}>
                                                Select
                                            </Button>
                                        </div>
                                    </div>
                                </Container>
                            </ModalBody>
                        </Modal>
                    </div>
                )
            }
        })
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

    checkbox = (e) => {
        var { name, checked } = e.target
        this.setState((e) => {
            var selectedCtg = e.checkedCtg
            return selectedCtg[name] = checked
        })
    }

    resetCheckbox = () => {
        window.location.reload()
    }

    getDataProduct = () => {
        this.setState({ loading: true })
        console.log(this.props.location.search)
        axios.get(URL_API + `/product/filter-product?${this.props.location.search}`)
            .then(res => {
                console.log("filter", res.data)
                this.setState({ product: res.data, pageCount: Math.ceil(res.data.length / this.state.perPage), loading: false })
            }).catch(err => console.log(err))
    }

    handleFilter = () => {
        var display = Object.keys(this.state.checkedCtg).filter((x) => this.state.checkedCtg[x])
        var filter = display.join("&")
        console.log("fff", display)
        axios.get(URL_API + `/product/filter-product?${filter}`)
            .then(res => {
                console.log("filter", res.data)
                this.setState({ product: res.data, pageCount: Math.ceil(res.data.length / this.state.perPage) })

                let dataFilter = this.state.product.filter((item) =>
                    item.name.toLowerCase().includes(this.state.filterName.toLowerCase()))
                this.setState({ product: dataFilter, pageCount: Math.ceil(res.data.length / this.state.perPage) })
            }).catch(err => console.log(err))
    }

    incrementQty = (stock) => {
        if (this.state.qty < stock) {
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

    printParcel = () => {
        return this.props.cart.map((item, index) => {
            return (
                <div>
                    <Accordion activeIndex={0}>
                        <AccordionTab header={<div className="h2-sort">PARCEL {item.idparcel_type}</div>}>
                            <p style={{ color: 'gray', fontSize: '14px' }}>Choose {item.title}</p>
                            {
                                item.detail.map((val, i) => {
                                    return (
                                        <p className="date"><span>{val.name}</span>
                                            <br />
                                            <span>Amount: {val.amount}</span>
                                        </p>
                                    )
                                })
                            }
                            {/* <Button color="warning" size="sm" onClick={() => this.getParcelType(index)}>Select</Button> */}
                        </AccordionTab>
                    </Accordion>
                </div>
            )
        })
    }

    confirmParcel = () => {
        console.log(this.props.cart)
        return this.props.cart.map((item, index) => {
            return (
                <div style={{ marginTop: '10px' }}>
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
                    </div>
                </div>
            )
        })
    }


    onBtAddToParcel = () => {
        let idparcel_type = this.state.idparcel_type
        let idcart = this.state.idcart
        let idproduct = this.state.idproduct
        let idcategory = this.state.idcategory
        let amount = this.state.qty
        let subtotal = this.state.qty * this.state.price
        let token = localStorage.getItem("tkn_id")
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        if (this.state.type.length <= 0) {
            toast.warn('Choose Parcel First!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        } else {
            if (this.state.type.length > 1) {
                this.state.type.forEach((item, index) => {
                    if (item.idcategory === this.state.idcategory) {
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
                                        this.setState({ modalConfirm: false, modal: false, qty: 1 })
                                    }).catch(err => console.log(err))
                            } else {
                                // Dicart kategory itu > 0
                                let qty_beli = []
                                this.state.detailCart.forEach(item => {
                                    if (item.idcategory === this.state.idcategory) {
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
                                            this.setState({ modalConfirm: false, modal: false, qty: 1 })
                                        }).catch(err => console.log(err))
                                } else {
                                    let qty_beli = []
                                    this.state.detailCart.forEach(el => {
                                        if (el.idcategory === this.state.idcategory) {
                                            qty_beli.push(el.amount)
                                        }
                                    })
                                    let idx = this.props.cart[this.state.idxCart].detail.findIndex(item => item.idproduct === this.state.idproduct)
                                    console.log("INDEX", idx)
                                    if (idx >= 0) {
                                        let sum_qty_beli = qty_beli.reduce((val, sum) => {
                                            return val + sum
                                        })
                                        console.log("SUM PRODUCT SAMA", sum_qty_beli)
                                        if (sum_qty_beli + this.state.qty > item.max_qty) {
                                            toast.error(`Pembelian melebihi batas, pembelian category ini max ${item.max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                        } else if (sum_qty_beli === item.max_qty) {
                                            toast.error(`Pembelian melebihi batas, pembelian category ini max ${item.max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                        } else {
                                            this.props.cart[this.state.idxCart].detail[idx].amount += this.state.qty
                                            axios.patch(URL_API + `/transaction/update-qty`, {
                                                amount: this.props.cart[this.state.idxCart].detail[idx].amount, idproduct: idproduct, idcart: idcart
                                            }, headers)
                                                .then(res => {
                                                    console.log("Res Cart:", res.data)
                                                    toast.success('Success add to parcel!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                                    this.props.getCart(this.props.id)
                                                    this.setState({ modalConfirm: false, modal: false, qty: 1})
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
                                                    this.setState({ modalConfirm: false, modal: false, qty: 1 })
                                                }).catch(err => console.log(err))
                                        }
                                    }

                                }
                            }
                        }
                    }

                })
            } else {
                this.state.type.forEach((item, index) => {
                    if (item.idcategory === this.state.idcategory) {
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
                                        this.setState({ modalConfirm: false, modal: false, qty: 1 })
                                    }).catch(err => console.log(err))
                            } else {
                                // Dicart kategory itu > 0
                                let qty_beli = []
                                this.state.detailCart.forEach(item => {
                                    if (item.idcategory === this.state.idcategory) {
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
                                            this.setState({ modalConfirm: false, modal: false, qty: 1})
                                        }).catch(err => console.log(err))
                                } else {
                                    console.log("6666")
                                    let qty_beli = []
                                    this.state.detailCart.forEach(el => {
                                        if (el.idcategory === this.state.idcategory) {
                                            qty_beli.push(el.amount)
                                        }
                                    })
                                    let idx = this.props.cart[this.state.idxCart].detail.findIndex(item => item.idproduct === this.state.idproduct)
                                    console.log("INDEX", idx)
                                    if (idx >= 0) {
                                        // this.props.cart[this.state.idxCart].detail[idx].amount += this.state.qty
                                        let sum_qty_beli = qty_beli.reduce((val, sum) => {
                                            return val + sum
                                        })
                                        console.log("SUM PRODUCT SAMA", sum_qty_beli)
                                        if (sum_qty_beli + this.state.qty > item.max_qty) {
                                            toast.error(`Pembelian melebihi batas, pembelian category ini max ${item.max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                        } else if (sum_qty_beli === item.max_qty) {
                                            toast.error(`Pembelian melebihi batas, pembelian category ini max ${item.max_qty}!`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                        } else {
                                            this.props.cart[this.state.idxCart].detail[idx].amount += this.state.qty
                                            axios.patch(URL_API + `/transaction/update-qty`, {
                                                amount: this.props.cart[this.state.idxCart].detail[idx].amount, idproduct: idproduct, idcart: idcart
                                            }, headers)
                                                .then(res => {
                                                    console.log("Res Cart:", res.data)
                                                    toast.success('Success add to parcel!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                                    this.props.getCart(this.props.id)
                                                    this.setState({ modalConfirm: false, modal: false, qty: 1 })
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
                                                    this.setState({ modalConfirm: false, modal: false, qty: 1 })
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


    handleSort = () => {
        if (this.sort.value === "nama-asc") {
            this.state.product.sort((a, b) => {
                return a.name - b.name
            })
            console.log(this.props.products)
        } else if (this.sort.value === "nama-desc") {
            this.state.product.sort((a, b) => {
                return b.name - a.name
            })
        } else if (this.sort.value === "harga-asc") {
            this.state.product.sort((a, b) => {
                return a.price - b.price
            })
        } else if (this.sort.value === "harga-desc") {
            this.state.product.sort((a, b) => {
                return b.price - a.price
            })
        } else if (this.sort.value === "id-asc") {
            return this.state.product
        }
        this.setState(this.state.product)
        this.getData()
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
                    detailCart: res.data[index].detail, idparcel_type: res.data[index].idparcel_type,
                    idxCart: index
                })
                console.log(this.state.cart, "CART STATE")
                axios.get(URL_API + `/parcel/getParcel-type?idparcel_type=${res.data[index].idparcel_type}`)
                    .then(res => {
                        console.log(res.data)
                        this.setState({ type: res.data })
                        console.log("TYPE", this.state.type)
                    }).catch(err => console.log(err))
            }).catch(err => console.log("get cart", err))
    }

    render() {
        var display = Object.keys(this.state.checkedCtg).filter((x) => this.state.checkedCtg[x])
        console.log("fff", display)
        return (
            <Container style={{ marginTop: '35px' }}>
                <div>
                    <Modal isOpen={this.state.modalConfirm} toggle={() => { this.setState({ modalConfirm: !this.state.modalConfirm }) }}>
                        <ModalBody>
                            <Container>
                                <h2 style={{ fontSize: '17px', letterSpacing: '1px', fontWeight: '500', marginTop: '10px' }}>
                                    PLEASE CHOOSE YOUR PARCEL
                                </h2>
                                {this.confirmParcel()}
                                <Link className="btn btn-warning" onClick={this.onBtAddToParcel}
                                    // to={`/cart/${this.props.id}`}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5%', width: '100%' }}>
                                    <span class="material-icons" >
                                        shopping_cart
                                    </span>
                                    <span>Add to Parcel</span></Link>
                            </Container>
                        </ModalBody>
                    </Modal>
                </div>
                <div className="row" >
                    {this.printDetail()}
                    <div className="col-md-3 mt-3">
                        <div>
                            <h2 className="h2-sort">YOUR PARCEL(S)</h2>
                            {
                                this.props.cart.length <= 0 ?
                                    <p style={{ color: 'gray', fontSize: '14px' }}>
                                        - Anda belum memilih parcel -
                                    </p> :
                                    <>
                                        {this.printParcel()}
                                    </>
                            }
                        </div>
                        <div>
                            <h2 className=" mt-5 h2-sort">PRODUCT NAME</h2>
                            <div className="p-field ">
                                <div>
                                    <span className="p-input-icon-right">
                                        <InputText value={this.state.filterName} onChange={(e) => this.setState({ filterName: e.target.value })} />
                                        <i className="pi pi-search" />
                                    </span>
                                </div>
                            </div>
                            <h2 className="mt-5 h2-sort">PRODUCT CATEGORY</h2>
                            {
                                this.props.location.search === '?idcategory=1' ?
                                    <>
                                        <div className="div-checkbox">
                                            <Checkbox className="chkbox" color="primary" name="idcategory=1" onChange={this.checkbox} />
                                            <Label className="label-chk">Food</Label>
                                        </div>
                                        <div className="div-checkbox">
                                            <Checkbox disabled className="chkbox" color="primary" name="idcategory=3" onChange={this.checkbox} />
                                            <Label className="label-chk">Drinks</Label>
                                        </div>
                                        <div className="div-checkbox">
                                            <Checkbox disabled className="chkbox" color="primary" name="idcategory=2" onChange={this.checkbox} />
                                            <Label className="label-chk">Fruits</Label>
                                        </div>
                                    </> : this.props.location.search === '?idcategory=2' ?
                                        <>
                                            <div className="div-checkbox">
                                                <Checkbox disabled className="chkbox" color="primary" name="idcategory=1" onChange={this.checkbox} />
                                                <Label className="label-chk">Food</Label>
                                            </div>
                                            <div className="div-checkbox">
                                                <Checkbox disabled className="chkbox" color="primary" name="idcategory=3" onChange={this.checkbox} />
                                                <Label className="label-chk">Drinks</Label>
                                            </div>
                                            <div className="div-checkbox">
                                                <Checkbox className="chkbox" color="primary" name="idcategory=2" onChange={this.checkbox} />
                                                <Label className="label-chk">Fruits</Label>
                                            </div>
                                        </> : this.props.location.search === '?idcategory=3' ?
                                            <>
                                                <div className="div-checkbox">
                                                    <Checkbox disabled className="chkbox" color="primary" name="idcategory=1" onChange={this.checkbox} />
                                                    <Label className="label-chk">Food</Label>
                                                </div>
                                                <div className="div-checkbox">
                                                    <Checkbox className="chkbox" color="primary" name="idcategory=3" onChange={this.checkbox} />
                                                    <Label className="label-chk">Drinks</Label>
                                                </div>
                                                <div className="div-checkbox">
                                                    <Checkbox disabled className="chkbox" color="primary" name="idcategory=2" onChange={this.checkbox} />
                                                    <Label className="label-chk">Fruits</Label>
                                                </div>
                                            </> :
                                            <>
                                                <div className="div-checkbox">
                                                    <Checkbox className="chkbox" color="primary" name="idcategory=1" onChange={this.checkbox} />
                                                    <Label className="label-chk">Food</Label>
                                                </div>
                                                <div className="div-checkbox">
                                                    <Checkbox className="chkbox" color="primary" name="idcategory=3" onChange={this.checkbox} />
                                                    <Label className="label-chk">Drinks</Label>
                                                </div>
                                                <div className="div-checkbox">
                                                    <Checkbox className="chkbox" color="primary" name="idcategory=2" onChange={this.checkbox} />
                                                    <Label className="label-chk">Fruits</Label>
                                                </div>
                                            </>
                            }

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
                            <h2 className="h2-produk">PRODUCT</h2>
                            <div style={{ display: "flex", justifyContent: "flex-end", }}>
                                <h2 style={{ fontSize: '14px', letterSpacing: '1px', lineHeight: '17px', color: '#8C8582', display: "inline", padding: '9px 12px 9px 0' }}>SORT</h2>
                                <Input type="select" onClick={this.handleSort} innerRef={elemen => this.sort = elemen} >
                                    <option selected disabled>-</option>
                                    <option value="nama-asc" >A - Z</option>
                                    <option value="nama-desc">Z - A</option>
                                </Input>
                            </div>
                        </div>
                        <div style={{ marginTop: '15px' }}>
                            <GifPlayer gif={product} autoplay={true} style={{ width: '100%' }} />
                        </div>
                        <div className="row">
                            {
                                this.state.loading === true &&
                                <Spinner color="warning" />
                            }
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
            </Container >
        );
    }
}

const mapStateToProps = ({ productReducers, authReducer }) => {
    return {
        products: productReducers.products_list,
        cart: authReducer.cart
    }
}

export default connect(mapStateToProps, { getCart })(ProductsPage);