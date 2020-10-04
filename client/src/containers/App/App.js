/* eslint-disable */
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import styled, { createGlobalStyle } from 'styled-components'
import { withStyles } from '@material-ui/styles'
import TopNav from '../TopNav'
import LoginForm from '../../components/Login/LoginForm'
import SignupForm from '../../components/Login/Signup'
import Restaurants from '../../components/Restaurants/Restaurant'
// Global Styles
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
html {
font-family: 'Lato', helvetica, arial, sans-serif;
* {
::-webkit-scrollbar {
width: 14px;
height: 18px;
}
::-webkit-scrollbar-thumb {
height: 6px;
border: 4px solid rgba(0, 0, 0, 0);
background-clip: padding-box;
-webkit-border-radius: 7px;
border-radius: 7px;
-webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05);
box-shadow: inset 1px 1px 0px rgba(0, 0, 0, 0.05);
background-color: rgba(0, 0, 0, 0.26);
}
::-webkit-scrollbar-button {
width: 0;
height: 0;
display: none;
}
::-webkit-scrollbar-corner {
background-color: transparent;
}
::-webkit-scrollbar-track {
background-color: transparent;
}
/* Hides the default calendar */
input::-webkit-calendar-picker-indicator {
display: none;
}
input[type=date]::-webkit-inner-spin-button {
-webkit-appearance: none;
display: none;
}
}
}
:root {
font-size: 100%;
}
.react-draggable{
width:max-content;
}
.switch-wrapper .react-draggable{
width:100%!important;
}
`

const AppWrapper = styled('div')({
    // height: '100vh',
    display: 'grid',
    gridTemplateRows: '56px 4px auto',
    overflow: 'visible'
})

const Login = () => <LoginForm />
const Signup = () => <SignupForm />
const restaurantsList = () => <Restaurants/>

export class App extends Component {
    constructor(props) {
        super(props)
        this.state = { topNavhidden: false }
    }

    renderRoutes() {
        return (
            <Switch>
                {/* <div><h4>Welcome to YOUR RESTARUNT</h4></div> */}
                <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                    <div></div>
                    <Route exact path="/signIn" component={Login} />
                    <Route exact path="/signUp" component={Signup}/>
                    {/* <Route exact path="/restaurants" component={restaurantsList}/> */}
                </div>
                <Route exact path="/restaurants" component={()=><Restaurants/>}/>
                </div>
            </Switch>
        )
    }

    render() {
        return (
            <BrowserRouter basename="/restaurants">
                <GlobalStyle />
                <AppWrapper>
                    <TopNav />
                    {this.renderRoutes()}
                </AppWrapper>
            </BrowserRouter>
        )
    }
}

export const mapStateToProps = state => {
    const signedUpUser = state.signUp
    const logedInUser = state.login.userDetails
    return {
        signedUpUser,
        logedInUser
    }
}

export const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
}

export default withStyles()(connect(mapStateToProps, mapDispatchToProps)(App))

App.propTypes = {}