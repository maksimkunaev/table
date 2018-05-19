import React, { Component } from 'react';
import { bind } from 'decko';
import Table from '../Table/Table';
import Card from '../Card';
import './App.css';

const SHORT_DATA_URL = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
const LARGE_DATA_URL = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
const ITEMS_PER_PAGE = 50;
const FIELDS = [
    ['id', 'ID'],
    ['firstName', 'First Name'],
    ['lastName', 'Last Name'],
    ['email', 'Email'],
    ['phone', 'Phone'],
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            fullUsers: [],
            sortedUsers: [],
            filteredUsers: [],
            sortBy: null,
            sortDirection: null,
            currentPage: 1,
            selectedUser: null
        };
    }

    componentDidMount() {
        this.loadShortData();
        document.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
    }

    async loadData(url) {
        const res = await fetch(url);
        const data = await res.json();

        this.setState({ fullUsers: data }, this.sort);
    }

    loadLargeData() {
        this.loadData(LARGE_DATA_URL);
    }

    loadShortData() {
        this.loadData(SHORT_DATA_URL);
    }

    @bind
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
        }, this.filter);
    }

    @bind
    filter() {
        const { sortedUsers, filter } = this.state;

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

    @bind
    onKeyDown(e) {
        if (e.code === 'Escape') {
            this.setState({ selectedUser: null });
        }
    }

    @bind
    onSort(name) {
        this.sort(name);
    }

    @bind
    onFilter(e) {
        e.preventDefault();
        this.setState({ filter: this.filterControl.value }, this.filter);
    }

    @bind
    onSelect(selectedUser) {
        const prevSelectedUser = this.state.selectedUser;

        if (prevSelectedUser && prevSelectedUser.id === selectedUser.id) {
            this.setState({ selectedUser: null })
        } else {
            this.setState({ selectedUser });
        }
    }

    render() {
        const {
            sortBy,
            sortDirection,
            selectedUser } = this.state;

        const tableData = this.getPageData();

        return (
            <div className='App'>
                <form className='App__filter' onSubmit={this.onFilter}>
                    <input ref={el => this.filterControl = el}/>
                    <button>Найти</button>
                </form>
                <h1>USERS</h1>
                <Table
                    fields={FIELDS}
                    data={tableData}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    onSort={this.onSort}
                    onSelect={this.onSelect}/>
                <div>1 2 3</div>
                <Card data={selectedUser}/>
            </div>
        )
    }
}

export default App;
