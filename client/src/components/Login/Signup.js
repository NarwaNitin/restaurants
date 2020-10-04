import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import { addUser, resetSignupActions } from "../../store/modules/signUp"
import SignupSuccess from "./SignupSuccess"
import SignupError from "./SignupError";

// let buff = new Buffer(data);
// let base64data = buff.toString('base64');

const styles = theme => ({
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

export class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      value: 'basic',
      openSuccessSignup: false,
      openSignupErrorDialog: false
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.addedUserDetails && nextProps.addedUserDetails.signup && nextProps.addedUserDetails.signup.signupDetails && (Object.keys(nextProps.addedUserDetails && nextProps.addedUserDetails.signup && nextProps.addedUserDetails.signup.signupDetails).length > 0)) {
      this.setState({ openSuccessSignup: true })
    } else if (nextProps.addedUserDetails && nextProps.addedUserDetails.signup && nextProps.addedUserDetails.signup.error && (Object.keys(nextProps.addedUserDetails && nextProps.addedUserDetails.signup && nextProps.addedUserDetails.signup.error).length > 0)) {
      this.setState({ openSignupErrorDialog: true })
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  setFirstName = (e) => {
    this.setState({ firstName: e })
  }
  setLastName = (e) => {
    this.setState({ lastName: e })
  }
  setEmail = (e) => {
    this.setState({ email: e })
  }
  setPassword = (e) => {
    this.setState({ password: e })
  }

  createAccount = () => {
    // let buff = new Buffer(password);
    // let base64data = buff.toString('base64');
    this.props.resetSignupActions()
    const { firstName, lastName, email, password, value } = this.state
    const userDetails = { firstName: firstName, lastName: lastName, email: email, password: password, role: value }
    this.props.addUser(userDetails)
  }

  handleCloseSignupErrorDialog = () => {
    this.setState({ openSignupErrorDialog: false })
  }

  handleCloseSignupSuccessDialog = () => {
    this.setState({ openSuccessSignup: false })
    this.props.history.push('/');
  } 

  render() {
    const { classes } = this.props
    const { firstName, lastName, email, password, value, openSuccessSignup, openSignupErrorDialog } = this.state
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={e => this.setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lastName}
                  onChange={e => this.setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => this.setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => this.setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup aria-label="users-group" name="Users-Group" value={value} onChange={this.handleChange}>
                  <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                  <FormControlLabel value="basic" control={<Radio />} label="User" />
                </RadioGroup>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.createAccount}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/restaurants/signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {openSuccessSignup ? <SignupSuccess open={openSuccessSignup} sucessMessage={this.props.addedUserDetails && this.props.addedUserDetails.signup && this.props.addedUserDetails.signup.signupDetails} handleCloseSignupSuccessDialog={this.handleCloseSignupSuccessDialog}/> : openSignupErrorDialog ? <SignupError open={openSignupErrorDialog} errorMessage={this.props.addedUserDetails && this.props.addedUserDetails.signup && this.props.addedUserDetails.signup.error} handleCloseSignupErrorDialog={this.handleCloseSignupErrorDialog} /> : ''}
      </Container>
    );
  }
}

export const mapStateToProps = state => {
  const addedUserDetails = state
  return {
    addedUserDetails
  }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, { addUser, resetSignupActions })(Signup)));
