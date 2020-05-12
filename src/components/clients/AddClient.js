import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { firestoreConnect } from 'react-redux-firebase'

class AddClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: ''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault()

        const newClient = this.state
        const { firestore, history } = this.props

        if(newClient.balance === '') newClient.balance = 0

        firestore.add({ collection: 'clients' }, newClient).then(() => history.push('/'))
    }

    render() {
        let { firstName, lastName, email, phone, balance } = this.state

        return (
            <span>
                <div className="row mb-3">
                    <div className="col-6">
                        <Link to="/" className="btn btn-secondary btn-sm">
                            <i className="fas fa-arrow-circle-left" /> Back
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header"><h3>Add Cient</h3></div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control" name="firstName" minLength="2" required onChange={this.onChange} value={firstName} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" name="lastName" minLength="2" required onChange={this.onChange} value={lastName} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" name="email" required onChange={this.onChange} value={email} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" className="form-control" name="phone" minLength="10" required onChange={this.onChange} value={phone} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="balance">Balance</label>
                                <input type="text" className="form-control" name="balance" onChange={this.onChange} value={balance} />
                            </div>
                            <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                        </form>
                    </div>
                </div>
            </span>
        )
    }
}

AddClient.prototypes ={
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(AddClient)