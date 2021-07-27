import axios from 'axios';
import { URL_API } from '../helper'

export const getProductActions = () => {
    return (dispatch) => {
        axios.get(URL_API + `/product-manage/`)
        .then (res => {
            console.log("PRODUCT ACTIONS", res.data)
            dispatch({
                type: "GET_PRODUCTS",
                payload: res.data
            })
        })
        .catch(err => {
            console.log("getproduct err", err)
        })
    }
}