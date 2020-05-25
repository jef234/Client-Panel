import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

class AppNavbar extends Component {
    state = {
        isAuthenticated: true
    }

    static getDerivedStateFromProps(props, state) {
        const { auth } = props

        if (auth.uid) {
            return { isAuthenticated: true }
        } else {
            return { isAuthenticated: false }
        }
    }

    onLogoutClick = e => {
        e.preventDefault()

        const { firebase } = this.props
        firebase.logout()
    }

    render() {
        const { isAuthenticated } = this.state
        const { auth } = this.props
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
                <Link to="/" className="navbar-brand" href="#">Client Panel</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {isAuthenticated ? (<React.Fragment>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Dashboard</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <span className="nav-link">{auth.email}</span>
                            </li>
                            <li className="nav-item">
                                <Link to="/Settings" className="nav-link">Settings</Link>
                            </li>
                            <li className="nav-item">
                                <a href="#!" onClick={this.onLogoutClick} className="nav-link">Logout</a>
                            </li>
                        </ul>
                    </React.Fragment>
                    ) : null}

                </div>
            </nav>
        )
    }
}

AppNavbar.protoTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth,
        settings:state.settings
    }))
)(AppNavbar)
