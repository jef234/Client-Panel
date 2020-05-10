import React from 'react'
import Clients from '../clients/Clients'
import Sidebar from '../layouts/Sidebar'

function Dashboard() {
    return (
        <div className="row">
            <div className="col-10">
                <Clients />
            </div>
            <div className="col-2">
                <Sidebar />
            </div>
        </div>
    )
}

export default Dashboard
