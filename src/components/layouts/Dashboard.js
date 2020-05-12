import React from 'react'
import Clients from '../clients/Clients'
import Sidebar from '../layouts/Sidebar'

function Dashboard() {
    return (
        <span className="row">
            <span className="col-10">
                <Clients />
            </span>
            <span className="col-2">
                <Sidebar />
            </span>
        </span>
    )
}

export default Dashboard
