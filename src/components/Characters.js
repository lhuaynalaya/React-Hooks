import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react';
import Search from './Search';
import useCharacters from '../hooks/useCharacters';
import './styles.css';

const initialState = {
  favorites: []
};

const api = 'https://rickandmortyapi.com/api/character/';

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    default:
      return state;  
  }
};

const Characters = () => {

  // const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const characters = useCharacters(api);
  // useEffect (() => {
  //   fetch('https://rickandmortyapi.com/api/character/')
  //   .then(response => response.json())
  //   .then(data => setCharacters(data.results));
  // }, []);

  const handleClick = favorite => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
  };

  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // };

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  // const filteredCharacters = characters.filter((character) => {
  //   return character.name.toLowerCase().includes(search.toLowerCase());
  // });

  const filteredCharacters = useMemo(() =>
    characters.filter((character) => {
        return character.name.toLowerCase().includes(search.toLowerCase());
      }), [characters, search]
  );

  return (
    <div>
      <Search 
        search={ search }
        searchInput={ searchInput }
        handleSearch={ handleSearch }
      />
      <div className="character">
      {
        favorites.favorites.map(favorite => (
          <li key={ favorite.id }>
            { favorite.name }
          </li>
        ))
      }
      
      {
        filteredCharacters.map(character => (
          <div key={ character.id } className="imagen">
            <img alt='character' src={ character.image }></img>
            <h2>{ character?.name}</h2>
            <p>{ character?.name}</p>
            <button onClick={ () => handleClick(character) }> Agrear a favoritos</button>
          </div>
        ))
      }
      </div>
    </div>
  );
}

export default Characters;