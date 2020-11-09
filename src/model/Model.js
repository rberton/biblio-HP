import React, { createContext, useReducer } from 'react';
import { libraryReducer, searchReducer, shoppingCartReducer } from '../actions/reducer';

const Model = {
  library: {
    books: [],
    searchBooks: [],
    selectBook: null
  },
  search: {
    current: ''
  },
  shoppingCart: {
    current: [],
    offer: null
  }
};

export const LibraryStore = ({children}) => {
  const [libraryState, libraryDispatch] = useReducer(libraryReducer, Model.library);

  return (
    <LibraryContext.Provider value={[libraryState, libraryDispatch]}>
      {children}
    </LibraryContext.Provider>
  );
};

export const SearchStore = ({children}) => {
  const [searchState, searchDispatch] = useReducer(searchReducer, Model.search);

  return (
    <SearchContext.Provider value={[searchState, searchDispatch]}>
      {children}
    </SearchContext.Provider>
  );
};

export const ShoppingCartStore = ({children}) => {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, Model.shoppingCart);

  return (
    <ShoppingCartContext.Provider value={[shoppingCartState, shoppingCartDispatch]}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const LibraryContext = createContext(Model.library);
export const SearchContext = createContext(Model.search);
export const ShoppingCartContext = createContext(Model.shoppingCart);
