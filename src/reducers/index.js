import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { adminReducer } from "./adminReducer";
import { productReducers } from "./productReducer";
import { parcelReducers } from "./parcelReducer";

export const Reducers = combineReducers({
    authReducer, adminReducer, productReducers, parcelReducers
})