import React from 'react';

const ListGroup = (props) => {
    const { items, textProperty, valueProperty, onItemSelect, selectedItem } = props;
    return ( 
        <ul className='list-group'>
            {items.map(item => (
                <li 
                    key={item[textProperty] || item[valueProperty]}
                    className={selectedItem === item ? 'clickable list-group-item active':'clickable list-group-item'}
                    onClick={() => onItemSelect(item)}
                >
                    {item[textProperty]}
                </li>
            ))}
        </ul>
    );
}
 
ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

export default ListGroup;