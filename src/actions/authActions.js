import axios from "axios"
import { URL_API } from "../helper"
import { toast } from 'react-toastify';


toast.configure()   

const handleNotify = () => {
    toast.success('Hey 👋 Login Success!', {position: toast.POSITION.TOP_CENTER, autoClose: 3000})
}

export const authLogin = (username, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(URL_API + `/auth/login`, {
                username, password
            })
            console.log("CEK AUTHLOGIN:", res.data)
            localStorage.setItem('tkn_id', res.data.token)
            await dispatch(getProfile(res.data.token))
            await dispatch(getCart(res.data))
            handleNotify()
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { ...res.data }
            })
        } catch (error) {
            toast.error('Login Failed!', {position: toast.POSITION.TOP_CENTER, autoClose: 3000})
            console.log(error)
        }
    }
}

export const getProfile = (token) => {
    return async (dispatch) => {
        // console.log("getProfile")
        try {
            let config = {
                method: 'get',
                url: URL_API + '/profile',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            let response = await axios(config)
            // console.log("Response profile data action", response.data[0])
            dispatch({
                type: "PROFILE_DATA",
                payload: { ...response.data[0] }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// export const updateProfile = (value) => {
//     return async (dispatch) => {
//         try {
//             let token = localStorage.getItem("tkn_id")
//             let config = {
//                 method: 'patch',
//                 url: URL_API + '/profile/update-data',
//                 data: value,
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//             let response = await axios(config) // How to forward response to update page
//         } catch (error) {

//         }
//     }
// }

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
            await dispatch(getProfile(data.token))
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { ...data }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCart = (data) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tkn_id")
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            let res = await axios.get(URL_API + `/transaction/getcart`, headers)
            console.log("CARTTT:", res.data)
            dispatch({
                type: "UPDATE_CART",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}