import * as constants from './constants'
import { database } from 'firebase';
const initState = {
    loggedOn :false,
    startup: false,
    redirectLink:null,
    activeRepo : null,
    repos: null,
    data: null
}


export default function rootReducer(state = initState, action){
    switch(action.type){
        case constants.PUT_STATE:
            return Object.assign({},state, action.payload)
            break;
        
        case constants.REDIRECT:
            return Object.assign({},state,action.payload)
            break;
    }

    return state
}