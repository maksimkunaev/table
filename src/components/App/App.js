import React, { Component } from 'react';
import Table from '../Table/Table';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    onSearch(e) {
        e.preventDefault();
        this.setState({ search: this.search.value });
    }

    render() {
        const { search } = this.state;

        return (
            <div className='App'>
                <form className='App__search' onSubmit={this.onSearch.bind(this)}>
                    <input ref={el => this.search = el}/>
                    <button>Найти</button>
                </form>
                <h1>USERS</h1>
                <Table filter={search} />
            </div>
        )
    }
}

export default App;
