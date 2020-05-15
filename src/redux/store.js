import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducer.js';
// import * as middle from './middle';
import thunk from 'redux-thunk'

//const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    )
//tips: can pass initial state to createStore -> server side rendering, state preloading

export default store