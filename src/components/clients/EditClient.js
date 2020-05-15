import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layouts/Spinner'

class EditClient extends Component {
    constructor(props) {
        super(props)
        this.firstName = React.createRef()
        this.lastName = React.createRef()
        this.email = React.createRef()
        this.phone = React.createRef()
        this.balance = React.createRef()
    }

    onSubmit = (e) => {
        e.preventDefault()

        const { client, firestore, history } = this.props

        const updClient = {
            firstName: this.firstName.current.value,
            lastName: this.lastName.current.value,
            email: this.email.current.value,
            phone: this.phone.current.value,
            balance: this.balance.current.value ? this.balance.current.value : 0
        }

        firestore
            .update({ collection: 'clients', doc: client.id }, updClient)
            .then(() => history.push('/'))
    }

    render() {
        const { client } = this.props

        if (client) {
            return (
                <span>
                    <div className="row mb-2">
                        <div className="col-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left" /> Back
                            </Link>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header"><h3>Edit Cient</h3></div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" name="firstName" minLength="2" required onChange={this.onChange} ref={this.firstName} defaultValue={client.firstName} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" name="lastName" minLength="2" required onChange={this.onChange} ref={this.lastName} defaultValue={client.lastName} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" required onChange={this.onChange} ref={this.email} defaultValue={client.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" className="form-control" name="phone" minLength="10" required onChange={this.onChange} ref={this.phone} defaultValue={client.phone} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="balance">Balance</label>
                                    <input type="text" className="form-control" name="balance" onChange={this.onChange} ref={this.balance} defaultValue={client.balance} />
                                </div>
                                <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                            </form>
                        </div>
                    </div>
                </span>
            )
        } else {
            return <Spinner />
        }
    }
}

EditClient.prototypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(EditClient)