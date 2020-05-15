import * as React from 'react'
import {connect} from 'react-redux'
import * as actions from './redux/action'

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Authentication from './layouts/AuthenticationPage'
import AdminLayout from './layouts/Admin'
export default connect((state) => ({state}), 
(dispatch) => ({
    initializeApp : (state) => {if(!state){dispatch(actions.initialize())}}
}))(
    class App extends React.Component{
        constructor(props){super(props)}
        componentDidMount(){
            console.log("App")
            console.log("componentDidMount: ",this.props)
            this.props.initializeApp(this.props.state.loggedOn)
        }
        render(){
            const {startup, loggedOn} = this.props.state
            return(

                startup ? 
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" render={props => <Authentication {...props} /> } />
                            <Route path={`/admin`} render={props => loggedOn ? <AdminLayout {...props} /> : <Redirect to="/"/>}/>
                            {/* <Route path={`/admin`} render={props => <AdminLayout {...props} />}/>
                            <Redirect to='/admin/dashboard'/> */}

                        </Switch>
                    </BrowserRouter>
                :
                    null
            )
        }

    })