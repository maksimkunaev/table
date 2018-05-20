import React, { Component } from 'react';
import cn from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import Search from '@material-ui/icons/Search';

class Header extends Component {

    onFilter(e){
        e.preventDefault();
        let value = this.filterControl.value;
        this.props.onFilter(value);
    }

    render() {

        return <div className='Header'>
            <form className='App__filter' onSubmit={this.onFilter.bind(this)}>
                <FormControl>
                    <InputLabel htmlFor="adornment-password">Найти</InputLabel>
                    <Input
                        id="adornment-password"
                        inputRef={el => this.filterControl = el}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={this.onFilter.bind(this)}>
                                    <Search/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </form>
        </div>
    }
}

export default Header;
