
import * as constants from './constants'
import axios from 'axios'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { initializeApp } from 'firebase'
import { bindActionCreators } from 'redux'
import { resolveModuleName } from 'typescript'

export const foo = () => {
    return {type: constants.PUT_STATE, payload: {}}
}


export const dispatchFoo = () => {
    return function(dispatch){

        return axios.get("https://pokeapi.co/api/v2/")
        .then((response) => response.json())
        .then((data) => {
            console.log("Pokemon data:")
            console.log(data)
        })
    }
}

export function initialize(){

    //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    // .catch((error) => {
    //     console.error(error)
    // }) 
    // return (dispatch) => {
    //     firebase.auth().onAuthStateChanged((user) => {

    //         if(user){
    //             console.log("user is logged on already")
    //             dispatch({type: constants.PUT_STATE, payload: {startup: true, loggedOn: true}})}
    //         else{dispatch({type: constants.PUT_STATE, payload: {startup: true, loggedOn: false}})}     
    //     })    
    // }
    return {type: constants.PUT_STATE, payload: {startup: true, loggedOn: false}}
    

}
export function getGithubData(token){

    console.log("getGithubData")
    return function(dispatch){
        
        return fetch("https://api.github.com/user/repos",{
            method: 'GET',
            mode: 'cors',
            //body: JSON.stringify(data),
            headers: {
                "Authorization": "token " + token,
                'Content-Type': 'application/json'
              },    
        })

        .then(response => response.json())
        .then(json => {
            //var fs = require('fs')
            //fs.writeFile("./local_storage/githubData.json", json)
            console.log("data: ", json)
            dispatch({ type: constants.PUT_STATE, payload: {repos: json} });
        })
        .catch(error => {
            console.error("FETCH FAIL: " + error)
        });
        
    }
}
export function logout(){
    return function(dispatch){

        firebase.auth().signOut().then(
            () => {
                dispatch({type: constants.PUT_STATE, payload: {loggedOn: false, token: null}})
            }
        )
    }
}
export function login(provider){
    
    var myProvider = null
    switch(provider){
        case "Github":
            myProvider = new firebase.auth.GithubAuthProvider();
            myProvider.addScope('repo');
            break;
        default:
            console.error("PROVIDER: " + provider + " is not a valid provider")
            return
            break;
    }
    
    if(myProvider){
                
        // Using a popup.
        myProvider.addScope('profile');
        myProvider.addScope('email');
        
        return (dispatch, getState) => {
            
            const {loggedOn} = getState()
            console.log("getState")
            console.log(getState())
            
            if(!loggedOn){
                firebase.auth().signInWithPopup(myProvider).then(function(result) {
                    // This gives you a Google Access Token.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    console.log("login success:")
                    console.log("credentials:")
                    console.log(result.credential)

                    //nested promise to cache token into firebase
                    //dispatch(postData(`articles`, {token: result.credential.accessToken}))
                    dispatch({type: constants.PUT_STATE, payload: {token: result.credential.accessToken, loggedOn : true}})
                    console.log("updating redirectLink")
                    //dispatch({type: constants.REDIRECT, payload:{redirectLink: "/admin/dashboard"}})
                    dispatch(getGithubData(result.credential.accessToken))

                })
                // .then((result) => {postData(`articles/`, {token: result.credential.accessToken})})
                // .then((result) => {dispatch({type: constants.PUT_STATE, payload: {status: "success", user: result.user, token: result.credential.accessToken, provider: provider, loggedOn : true, error: null}})})
                .catch(function(error){
                    dispatch({type: constants.PUT_STATE, payload: {status: "failed", error: error}})
                })
            }
        }   
    }   
}

export function postData(directory, data){
    console.log("fetching")
    return function(dispatch){
        return fetch(`https://react-redux-tutorial-7fcec.firebaseio.com/${directory}.json`,{
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
              },
        })
        .then(response => response.json())
        .then((json) => {console.log("json: \n",json);dispatch({type: constants.PUT_STATE, payload: {status: "SUCCESS_POST_DATA"}})})
        .catch(error => {console.error(error)})
    };
}

export function setRepo(repo){
    return {type: constants.PUT_STATE, payload: {activeRepo: repo}}
}


/////Dashboard functions
export function loadData(repo){

    console.log("loadData")

    const fields = Object.keys(repo)
    const fetchingURLs = fields.filter((value) => constants.VALID_URLS.includes(value))

    return function(dispatch, getState){
        const {token} = getState()
        for(let url of fetchingURLs){            
            dispatch(fetchDataFrom(url, repo[url], token))
        }

        
    }
}

function fetchDataFrom(key, url, token){

    url = url.split("{")[0]
    return function(dispatch, getState){
        return fetch(url,{
            method: 'GET',
            mode: 'cors',
            //body: JSON.stringify(data),
            headers: {
                "Authorization": "token " + token,
                'Content-Type': 'application/json'
              },    
        })
        .then(response => response.json())
        .then(json => {console.log(key + ": ", json)})
    }
    
}