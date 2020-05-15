import * as React from 'react'
import {connect} from 'react-redux'
import * as actions from '../redux/action'
import Button from '../components/CustomButton/CustomButton'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import {Grid, Row, Col} from 'react-bootstrap'
import NavBar from '../components/Navbars/AdminNavbar'
import SideBar from '../components/Sidebar/Sidebar'
import Footer from '../components/Footer/Footer'
import logo from '../logo.png'

export default connect(
    ({loggedOn}) => ({loggedOn}),
    (dispatch) => ({
        login : () => {dispatch(actions.login("Github"))}
    }))(

class AuthenticationPage extends React.Component{
    constructor(props){
        super(props)}
    render(){

        const {loggedOn}  = this.props

        if(loggedOn){
            return(
                <div>
                    <Redirect to={"/admin/dashboard"}/>
                </div>
            )
        }

        else{
            return(
            

            <div className="wrapper">

                {/* <SideBar {...this.props} routes={[]} image={null}
                    color={null}
                    hasImage={null}
                    hideLogo = {true} /> */}

                {/* <div id="main-panel" className="main-panel" ref="mainPanel"> */}
                    <NavBar
                        {...this.props}
                        brandText={""}
                        hideButtons = {true}
                    />
                    <div style = {{alignContent:"center", marginTop: "7.5%",textAlign: 'center'}}>
                        <img src={logo} alt="logo_image" />
                        <h2>Repolytics</h2>
                    
                    <Button style = {{backgroundColor: "#000000"}} fill simple bsSize="large" onClick = {this.props.login} >
                        <i className = "fa fa-github fa-2x" style = {{display: "inline", paddingRight: "20px"}}>


                        </i>
                        <a style = {{color: "#FFFFFF", flex:1, position: "relative", bottom: "5px"}}>Sign in with Github</a>
                    
                    </Button>

                    {/* </div> */}
                  
                    
                </div>

                
            </div>

    
            
            )
        }
    
        
    }  

})