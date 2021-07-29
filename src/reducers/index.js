import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { productReducers } from "./productReducer";
import { parcelReducers } from "./parcelReducer";
import { transactionsReducer } from "./transactionReducer";

export const Reducers = combineReducers({
    authReducer, productReducers, parcelReducers, transactionsReducer
})