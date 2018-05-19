import React, { Component } from 'react';
import './Table.css';

class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullUsers: [],
            users: [],
            filteredUsers: [],
            searched: null,
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

        // fetch('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
        //   .then(response => {
        //     console.log(response.json());

        //     // return response.json();
        //    })
        let xhr = new XMLHttpRequest();
        //small
        xhr.open('GET', 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D', true);
        //large
        // xhr.open('GET', 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
                if (xhr.status === 200) {
                    console.log(`200, OK `, xhr)
                } else {
                    console.log(`not status 200 `, xhr)
                }
         }
        xhr.send();
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
            users: fullUsers.slice(0,50)
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

    searchString(e) {
        e.preventDefault();
        let value = this.search.value;
        let { users, searched } = this.state;

        let filteredUsers = users.filter((user, i) => {
            let found = false;

            for (let key in user) {
                let str = typeof user[key] === "string";
                let number = typeof user[key] === "number";
                let notObject = str || number;
                let hadSubString = String(user[key]).indexOf(value) !== -1;
                let notDescription = key !== 'description';

                if (notObject && hadSubString && notDescription) found = true;
            }
            return found;
        })
        this.setState({
            filteredUsers: filteredUsers,
            searched: true
        })
    }

    render() {

        let { users, sorted, filteredUsers, searched } = this.state;
        let iconUp = '▲',
            iconDown = '▼';

        let renderUsers = searched ? filteredUsers: users;

        return (
            <div className='Table__table' onClick={this.onSortTable.bind(this)}>
                <form className='App__search' onSubmit={this.searchString.bind(this)}>
                    <input ref={ node => this.search = node}/>
                    <button>Найти</button>
                </form>

                <div className='Table__name'>USERS</div>
                    <div className='Table__headers'>
                    { renderUsers.map}
                        <div ref={node => this.id = node}
                            className='Table__column_id'>
                            id {sorted.id ? iconDown:iconUp}</div>
                        <div ref={node => this.firstName = node}
                            className='Table__column_firstName'>
                            firstName {sorted.firstName ? iconDown:iconUp}</div>
                        <div ref={node => this.lastName = node}
                            className='Table__column_lastName'>
                            lastName {sorted.lastName ? iconDown:iconUp}</div>
                        <div ref={node => this.email = node}
                            className='Table__column_email'>
                            email {sorted.email ? iconDown:iconUp}</div>
                        <div ref={node => this.phone = node}
                            className='Table__column_phone'>
                            phone {sorted.phone ? iconDown:iconUp}</div>
                    </div>
                    <div className='Table__content'>
                    {
                        renderUsers.map((user, i) => <div key={i}className='Table__string'>
                        <div className='Table__column_id'>{user.id}</div>
                        <div className='Table__column_firstName'>{user.firstName}</div>
                        <div className='Table__column_lastName'>{user.lastName}</div>
                        <div className='Table__column_email'>{user.email}</div>
                        <div className='Table__column_phone'>{user.phone}</div>
                    </div>)
                    }
                </div>
            </div>
        )
    }
}

export default Table;
