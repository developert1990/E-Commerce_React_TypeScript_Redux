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
}


export const initialAppState: initialAppStateType = {
    productListStore: productListInitialState,
    productDetailsStore: productDetailsInitialState,
    cartStore: cartInitailState,
}

const reducer = combineReducers({
    productListStore: productListReducer,
    productDetailsStore: productDetailsReducer,
    cartStore: cartReducer,
})


const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;