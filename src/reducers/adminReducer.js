const INITIAL_STATE = {
    totalPage: 1,
    productPage: []
}

export const adminReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "PRODUCT_DATA":
            console.log(`Reducer => Product in ${INITIAL_STATE.page}`, action.payload)
            return { ...state, productPage: action.payload}
        default:
            return state
    }
}