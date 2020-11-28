import { orderCreateReducer, orderInitialState, orderIinitialStateType, orderDetailsReducer, orderDetailInitailStateType, orderDetailInitialState, orderPayInitialStateType, orderPayInitailState, orderPayReducer, orderMyListInitialStateType, orderMyListInitailState, orderMyListReducer } from './reducers/orderReducers';
import { userSigninReducer, userSigninInitialState, userSigninInitialStateType, userRegisterReducer, userRegisterInitailState, userRegisterInitialType } from './reducers/userReducer';
import { cartReducer, cartInitailState, cartInitailStateType } from './reducers/cartReducers';
import { ProductListInitialStateType, productListReducer, productListInitialState, productDetailsReducer, productDetailsInitialState, ProductDetailsInitialStateType } from './reducers/productReducers';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';



console.log('처음시작할때 스토어에서 초기값을 다 받아오게 된다');

const initialState = {};

export interface initialAppStateType {
    productListStore: ProductListInitialStateType,
    productDetailsStore: ProductDetailsInitialStateType,
    cartStore: cartInitailStateType,
    userStore: userSigninInitialStateType,
    registerStore: userRegisterInitialType,
    orderStore: orderIinitialStateType,
    orderDetailStore: orderDetailInitailStateType,
    orderPayStore: orderPayInitialStateType,
    orderMyListStore: orderMyListInitialStateType,
}


export const initialAppState: initialAppStateType = {
    productListStore: productListInitialState,
    productDetailsStore: productDetailsInitialState,
    cartStore: cartInitailState,
    userStore: userSigninInitialState,
    registerStore: userRegisterInitailState,
    orderStore: orderInitialState,
    orderDetailStore: orderDetailInitialState,
    orderPayStore: orderPayInitailState,
    orderMyListStore: orderMyListInitailState,
}

const reducer = combineReducers({
    productListStore: productListReducer,
    productDetailsStore: productDetailsReducer,
    cartStore: cartReducer,
    userStore: userSigninReducer,
    registerStore: userRegisterReducer,
    orderStore: orderCreateReducer,
    orderDetailStore: orderDetailsReducer,
    orderPayStore: orderPayReducer,
    orderMyListStore: orderMyListReducer,

})


const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;