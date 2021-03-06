import { ProductActionType } from './../actions/types.d';
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_RESET } from './../constants/productConstants';

import { ProductType } from './../types.d';
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/productConstants';



export interface ProductListInitialStateType {
    products: ProductType[],
    error: string;
    loading: boolean;
}

export const productListInitialState: ProductListInitialStateType = {
    products: [],
    error: '',
    loading: false,
}

export interface ProductDetailsInitialStateType {
    product: ProductType,
    error: string;
    loading: boolean;
}

export const productDetailsInitialState: ProductDetailsInitialStateType = {
    product: {
        _id: '',
        name: '',
        category: '',
        image: '',
        price: 0,
        brand: '',
        rating: 0,
        numReviews: 0,
        description: '',
        countInStock: 0,
    },
    error: '',
    loading: false,
}




export const productListReducer = (state = productListInitialState, action: ProductActionType) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productDetailsReducer = (state = productDetailsInitialState, action: ProductActionType) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export interface productCreateInitialStateType {
    product: ProductType,
    error: string;
    loading: boolean;
    success: boolean;
}

export const productCreateInitialState: productCreateInitialStateType = {
    product: {
        _id: '',
        name: '',
        category: '',
        image: '',
        price: 0,
        brand: '',
        rating: 0,
        numReviews: 0,
        description: '',
        countInStock: 0,
    },
    error: '',
    loading: false,
    success: false,
}




export const productCreateReducer = (state = productCreateInitialState, action: ProductActionType) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state;
    }
}







export interface productUpdateInitialStateType {
    error: string;
    loading: boolean;
    success: boolean;
}

export const productUpdateInitialState: productUpdateInitialStateType = {
    error: '',
    loading: false,
    success: false,
}





export const productUpdateReducer = (state = productUpdateInitialState, action: ProductActionType) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return {};
        default:
            return state;
    }
}




export interface productDeleteInitialStateType {
    error: string;
    loading: boolean;
    success: boolean;
}

export const productDeleteInitialState: productDeleteInitialStateType = {
    error: '',
    loading: false,
    success: false,
}



export const productDeleteReducer = (state = productDeleteInitialState, action: ProductActionType) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_DELETE_RESET:
            return {};
        default:
            return state;
    }
}