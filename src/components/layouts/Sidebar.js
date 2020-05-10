import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div>
            <Link to="/client/add" className="btn btn-success btn-block"><i className="fa fa-plus-circle" /></Link>
        </div>
    )
}

export default Sidebar
