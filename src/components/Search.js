import React from 'react';

const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <div className="search">
      <input placeholder="Buscar" type='text' value={ search } ref={ searchInput } onChange={ handleSearch }></input>
    </div>
  );
}

export default Search;