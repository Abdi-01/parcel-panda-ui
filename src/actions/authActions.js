import axios from "axios"
import { URL_API } from "../helper"

export const authLogin = (username, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(URL_API + `/auth/login`, {
                username, password
            })
            console.log("CEK AUTHLOGIN:", res.data)
            if (res.data.idstatus == 1) {
                localStorage.setItem('tkn_id', res.data.token)
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: { ...res.data }
                })
            } else {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: { idstatus: res.data.idstatus}
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const authLogout = () => {
    localStorage.removeItem("tkn_id")
    return {
        type: "LOGOUT"
    }
}

export const keepLogin = (data) => {
    return async (dispatch) => {
        try {
            localStorage.setItem("tkn_id", data.token)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { ...data }
            })
        } catch (error) {
            console.log(error)
        }
    }
}