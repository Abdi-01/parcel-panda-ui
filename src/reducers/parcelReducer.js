const INITIAL_STATE = {
    parcel_list: []
}

export const parcelReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_PARCEL":
            return { ...state, parcel_list: action.payload }
        default:
            return state
    }
}