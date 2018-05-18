import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullUsers: [],
            users: [],
            sorted: {
                id: null,
                firstName: null,
                lastName: null,
                email: null,
                phone: null
            }
        }
    }

    componentWillMount() {
        this.getUsers();
    }

    getUsers() {
        let fullUsers = [
            {
                id: 101,
                firstName: 'Rrre',
                lastName: 'Lorson',
                email: 'HWhalley@in.gov',
                phone: '(612)999-6296',
                address: {
                    streetAddress: '9792 Mattis Ct',
                    city: 'Waukesha',
                    state: 'WI',
                    zip: '22178'
                },
                description: 'et lacus magna dolor...'
            },
            {
                id: 102,
                firstName: 'Sue',
                lastName: 'Corson',
                email: 'yyyyey@in.gov',
                phone: '(612)555-6296',
                address: {
                    streetAddress: '9792 Mattis Ct',
                    city: 'Waukesha',
                    state: 'WI',
                    zip: '22178'
                },
                description: 'et lacus magna dolor...'
            },
            {
                id: 123,
                firstName: 'Joe',
                lastName: 'Aon',
                email: 'aaaalley@in.gov',
                phone: '(612)111-6296',
                address: {
                    streetAddress: '9792 Mattis Ct',
                    city: 'Waukesha',
                    state: 'WI',
                    zip: '22178'
                },
                description: 'et lacus magna dolor...'
            },
            {
                id: 113,
                firstName: 'ert',
                lastName: 'Aon',
                email: 'aaaalley@in.gov',
                phone: '(612)151-6296',
                address: {
                    streetAddress: '9792 Mattis Ct',
                    city: 'Waukesha',
                    state: 'WI',
                    zip: '22178'
                },
                description: 'et lacus magna dolor...'
            },
            {
                id: 213,
                firstName: 'Joer',
                lastName: 'Aon',
                email: 'aaaalley@in.gov',
                phone: '(612)211-6296',
                address: {
                    streetAddress: '9792 Mattis Ct',
                    city: 'Waukesha',
                    state: 'WI',
                    zip: '22178'
                },
                description: 'et lacus magna dolor...'
            },


        ]

        this.setState({
            fullUsers: fullUsers,
            users: fullUsers.slice(0,3)
        })
    }

    onSortTable(e) {
        let { users, sorted } = this.state;
        let target = e.target;

        let sortBy = target === this.id ? 'id':
            target === this.firstName ? 'firstName':
            target === this.lastName ? 'lastName':
            target === this.email ? 'email':
            target === this.phone ? 'phone': '';

        if (target === this[sortBy] ) {
            if (sorted[sortBy]) {
                users.sort( (a, b) => a[sortBy] > b[sortBy]);
                sorted[sortBy] = false;
            } else {
                users.sort( (a, b) => a[sortBy] < b[sortBy]);
                sorted[sortBy] = true;
            }
            this.setState({
                users,
                sorted
            })
        }
    }

    render() {

        let { users, sorted } = this.state;
        let iconUp = '▲',
            iconDown = '▼'

        return (
            <div className='App__table' onClick={this.onSortTable.bind(this)}>
                <div className='App__name'>USERS</div>
                    <div className='App__headers'>
                    { users.map}
                        <div ref={node => this.id = node}
                            className='App__column_id'>
                            id {sorted.id ? iconDown:iconUp}</div>
                        <div ref={node => this.firstName = node}
                            className='App__column_firstName'>
                            firstName {sorted.firstName ? iconDown:iconUp}</div>
                        <div ref={node => this.lastName = node}
                            className='App__column_lastName'>
                            lastName {sorted.lastName ? iconDown:iconUp}</div>
                        <div ref={node => this.email = node}
                            className='App__column_email'>
                            email {sorted.email ? iconDown:iconUp}</div>
                        <div ref={node => this.phone = node}
                            className='App__column_phone'>
                            phone {sorted.phone ? iconDown:iconUp}</div>
                    </div>
                    <div className='App__content'>
                    {
                        users.map((user, i) => <div key={i}className='App__string'>
                        <div className='App__column_id'>{user.id}</div>
                        <div className='App__column_firstName'>{user.firstName}</div>
                        <div className='App__column_lastName'>{user.lastName}</div>
                        <div className='App__column_email'>{user.email}</div>
                        <div className='App__column_phone'>{user.phone}</div>
                    </div>)
                    }
                </div>
            </div>
        )
    }
}

export default App;
