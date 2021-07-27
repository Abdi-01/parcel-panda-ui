const INITIAL_STATE = {
    id: null,
    username: "",
    fullname: "",
    email: "",
    password: "",
    gender: "",
    idaddress: "",
    age: "",
    role: "",
    status: "",
    otp: "",
    profile: [],
    cart: []
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            // delete action.payload.password;
            // console.log("CEK AUTHREDUCER:", action.payload)
            return { ...state, ...action.payload };
        case "PROFILE_DATA":
            // console.log("Response profile data reducer", action.payload)
            return { ...state, profile: action.payload };
        case "UPDATE_CART":
            console.log("reducer CART", action.payload)
            return { ...state, cart: action.payload }
        case "LOGOUT":
            return INITIAL_STATE;
        default:
            return state;
    }
}