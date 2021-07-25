import axios from "axios"
import { URL_API } from "../helper"

export const getProductDataX = async (page, order, column) => {
    return async (dispatch) => {
        try {
            console.log("getProductDataX")
            let token = localStorage.getItem("tkn_id");
            let config = {
                method: 'get',
                url: URL_API + `/product-manage/read/20/${20*(page-1)}?sort=${order}&column=${column}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            let response = await axios(config)
            console.log("Response product data action", response.data)
            dispatch({
                type: "PRODUCT_DATA",
                payload: { ...response.data }
            })
        } catch (error) {
            console.log(error)
        }
    }
}