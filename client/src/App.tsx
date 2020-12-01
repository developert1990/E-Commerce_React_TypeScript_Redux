import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { ProductScreen } from './screens/ProductScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CartScreen } from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import { initialAppStateType } from './store';
import { SigninScreen } from './screens/SigninScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { signout } from './actions/userActions';
import { ShippingAddressScreen } from './screens/ShippingAddressScreen';
import { PaymentMethodScreen } from './screens/PaymentMethodScreen';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import { OrderScreen } from './screens/OrderScreen';
import { OrderHistoryScreen } from './screens/OrderHistoryScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { PrivateRoute } from './components/PrivateRoute';
import { AdminRoute } from './components/AdminRoute';
import { ProductListScreen } from './screens/ProductListScreen';
import { ProductEditScreen } from './screens/ProductEditScreen';


function App() {

  const cart = useSelector((state: initialAppStateType) => state.cartStore);
  const { cartItems } = cart;
  const userSignin = useSelector((state: initialAppStateType) => state.userStore);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(signout());
  }



  return (
    <BrowserRouter>
      <div className="App">
        <div className="grid-container">
          <header className="row">
            <div>
              <Link className="brand" to="/">amazona</Link>
            </div>
            <div>
              <Link to="/cart">Cart
              {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>

              {
                userInfo ? (
                  <div className="dropdown">
                    <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/profile">User Profile</Link>
                      </li>
                      <li>
                        <Link to="/orderhistory">Order history</Link>
                      </li>
                      <li>
                        <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                      </li>
                    </ul>
                  </div>
                ) :
                  (
                    <Link to="/signin">Sign In</Link>
                  )
              }

              {/* Admin 계정만 사용할수 있음 */}
              {
                userInfo && userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link to="#admin">Admin {''} <i className="fa fa-caret-down"></i></Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/productList">Products</Link>
                      </li>
                      <li>
                        <Link to="/orderList">Orders</Link>
                      </li>
                      <li>
                        <Link to="/userList">Users</Link>
                      </li>
                    </ul>
                  </div>
                )
              }

            </div>
          </header>
          <main>
            <Route path="/cart/:id?" component={CartScreen} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route exact path="/product/:id/edit" component={ProductEditScreen} />
            <Route exact path="/" component={HomeScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/shipping" component={ShippingAddressScreen} />
            <Route path="/payment" component={PaymentMethodScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/orderhistory" component={OrderHistoryScreen} />
            <PrivateRoute path="/profile" component={ProfileScreen} />
            <AdminRoute path="/productList" component={ProductListScreen} />
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
