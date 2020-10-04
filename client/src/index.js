import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { compose, applyMiddleware, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
// import { saveState } from './localStorage'
import rootReducer from './store/reducer'
import App from './containers/App/App'

// const initialState = Map()
const store = createStore(
    rootReducer,
    // initialState,
    compose(
        applyMiddleware(reduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : noop => noop
    )
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)