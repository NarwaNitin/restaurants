import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { Button } from '@material-ui/core';
// import Logo from './logo'

const styles = theme => ({
    appBar: {
        position: 'absolute',
        boxShadow: 'none',
        borderBottom: '1px solid #E8E8E8',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    }
})

class TopNav extends React.Component {

    handleSignIn = () => {
        const path = '/signIn'
        this.props.history.push(path)
    }

    handleSignUp = () => {
        const path = '/signUp'
        this.props.history.push(path)
    }

    handleLogout = () => {
        const path = '/'
        this.props.history.push(path)
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <AppBar
                    className={ classes.appBar }
                    position='static'
                    color='inherit'
                >
                    <Toolbar
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            minHeight: '40px'
                        }}
                        disableGutters
                    >
                        <div style={{marginLeft: '20px'}}>
                            <b>Your Restarunt</b>
            </div>
                        {window.location.pathname !== '/restaurants/restaurants' ? 
                         <div style={{ textAlignLast: 'end' }}>
                         <Button onClick={() => this.handleSignIn()}>
                             Signin
         </Button>
                         <Button onClick={() => this.handleSignUp()}>
                             Signup
         </Button>
                     </div> : <div>
                     <Button style={{ marginLeft: '860px' }} onClick={() => this.handleLogout()}>
                             Logout
         </Button>
                         </div>}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export const mapStateToProps = state => {
    return {}
}

TopNav.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    themeName: PropTypes.object
}

// export default withStyles(styles)()

export default withRouter(withStyles(styles)(connect(mapStateToProps, {})(TopNav)))