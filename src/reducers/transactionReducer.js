const INITIAL_STATE = {
    transaction_list: []
}

export const transactionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case  "GET_TRANSACTION":
            console.log("get transactions reducer", action.payload)
            return {...state, transaction_list: action.payload }
        default:
            return state
    }
}