import React from 'react';

const Search = ({onSearchTextChange}) => (
    <div className="searchbar">
        <input
            type="text"
            className="form-control"
            placeholder="Найти по названию или адресу"
            onChange={onSearchTextChange}
        />
    </div>
);

export default Search;
