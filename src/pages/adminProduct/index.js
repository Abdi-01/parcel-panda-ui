import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { BarLoader, ClipLoader } from "react-spinners";
import { URL_API } from "../../helper";
import ProductCard from "../../components/productCard";
import SortProductAdmin from "../../components/sortProductAdmin";
import ActionProduct from "../../components/dialogActionProduct";
import Pagination from "@material-ui/lab/Pagination";
import {
    Button,
} from "@material-ui/core/";
import {
    ButtonWrapper,
    PaginationWrapper,
    ProductWrapper,
    SortingBar,
    SortWrapper,
    SpinnerContainer,
    ProductContainer,
} from "./adminProduct";
// import { getProductDataX } from "../../actions/adminActions";


const ProductManagement = () => {
    const [page, setPage] = useState(1);
    const [pageN, setPageN] = useState(1)
    const [openAddProduct, setOpenAddProduct] = useState(false);
    const [cardData, setCardData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [sort, setSort] = useState({
        column: "name",
        order: "ASC"
    })
    // const dispatch = useDispatch()

    const handleChange = (event, value) => {
        setPage(value)
        scrollToTop()
    };

    const handleClickOpen = () => {
        setOpenAddProduct(true);
    };

    const getProduct = async () => {
        try {
            let config = {
                method: 'get',
                url: URL_API + `/product-manage/`
            }
            let response = await axios(config)
            setPageN(Math.ceil(response.data.length / 20))
        } catch (error) {
            console.log(error)
        }
    }

    const getProductData = async () => {
        try {
            let token = localStorage.getItem("tkn_id");
            let config = {
                method: 'get',
                url: URL_API + `/product-manage/read/20/${20 * (page - 1)}?sort=${sort.order}&column=${sort.column}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            let response = await axios(config)
            setLoading(false)
            setCardData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const printCard = () => {
        if (cardData !== null) {
            // console.log(Math.ceil(cardData.length/20))
            return cardData.map((item) => {
                return <ProductCard data={item} getProductData={getProductData} />
            })
        }
    }

    const scrollToTop = () => {
        setLoading(true)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        getProduct()
        getProductData()
        // dispatch(getProductDataX(page, sort.order, sort.column))
    }, [page, sort])



    return (
        <div>
            <Container>
                <ActionProduct
                    open={openAddProduct}
                    setOpen={setOpenAddProduct}
                    action={"add"}
                />
                <SortWrapper>
                    <ButtonWrapper>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleClickOpen}
                        >
                            Add Product
                        </Button>
                    </ButtonWrapper>
                    {/* <PaperWrapper component="form">
                        <IconButton sx={{ p: "10px" }} aria-label="menu">
                        <MenuIcon />
                        </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                    placeholder={"Search product"}
                                    inputProps={{
                                        "aria-label": "Search product",
                                }}
                            />
                        <IconButton sx={{ p: "10px" }} aria-label="search">
                        <SearchIcon />
                        </IconButton>
                    </PaperWrapper> */}
                    <SortingBar>
                        <SortProductAdmin
                            sort={sort}
                            setSort={setSort}
                        />
                    </SortingBar>
                </SortWrapper>
                <ProductContainer>
                    {
                        loading ?
                            <SpinnerContainer>
                                <ClipLoader color={"#0275d8"} loading={loading} size={100} />
                            </SpinnerContainer> :
                            <ProductWrapper>
                                {printCard()}
                            </ProductWrapper>
                    }
                </ProductContainer>
                <PaginationWrapper>
                    {
                        loading ?
                            <SpinnerContainer>
                                <BarLoader color={"#0275d8"} loading={loading} width={700} height={10} />
                            </SpinnerContainer> :
                            <div>
                                <Pagination
                                    // count={Math.ceil(cardData.length/20)}
                                    count={pageN}
                                    page={page}
                                    onChange={handleChange}
                                    showFirstButton
                                    showLastButton
                                />
                            </div>
                    }
                </PaginationWrapper>
            </Container>
        </div>
    );
}

export default ProductManagement
