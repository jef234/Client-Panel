import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layouts/Spinner'
import classnames from 'classnames'

class ClientDetails extends Component {
    state = {
        showBalanceUpdate: false,
        balanceUpdateAmount: ''
    }

    balanceSubmit = e => {
        e.preventDefault()

        const { client, firestore } = this.props
        const { balanceUpdateAmount } = this.state

        const clientUpdate = {
            balance: parseFloat(balanceUpdateAmount)
        }
        firestore.update({ collection: 'clients', doc: client.id }, clientUpdate)
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })
    onDelete = () => {
        const { client, firestore, history } = this.props

        firestore
            .delete({ collection: 'clients', doc: client.id })
            .then(history.push('/'))
    }

    render() {
        const { client } = this.props
        const { showBalanceUpdate, balanceUpdateAmount } = this.state

        let balanceForm = ''
        if (showBalanceUpdate) {
            balanceForm = (
                <form onSubmit={this.balanceSubmit}>
                    <div className="input-group">
                        <input type="number" required className="form-control" name="balanceUpdateAmount" placeholder="Add New Balance" value={balanceUpdateAmount} onChange={this.onChange} />
                        <div className="input-group-append">
                            <input type="submit" value="Update" className="btn btn-outline-dark" />
                        </div>
                    </div>
                </form>
            )
        } else {
            balanceForm = null
        }

        if (client) {
            return (
                <span>
                    <div className="row">
                        <div className="col-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left"></i> Back
                            </Link>
                        </div>
                        <div className="col-6">
                            <div className="btn-group float-right">
                                <Link to={`/client/edit/${client.id}`} className="btn btn-sm btn-dark">Edit</Link>
                                <button onClick={this.onDelete} className="btn btn-sm btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="card">
                        <h4 className="card-header">
                            {client.firstName} {client.lastName}
                        </h4>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <h5>Client ID:{' '}<span className="text-secondary">{client.id}</span></h5>
                                </div>
                                <div className="col-6">
                                    <h4 className="pull-right">
                                        Balance:
                                        <span className={classnames({
                                        'text-danger': client.balance > 0,
                                        'text-success': client.balance <= 0
                                    })}>
                                            {' '}${parseFloat(client.balance).toFixed(2)}{' '}
                                        </span>
                                        <small>
                                            <a href=" " onClick={(e) => { this.setState({ showBalanceUpdate: !this.state.showBalanceUpdate }); e.preventDefault() }}>
                                                <i className="fas fa-pencil-alt" style={{}}></i>
                                            </a>
                                        </small>
                                    </h4>
                                    {balanceForm}
                                </div>
                            </div>
                            <hr />
                            <ul className="list-group">
                                <li className="list-group-item">Contact Email: {client.email}</li>
                                <li className="list-group-item">Contact Phone: {client.phone}</li>
                            </ul>
                        </div>
                    </div>
                </span>
            )
        } else {
            return <Spinner />
        }
    }
}

ClientDetails.prototypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetails)