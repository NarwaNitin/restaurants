import axios from 'axios'

const RESTAURANTS_LOAD = 'restaurants/RESTAURANTS_LOAD'
const RESTAURANTS_LOAD_SUCCESS = 'restaurants/RESTAURANTS_LOAD_SUCCESS'
const RESTAURANTS_LOAD_FAIL = 'restaurants/RESTAURANTS_LOAD_FAIL'

const intialState = {
    loaded: false,
    loding: false,
    restaurantsList: {}
}

export default function restaurants (state = intialState, action = {}) {
    switch(action.type) {
        case RESTAURANTS_LOAD:
        return {
            ...state,
            loading: true
        }
        case RESTAURANTS_LOAD_SUCCESS:
        return {
            ...state,
            loading: false,
            loaded: true,
            restaurantsList: action.payload
        }
        case RESTAURANTS_LOAD_FAIL:
        return {
            ...state,
            loaded: false,
            loading: false,
            error: action.payload
        }
        default:
        return state
    }
}

export function getListOfRestaurants () {
    let accessToken = sessionStorage.getItem('xAccessToken');
    return dispatch => {
        dispatch({
            type: RESTAURANTS_LOAD
        })
        const url = encodeURI('/restaurants/api/restaurants')
        axios
        .get(url, {headers: {
            'xAccessToken': accessToken
        }})
        .then(response => {
            dispatch({
                type: RESTAURANTS_LOAD_SUCCESS,
                payload: response.data
            })
        })
        .catch(error => {
            dispatch({
                type: RESTAURANTS_LOAD_FAIL,
                payload: error.response && error.response.data
            })
        })
        
    }
}