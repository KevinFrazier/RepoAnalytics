import * as constants from './constants'
const initState = {
    loggedOn :false,
    startup: false,
    redirectLink:null,
    activeRepo : null,
    repos: null
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