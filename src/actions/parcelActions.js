import axios from 'axios';
import { URL_API } from '../helper'

export const getParcelActions = () => {
    return (dispatch) => {
        axios.get(URL_API + `/product-manage/get-parcel`)
        .then (res => {
            console.log("PARCEL ACTIONS", res.data)
            dispatch({
                type: "GET_PARCEL",
                payload: res.data
            })
        })
        .catch(err => {
            console.log("getparcel err", err)
        })
    }
}