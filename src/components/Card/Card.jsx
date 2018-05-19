import React, { Component } from 'react';
import cn from 'classnames';
import './Card.css';

class Card extends Component {
    renderContent() {
        const { firstName, lastName, email, phone, address, description } = this.props.data;
        const { streedAddress, city, state, zip } = address;

        return <div className="Card__content">
            <h2>{firstName} {lastName}</h2>
            ...
        </div>
    }

    render() {
        const visible = Boolean(this.props.data);
        const classes = cn({
            Card: true,
            Card_visible: visible
        });

        return <div className={classes}>
            {visible && this.renderContent()}
        </div>
    }
}

export default Card;
