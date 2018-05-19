import React, { Component } from 'react';
import { bind } from 'decko';
import Table from '../Table/Table';
import Card from '../Card';
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const SHORT_DATA_URL = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
const LARGE_DATA_URL = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
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
            sortDirection: 'desc',
            currentPage: 1,
            selectedUser: null,
            pages: 1,
            loaded: null
        };
    }

    componentDidMount() {
        this.loadLargeData();
        document.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
    }

    async loadData(url) {
        const res = await fetch(url);
        const data = await res.json();
        const pages = Math.ceil(data.length / ITEMS_PER_PAGE);

        this.setState({
            fullUsers: data,
            pages,
            loaded: true
        }, this.sort)
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

        if (sortBy === 'id') {
            if (newSortDirection === 'asc') {
                sortedUsers = sortedUsers.sort((a, b) => a[sortBy] - b[sortBy]);
            } else {
                sortedUsers = sortedUsers.sort((a, b) => b[sortBy] - a[sortBy]);
            }
        }

        if (sortBy !== 'id') {
            if (newSortDirection === 'asc') {
                sortedUsers = sortedUsers.sort((a, b) => {
                    if (a[sortBy] > b[sortBy]) return 1;
                    if (a[sortBy] < b[sortBy]) return -1;
                });
            } else {
                sortedUsers = sortedUsers.sort((a, b) => {
                    if (b[sortBy] > a[sortBy]) return 1;
                    if (b[sortBy] < a[sortBy]) return -1;
                });
            }
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
            (currentPage - 1) * ITEMS_PER_PAGE,
            ITEMS_PER_PAGE * currentPage - 1
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

    @bind
    goToPage(i) {
        this.setState({ currentPage: i})
    }

    renderPagination() {
        let { pages } = this.state;
        let btns = [];

        for (var i = 1; i <= pages; i++ ) {
            btns.push(<button key={i} onClick={this.goToPage.bind(this, i)}>{i}</button>)
        }

        return btns
    }

    render() {
        const {
            sortBy,
            sortDirection,
            selectedUser,
            loaded } = this.state;
        const btns = this.renderPagination();
        const tableData = this.getPageData();
        let content;

        if (!loaded) {
            content = <div className='App__progress'>
                <CircularProgress size={70} />
            </div>
        } else {
            content = <div>
                <Table
                    fields={FIELDS}
                    data={tableData}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    onSort={this.onSort}
                    onSelect={this.onSelect}/>
                <Card data={selectedUser}/>
                { btns.map(btn => btn)}
            </div>
        }

        return (
            <div className='App'>
                <form className='App__filter' onSubmit={this.onFilter}>
                    <input ref={el => this.filterControl = el}/>
                    <button>Найти</button>
                </form>
                <h1>USERS</h1>
                { content }
            </div>
        )
    }
}

export default App;
