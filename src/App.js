import './App.css';
import React from 'react';
import { LibraryStore, SearchStore, ShoppingCartStore } from './model/Model';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Library } from './components/Library/Library';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>La bibliothèque d'Henri Potier</h1>
      </header>
      <main>
        <LibraryStore>
          <SearchStore>
            <ShoppingCartStore>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={Library}/>
                  <Route path="/cart" component={ShoppingCart}/>
                </Switch>
              </BrowserRouter>
            </ShoppingCartStore>
          </SearchStore>
        </LibraryStore>
      </main>
    </div>
  );
}

export default App;
