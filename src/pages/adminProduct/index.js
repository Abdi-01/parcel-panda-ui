import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { ClipLoader } from "react-spinners"
import axios from "axios";
import ProductCard from "../../components/productCard";
import SortProductAdmin from "../../components/sortProductAdmin";
import ActionProduct from "../../components/dialogActionProduct";
import Pagination from "@material-ui/lab/Pagination";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { URL_API } from "../../helper"
import { 
  Button, 
  IconButton,
  InputBase,
  Typography } 
from "@material-ui/core/";
import {
  ButtonWrapper,
  PaperWrapper,
  PaginationWrapper,
  ProductWrapper,
  SortingBar,
  SortWrapper,
  SpinnerContainer,
  ProductContainer,
} from "./adminProduct";

const ProductManagement = () => {
    const [page, setPage] = useState(1);
    const [openAddProduct, setOpenAddProduct] = useState(false);
    const [cardData, setCardData] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleClickOpen = () => {
        setOpenAddProduct(true);
    };

    const getProductData = async () => {
        try {
            let token = localStorage.getItem("tkn_id");
            let config = {
                method: 'get',
                url: URL_API + '/product-manage',
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
        // console.log(cardData.length)
        return cardData.map((item) => {
            return <ProductCard data={item} />
        })
        }
    }

    useEffect(() => {
        getProductData()
    }, [])

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
                <PaperWrapper component="form">
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
                </PaperWrapper>
                <SortingBar>
                    <SortProductAdmin />
                </SortingBar>
                </SortWrapper>
                <ProductContainer>
                {
                    loading ? 
                    <SpinnerContainer>
                    <   ClipLoader color={"#0275d8"} loading={loading} size={100} />
                    </SpinnerContainer> :
                    <ProductWrapper>
                        {printCard()}
                    </ProductWrapper>
                }
                </ProductContainer>
                <PaginationWrapper>
                    <Typography>Page: {page}</Typography>
                    <Pagination
                        count={10}
                        page={page}
                        onChange={handleChange}
                        showFirstButton
                        showLastButton
                    />
                </PaginationWrapper>
            </Container>
        </div>
    );
}

export default ProductManagement
