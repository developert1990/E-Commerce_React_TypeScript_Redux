import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { ProductScreen } from './screens/ProductScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CartScreen } from './screens/CartScreen';
import { useSelector } from 'react-redux';
import { initialAppStateType } from './store';
import { SigninScreen } from './screens/SigninScreen';

function App() {

  const cart = useSelector((state: initialAppStateType) => state.cartStore);
  const { cartItems } = cart;

  return (
    <BrowserRouter>
      <div className="App">
        <div className="grid-container">
          <header className="row">
            <div>
              <Link className="brand" to="/">amazona</Link>
            </div>
            <div>
              <Link to="/cart">Cart</Link>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
              <Link to="/signin">Sign In</Link>
            </div>
          </header>
          <main>
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route exact path="/" component={HomeScreen} />
            <Route path="/signin" component={SigninScreen} />
            <div>

            </div>
          </main>
          <footer className="row center">All right reserved</footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
