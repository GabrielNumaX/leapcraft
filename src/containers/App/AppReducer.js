import * as actionTypes from './actionTypes'

const initialState = {
    toastShow: false,
    toastMessage: '',
    toastIcon: null,
    isLoggedIn: false,
    userType: localStorage.getItem('usertype') || 'guest',
    username: localStorage.getItem('username') || null,
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOG_IN_OUT:
            return { ...state, isLoggedIn: action.payload }
        case actionTypes.SET_USERNAME:
            return { ...state, username: action.payload }
        case actionTypes.SHOW_TOAST:
            return {
                ...state,
                toastShow: action.show,
                toastMessage: action.message,
                toastIcon: action.icon,
            }
        case actionTypes.SET_USER_TYPE:
            return { ...state, userType: action.payload }
        default:
            return state
    }
}

export default appReducer;