import './Search.css';
import React, { useContext } from 'react';
import { LibraryContext, SearchContext } from '../../model/Model';

export function Search() {

  const [, libraryDispatch] = useContext(LibraryContext);
  const [searchState, searchDispatch] = useContext(SearchContext);

  const searchHolder = e => {
    searchDispatch({type: 'searchChange', payload: e.target.value});
    libraryDispatch({type: 'setSearchBooks', payload: e.target.value});
  };

  return (
    <section className="Search">
      <input
        type="text"
        className="Search-input"
        placeholder="Recherche libre"
        value={searchState.current}
        onChange={searchHolder}/>
    </section>
  );
}
