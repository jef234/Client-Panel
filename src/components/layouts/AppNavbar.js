import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AppNavbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
                <Link to="/" className="navbar-brand" href="#">Client Panel</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Dashboard</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default AppNavbar
