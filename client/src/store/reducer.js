import { combineReducers } from 'redux'
import login from './modules/login'
import signup from './modules/signUp'
import restaurants from './modules/restaurants'

export default combineReducers({login, signup, restaurants})