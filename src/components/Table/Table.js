import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './Table.css';

class Table extends Component {
    static propTypes = {
        onSort: PropTypes.func,
        onSelect: PropTypes.func,
        fields: PropTypes.arrayOf(
            PropTypes.arrayOf(PropTypes.string)
        ),
        data: PropTypes.arrayOf(PropTypes.object),
    }

    onTitleClick(name) {
        const { onSort } = this.props;

        if (onSort) {
            onSort(name);
        }
    }

    onRowClick(data) {
        const { onSelect } = this.props;

        if (onSelect) {
            onSelect(data);
        }
    }

    renderHeader() {
        const { fields, sortBy, sortDirection } = this.props;

        return <tr className="Table__row Table__row_header">
            {fields.map(([name, title]) => {
                const needSort = sortBy === name && sortDirection;
                const classes = cn({
                    Table__cell: true,
                    [`Table__cell_sort_${sortDirection}`]: needSort
                });

                return <td className={classes} key={name} onClick={() => this.onTitleClick(name)}>
                    {title}
                </td>
            })}
        </tr>
    }

    render() {
        const { data, fields } = this.props;

        return (
            <table className='Table'>
                <thead>
                    {this.renderHeader()}
                </thead>
                <tbody>
                    {data.map((rowData, i) => {
                        return <tr className="Table__row" key={i} onClick={() => this.onRowClick(rowData)}>
                            {
                                fields.map(([name], j) => <td className="Table__cell" key={j}>
                                    {rowData[name]}
                                </td>)
                            }
                        </tr>
                    })}
                </tbody>
            </table>
        )
    }
}

export default Table;
