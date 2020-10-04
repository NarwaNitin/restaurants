import axios from 'axios'

const SIGNUP_LOAD = 'signUp/SIGNUP_LOAD'
const SIGNUP_LOAD_SUCCESS = 'signUp/SIGNUP_LOAD_SUCCESS'
const SIGNUP_LOAD_FAIL = 'signUp/SIGNUP_LOAD_FAIL'
const RESET_SIGNUP = 'signUp/RESET_SIGNUP'

const intialState = {
    loaded: false,
    loding: false,
    signupDetails: {}
}

export default function signUp (state = intialState, action = {}) {
    switch(action.type) {
        case SIGNUP_LOAD:
        return {
            ...state,
            loading: true
        }
        case SIGNUP_LOAD_SUCCESS:
        return {
            ...state,
            loading: false,
            loaded: true,
            signupDetails: action.payload
        }
        case SIGNUP_LOAD_FAIL:
        return {
            ...state,
            loaded: false,
            loading: false,
            error: action.payload
        }
        case RESET_SIGNUP:
        return {
            ...intialState
        }
        default:
        return state
    }
}

export function addUser (UserDetails) {
    return dispatch => {
        dispatch({
            type: SIGNUP_LOAD
        })
        const url = encodeURI('/restarunts/api/signup')
        axios
        .post(url, UserDetails)
        .then(response => {
            dispatch({
                type: SIGNUP_LOAD_SUCCESS,
                payload: response.data
            })
        })
        .catch(error => {
            dispatch({
                type: SIGNUP_LOAD_FAIL,
                payload: error.response && error.response.data
            })
        })
        
    }
}


export function resetSignupActions(){
    return dispatch => {
        dispatch({
            type: RESET_SIGNUP
        })
    }
}