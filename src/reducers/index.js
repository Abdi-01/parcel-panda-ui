import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { productReducers } from "./productReducer";
import { parcelReducers } from "./parcelReducer";

export const Reducers = combineReducers({
    authReducer, productReducers, parcelReducers
})