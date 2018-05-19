import React, { Component } from 'react';
import cn from 'classnames';
import './Table.css';

const ITEMS_PER_PAGE = 50;
const FIELDS = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
];

class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullUsers: [],
            sortedUsers: [],
            filteredUsers: [],
            sortBy: null,
            sortDirection: null,
            currentPage: 1
        };
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
                    let users = JSON.parse(xhr.responseText)
                    console.log(`200, OK `, users);
                    this.getUsers(users)
                } else {
                    console.log(`not status 200 `, xhr)
                }
         }
        xhr.send();
    }

    getUsers(users) {
        let fullUsers = users;

        this.setState({ fullUsers }, this.sort.bind(this));
    }

    onSort(e) {
        const sortBy = e.target.getAttribute('data-sort-name');

        this.sort(sortBy);
    }

    sort(sortBy) {
        const { fullUsers, sortDirection } = this.state;

        let newSortDirection = sortDirection;
        let sortedUsers = fullUsers.slice();

        if (sortDirection === 'asc') {
            newSortDirection = 'desc';
        }
        if (sortDirection === 'desc') {
            newSortDirection = null;
        }
        if (sortDirection === null) {
            newSortDirection = 'asc';
        }

        if (newSortDirection === 'asc') {
            sortedUsers = sortedUsers.sort((a, b) => a[sortBy] > b[sortBy]);
        }
        if (newSortDirection === 'desc') {
            sortedUsers = sortedUsers.sort((a, b) => a[sortBy] < b[sortBy]);
        }

        this.setState({
            sortBy,
            sortDirection: newSortDirection,
            sortedUsers
        }, this.filter.bind(this));
    }

    filter() {
        const { filter } = this.props;
        const { sortedUsers } = this.state;

        const filteredUsers = sortedUsers.filter((user, i) => {
            return Object.keys(user).some(key => {
                const str = typeof user[key] === "string";
                const number = typeof user[key] === "number";
                const notObject = str || number;

                return String(user[key]).indexOf(filter) !== -1;
            });
        });

        this.setState({ filteredUsers });
    }

    getPageData() {
        const { filteredUsers, currentPage } = this.state;

        return filteredUsers.slice(
            currentPage - 1 * ITEMS_PER_PAGE,
            ITEMS_PER_PAGE
        );
    }

    renderHeader() {
        const { sortBy, sortDirection } = this.state;

        return <div className="Table__row Table__row_header">
            {FIELDS.map(field => {
                const needSort = sortBy === field && sortDirection;
                const classes = cn({
                    Table__cell: true,
                    [`Table__cell_sort_${sortDirection}`]: needSort
                });

                return <div className={classes} key={field}>
                    {field}
                </div>
            })}
        </div>
    }

    render() {
        const { sortBy } = this.state;
        const items = this.getPageData();
        const iconUp = '▲';
        const iconDown = '▼';

        return (
            <div className='Table'>
                {this.renderHeader()}
                {items.map(({ id, firstName, lastName, email, phone }, i) => {
                    return (
                        <div className='Table__row' key={i}>
                            <div className='Table__cell'>{id}</div>
                            <div className='Table__cell'>{firstName}</div>
                            <div className='Table__cell'>{lastName}</div>
                            <div className='Table__cell'>{email}</div>
                            <div className='Table__cell'>{phone}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Table;
