import * as actionTypes from './actionTypes'

const initialState = {
    toastShow: false,
    toastMessage: '',
    toastIcon: null,
    isLoggedIn: false,
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOG_IN_OUT:
            return { ...state, isLoggedIn: action.payload }
        case actionTypes.SHOW_TOAST:
            return {
                ...state,
                toastShow: action.show,
                toastMessage: action.message,
                toastIcon: action.icon,
            }
        default:
            return state
    }
}

export default appReducer;