import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layouts/Spinner'

class Clients extends Component {
    state = {
        totalOwed: null
    }

    static getDerivedStateFromProps(props, state) {
        if (props.clients !== state.clients) {
            const { clients } = props
            if (clients) {
                const total = clients.reduce((total, client) => {
                    return total + parseFloat(client.balance.toString())
                }, 0)
                return { totalOwed: total }
            } return null
        } return null
    }

    render() {
        const { clients } = this.props
        const { totalOwed } = this.state

        if (clients) {
            return (
                <span>
                    <div className="row">
                        <div className="col-6">
                            <h2>
                                <i className="fas fa-users"></i> Clients
                            </h2>
                        </div>
                        <div className="col-6">
                            <h5 className="text-right text-secondary">
                                Total Owed:
                                <span className="text-primary">
                                    ${parseFloat(totalOwed).toFixed(2)}
                                </span>
                            </h5>
                        </div>
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
            return <Spinner />
        }
    }
}
Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
}

export default compose(
    firestoreConnect(props => [{ collection: 'clients' }]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients)