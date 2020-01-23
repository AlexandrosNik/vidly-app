import React from 'react';

const Select = ({ name, label, options, error, value, onChange }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select className="form-control" 
                    id={name} 
                    name={name} 
                    value={value}
                    onChange={onChange} 
            >
                <option value=""/>
                {options.map(
                    option => <option 
                                key={option._id} 
                                value={option._id}
                                >
                                    {option.name}
                                </option>
                    )
                }
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Select;