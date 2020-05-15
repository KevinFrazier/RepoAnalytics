/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import {connect} from 'react-redux'
import * as actions from '../../redux/action'
export default connect((state) => ({state}),
(dispatch) => ({
  login : () => {dispatch(actions.login("Github"))},
  logout : () => {dispatch(actions.logout())}
}))(
  class AdminNavbarLinks extends Component {
    render() {
      const {loggedOn} = this.props.state
      return (
        <div>
          <Nav>

            {!this.props.hideActionButtons ?
            <>
              <NavItem eventKey={1} href="#">
                <i className="fa fa-dashboard" />
                <p className="hidden-lg hidden-md">Dashboard</p>
              </NavItem>
              <NavItem eventKey={3} href="#">
                <i className="fa fa-search" />
                <p className="hidden-lg hidden-md">Search</p>
              </NavItem>
            </>
            :
            null
            }
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={3} onClick= {loggedOn ? this.props.logout : this.props.login}>
              {loggedOn? "Log out" : "Login" } 
            </NavItem>
          </Nav>
        </div>
      );
    }
  }
)