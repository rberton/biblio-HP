import './Library.css';
import { Search } from '../Search/Search';
import { LibraryContext, SearchContext, ShoppingCartContext } from '../../model/Model';
import React, { useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import 'isomorphic-fetch';
import uniqid from 'uniqid';

function Detail({book}) {

  const [, libraryDispatch] = useContext(LibraryContext);
  const [shoppingCartState, shoppingCartDispatch] = useContext(ShoppingCartContext);

  const backHolder = e => {
    libraryDispatch({type: 'back'});
  };

  const addToCartHolder = isbn => e => {
    shoppingCartDispatch({type: 'addToCart', payload: isbn});
  };

  const removeFromCartHolder = isbn => e => {
    shoppingCartDispatch({type: 'removeFromCart', payload: isbn});
  };

  return (
    <>
      <figure>
        <img
          src={book.cover}
          width="340"
          height="500"
          alt={book.title}/>
      </figure>
      <section className="Library-detail-infos">
        <p><strong>ISBN&nbsp;:</strong> {book.isbn}</p>
        <p><strong>Prix&nbsp;:</strong> {book.price} €</p>
        <p><strong>Titre&nbsp;:</strong> {book.title}</p>
        <div className="Library-detail-complex">
          <strong>Synopsis&nbsp;:</strong>
          <section className="Library-detail-synopsis">
            {book.synopsis.map(paragraph => <p key={uniqid()}>{paragraph}</p>)}
          </section>
        </div>
        <div className="Library-detail-actions">
          <button onClick={backHolder}>Retour</button>
          {!shoppingCartState.current.find(isbn => isbn === book.isbn) &&
          <button onClick={addToCartHolder(book.isbn)}>
            Ajouter au panier d'achat
          </button>
          }
          {shoppingCartState.current.find(isbn => isbn === book.isbn) &&
          <button onClick={removeFromCartHolder(book.isbn)}>
            Ôter du panier d'achat
          </button>
          }
        </div>
      </section>
    </>
  );
}

export function Library() {

  const [libraryState, libraryDispatch] = useContext(LibraryContext);
  const [searchState, searchDispatch] = useContext(SearchContext);
  const [shoppingCartState] = useContext(ShoppingCartContext);

  const fetchBooks = useCallback(() => {
    fetch('http://henri-potier.xebia.fr/books', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {

      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }

      return response.json();
    })
    .then(datas => {
      libraryDispatch({type: 'setBooks', payload: datas});
      searchDispatch({type: 'searchChange', payload: ''});
    });
  }, [libraryDispatch, searchDispatch]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const selectHolder = isbn => e => {
    libraryDispatch({type: 'selectBook', payload: isbn});
  };

  return (
    <article className="Library">
      {shoppingCartState.current.length > 0 &&
      <Link to="/cart">Panier d'achat ({shoppingCartState.current.length})</Link>
      }
      {libraryState.selectBook === null &&
      <Search/>
      }
      {libraryState.books && libraryState.books.length > 0 &&
      searchState.current === '' &&
      libraryState.selectBook === null && (
        <ul className="Library-list">
          {libraryState.books.map(book => (
            <li
              key={book.isbn}
              className="Library-item"
              onClick={selectHolder(book.isbn)}>
                <figure>
                  <img src={book.cover} width="340" height="500" alt={book.title}/>
                  <figcaption>{book.isbn}</figcaption>
                </figure>
            </li>
          ))}
        </ul>
      )}
      {libraryState.searchBooks.length === 0 && searchState.current !== '' && (
        <p>Aucun livre ne correspond à votre recherche.</p>
      )}
      {libraryState.searchBooks.length > 0 && searchState.current !== '' &&
      libraryState.selectBook === null && (
        <ul className="Library-searchList">
        {libraryState.searchBooks.map(book => (
          <li
            key={book.isbn}
            className="Library-searchItem">
            <Detail book={book}/>
          </li>
        ))}
        </ul>
      )}
      {libraryState.selectBook &&
      <div className="Library-selectItem">
        <Detail book={libraryState.selectBook}/>
      </div>
      }
    </article>
  );
}
