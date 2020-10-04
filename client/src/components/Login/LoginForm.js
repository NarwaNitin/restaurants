import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { getLoginToken, resetLoginActions } from '../../store/modules/login'
import { getListOfRestaurants } from '../../store/modules/restaurants'

import LoginError from "./loginError";

const styles = theme => ({
    root: {
        height: "100vh"
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
});

export class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            openLoginErrorDialog: false
        }
    }

    handleEmail = (e) => {
        this.setState({ email: e })
    }

    handlePassword = (e) => {
        this.setState({ password: e })
    }
    
    handleCloseErrorDialog = () => {
        this.setState({openLoginErrorDialog: false})
    }
    signIn = () => {
        this.props.resetLoginActions()
        const { email, password } = this.state
        const loginDetails = { email: email, password: password }
        this.props.getLoginToken(loginDetails)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.loggedInUser && nextProps.loggedInUser.userDetails &&  nextProps.loggedInUser.userDetails.data && (Object.keys(nextProps.loggedInUser && nextProps.loggedInUser.userDetails && nextProps.loggedInUser.userDetails.data).length > 0)) {
            this.props.getListOfRestaurants()
            this.props.history.push('/restaurants');
        }
        else if(nextProps.loggedInUser &&  nextProps.loggedInUser.error && (Object.keys( nextProps.loggedInUser && nextProps.loggedInUser.error).length > 0)) {
            this.setState({openLoginErrorDialog: true})
        }
    }

    render() {
        const { email, password, openLoginErrorDialog } = this.state
        return (
            <Grid className={this.props.classes.root}>
                <CssBaseline />
                <Grid>
                    <div className={this.props.classes.paper}>
                        <Avatar className={this.props.classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography variant="h5">
                            Sign in
              </Typography>
                        <form className={this.props.classes.form} Validate>
                            <TextField
                                required
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={e => this.handleEmail(e.target.value)}
                            />
                            <TextField
                                required
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => this.handlePassword(e.target.value)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                // type="submit"
                                // disabled={true ? true : false}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={this.props.classes.submit}
                                // href={count && Object.keys(count) > 0 ? '/restaurants' : ''}
                                onClick={this.signIn}
                            >
                                Sign In
                </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/restaurants/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
                {openLoginErrorDialog ? <LoginError open={openLoginErrorDialog} errorMessage={this.props.loggedInUser && this.props.loggedInUser.error} handleCloseErrorDialog={this.handleCloseErrorDialog}/> : <div></div>}
            </Grid>
        );
    }
}

export const mapStateToProps = state => {
    const loggedInUser = state.login
    return {
        loggedInUser
    }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, { getLoginToken, resetLoginActions, getListOfRestaurants})(LoginForm)));
