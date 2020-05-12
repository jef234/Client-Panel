import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <span>
            <Link to="/client/add" className="btn btn-success btn-sm"><i className="fa fa-plus-circle" /> New</Link>
        </span>
    )
}

export default Sidebar
