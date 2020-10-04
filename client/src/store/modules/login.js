import axios from 'axios'

const LOGIN_LOAD = 'login/LOGIN_LOAD'
const LOGIN_LOAD_SUCCESS = 'login/LOGIN_LOAD_SUCCESS'
const LOGIN_LOAD_FAIL = 'login/LOGIN_LOAD_FAIL'
const RESET_LOGIN = 'login/RESET_LOGIN'

const intialState = {
    loaded: false,
    loding: false,
    userDetails: {}
}

export default function login (state = intialState, action = {}) {
    switch(action.type) {
        case LOGIN_LOAD:
        return {
            ...state,
            loading: true
        }
        case LOGIN_LOAD_SUCCESS:
        return {
            ...state,
            loading: false,
            loaded: true,
            userDetails: action.payload,
            error:{}
        }
        case LOGIN_LOAD_FAIL:
        return {
            ...state,
            loaded: false,
            loading: false,
            error: action.payload
        }
        case RESET_LOGIN:
        return {
            ...intialState
        }
        default:
        return state
    }
}

export function getLoginToken (loginDetails) {
    return dispatch => {
        dispatch({
            type: LOGIN_LOAD
        })
        const url = encodeURI('http://localhost:7000/login')
        axios
        .post(url, loginDetails)
        .then(response => {
            const myStorage = window.sessionStorage;
            myStorage.setItem('xAccessToken', response.data.accessToken);
            dispatch({
                type: LOGIN_LOAD_SUCCESS,
                payload: response.data
            })
        })
        .catch(error => {
            dispatch({
                type: LOGIN_LOAD_FAIL,
                payload: error.response && error.response.data
            })
        })
        
    }
}

export function resetLoginActions(){
    return dispatch => {
        dispatch({
            type: RESET_LOGIN
        })
    }
}