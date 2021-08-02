import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { adminReducer } from "./adminReducer";
import { productReducers } from "./productReducer";
import { parcelReducers } from "./parcelReducer";
import { transactionsReducer } from "./transactionReducer";

export const Reducers = combineReducers({
    authReducer, adminReducer, productReducers, parcelReducers, transactionsReducer
})