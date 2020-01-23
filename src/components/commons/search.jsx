import React from 'react';

const Search = (props) => {
    const {onChange, value} = props;
    return ( 
        <div className="form-group">
            <input 
                name="search"
                value={value}
                onChange={e => onChange(e.currentTarget.value)}
                type="text" 
                className="form-control mr-sm-2" 
                placeholder="Search" 
                aria-label="Search">
            </input>
        </div>
    );
}

export default Search;