import * as React from 'react'
import {connect} from 'react-redux'
import * as actions from '../redux/action'
import Button from '../components/CustomButton/CustomButton'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
export default connect(
    ({loggedOn}) => ({loggedOn}),
    (dispatch) => ({
        login : () => {dispatch(actions.login("Github"))}
    }))(

class AuthenticationPage extends React.Component{
    constructor(props){
        super(props)}
    componentDidMount(){
        console.log("Authentication\n","componentDidMount\n",this.props)
    }
    render(){
        console.log("Authenticcation", "render" , this.props)

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
            <div>
              <Button simple blockbsstyle="info" type="button" bsSize="lg" onClick = {this.props.login}>
                Login
              </Button>
            </div>
            )
        }
    
        
    }  

})