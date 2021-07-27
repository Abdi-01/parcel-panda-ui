import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { adminReducer } from "./adminReducer";

export const Reducers = combineReducers({
    authReducer, adminReducer
})