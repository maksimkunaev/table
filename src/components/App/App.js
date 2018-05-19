import React, { Component } from 'react';
import Table from '../Table/Table';
import './App.css';

class App extends Component {

    searchString(value) {
        let users = [];
        var filteredUsers = users.filter((user, i) => {
            var found = false;

            for (key in users) {
                var str = typeof users[key] === "string";
                var number = typeof users[key] === "number";
                var notObject = str || number;
                var hadSubString = String(users[key]).indexOf(value) !== -1;

                if (notObject && hadSubString) found = true;
            }
            return found;
        })
    }

    render() {
        return (
            <div className='App'>
                <form className='App__search' onSubmit={this.searchString.bind(this)}>
                    <input />
                    <button>Найти</button>
                </form>
                <Table />
            </div>
        )
    }
}

export default App;
