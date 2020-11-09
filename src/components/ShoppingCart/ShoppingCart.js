import './ShoppingCart.css';
import React, { useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LibraryContext, ShoppingCartContext } from '../../model/Model';

export function ShoppingCart() {

  const [libraryState] = useContext(LibraryContext);
  const [shoppingCartState, shoppingCartDispatch] = useContext(ShoppingCartContext);

  const removeFromCartHolder = isbn => e => {
    shoppingCartDispatch({type: 'removeFromCart', payload: isbn});
  };

  const fetchOffers = useCallback(() => {
    if (shoppingCartState.current.length > 0) {
      fetch(`http://henri-potier.xebia.fr/books/${shoppingCartState.current.join(',')}/commercialOffers`, {
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
      .then(datas => shoppingCartDispatch({type: 'setOffer', payload: datas}));
    }
  }, [shoppingCartState, shoppingCartDispatch]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  return (
    <article className="ShoppingCart">
      <h2 className="ShoppingCart-title">Panier d'achat</h2>
      {shoppingCartState.current.length === 0 &&
      <p>Le panier est vide.</p>
      }
      {shoppingCartState.current.length > 0 &&
      <section>
        <ul className="ShoppingCart-content">
          {libraryState.books
            .filter(book => shoppingCartState.current.includes(book.isbn))
            .map(book => (
            <li key={book.isbn}>
              <figure>
                <img src={book.cover}
                  width="340"
                  height="500"
                  alt={book.title}/>
              </figure>
              <button onClick={removeFromCartHolder(book.isbn)}>Supprimer</button>
            </li>
          ))}
        </ul>
        <p className="ShoppingCart-price">
          <strong>Prix :</strong>
          <del>{libraryState.books
            .filter(book => shoppingCartState.current.includes(book.isbn)).length > 0 &&
          libraryState.books
            .filter(book => shoppingCartState.current.includes(book.isbn))
            .map(book => book.price).reduce((a, b) => a + b)} €</del>
          <ins>{libraryState.books
            .filter(book => shoppingCartState.current.includes(book.isbn)).length > 0 &&
          (libraryState.books
            .filter(book => shoppingCartState.current.includes(book.isbn))
            .map(book => book.price).reduce((a, b) => a + b) - shoppingCartState.offer)} €</ins>
        </p>
      </section>
      }
      <Link to="/">Retour</Link>
    </article>
  );
}