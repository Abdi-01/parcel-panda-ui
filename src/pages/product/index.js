import React from 'react';
import { Container, Input, Label, Button, CardImg, Spinner } from 'reactstrap';
import { InputText } from 'primereact/inputtext';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import Badge from 'react-bootstrap/Badge'
import { connect } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
// import Pagination from '@material-ui/lab/Pagination';
import ReactPaginate from 'react-paginate';
import "../product/productPage.css"
import { Checkbox } from '@material-ui/core';
import axios from 'axios';
import { URL_API } from '../../helper';
import { Link } from "react-router-dom";
import GifPlayer from "react-gif-player";
import step2 from "../../asset/gif/step2.gif";

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
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.getData()
        this.handleSort()
        this.getDataProduct()
    }

    getData = () => {
        const product = this.state.product
        const slice = product.slice(this.state.offset, this.state.offset + this.state.perPage)
        return slice.map((item, index) => {
            return <div className="col-md-3 mt-5">
                <Card>
                    <Link to={`/product-detail?p.id=${item.id}`} style={{ textDecoration: "none", color: "black" }}>
                        {
                            item.url ?
                                item.url.includes('.jpg') || item.url.includes('.png') || item.url.includes('.jpeg') ?
                                    <CardImg src={URL_API + '/static/images/' + item.url} /> :
                                    <CardImg src={'https://drive.google.com/uc?export=view&id=' + item.url} />
                                :
                                <CardImg alt="img" />
                        }
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" style={{ color: 'gray' }}>
                                {item.category}
                                
                            </Typography>
                            <Typography gutterBottom component="div" style={{ height: '55px' }}>
                                {item.name}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {/* <Link className="btn btn-outlined-warning btn-sm"
                                style={{ fontWeight: 'bolder', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                to={
                                    {
                                        pathname: `/product-detail?p.id=${item.id}`,
                                    }}>
                                <span class="material-icons" >
                                    visibility
                                </span>
                            </Link> */}
                        </CardActions>
                    </Link>
                </Card>
            </div>
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
        console.log(this.props.location.search)
        axios.get(URL_API + `/product/filter-product?${this.props.location.search}`)
            .then(res => {
                console.log("filter", res.data)
                this.setState({ product: res.data, pageCount: Math.ceil(res.data.length / this.state.perPage) })
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


    handleSort = () => {
        if (this.sort.value === "nama-asc") {
            this.state.product.sort((a, b) => {
                let namaA = a.name.toUpperCase()
                let namaB = b.name.toUpperCase()

                if (namaA < namaB) {
                    return -1;
                }
            })
            console.log(this.props.products)
        } else if (this.sort.value === "nama-desc") {
            this.state.product.sort((a, b) => {
                let namaA = a.name.toUpperCase()
                let namaB = b.name.toUpperCase()

                if (namaA > namaB) {
                    return -1;
                }
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

    render() {
        return (
            <Container>
                <div className="row" >
                    <div className="col-md-3 mt-3">
                        <div>
                            <h2 className="h2-sort">PRODUCT NAME</h2>
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
                        <div>
                            <GifPlayer gif={step2} autoplay={true} style={{ width: '100%' }} />
                        </div>
                        <div className="row">
                            {
                                this.props.products ?
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

const mapStateToProps = ({ productReducers }) => {
    return {
        products: productReducers.products_list
    }
}

export default connect(mapStateToProps, {})(ProductsPage);