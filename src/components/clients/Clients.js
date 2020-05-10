import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Clients extends Component {
    render() {
        const clients = [{
            id: '4344343434',
            firstName: 'Kavin',
            lastName: 'Johnson',
            email: 'kevin@gmail.com',
            balance: '30'
        }, {
            id: '4344343634',
            firstName: 'Kavin',
            lastName: 'Johnson',
            email: 'kevin@gmail.com',
            balance: '300.22'
        }]

        if (clients) {
            return (
                <span>
                    <div className="row">
                        <div className="col-6">
                            <h2>
                                <i className="fas fa-users"></i> Clients
                            </h2>
                        </div>
                        <div className="col-6" />
                    </div>
                    
                    <table className="table table-striped table-responsive">
                        <thead className="thead inverse">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Balance</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => (
                                <tr key={client.id}>
                                    <td>{client.firstName} {client.lastName}</td>
                                    <td>{client.email}</td>
                                    <td>${parseFloat(client.balance).toFixed(2)}</td>
                                    <td>
                                        <Link to={`/client/${client.id}`} className="btn btn-secondary btn-sm"><i className="fas fa-arrow-circle-right"></i> Details</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>



                </span>
            )
        }
        else {
            return <h1>Loading..</h1>
        }
    }
}

export default Clients