import axios from "axios"
import { URL_API } from "../helper"

export const getTransaction = () => {
    return async dispatch => {
        try {
            let token = localStorage.getItem("tkn_id")
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            let res = await axios.get(URL_API + `/transaction`, headers)
            console.log("transaction", res.data)
            dispatch({
                type: "GET_TRANSACTION",
                payload: res.data
            })
        } catch (error) {
            console.log("get transaction action error", error)
        }
    }
}

