import { orderDetailsType, orderPayType } from './../reducers/orderReducers';
import { userType } from './../reducers/userReducer';
import { cartItemType } from './../reducers/cartReducers';
import { ProductType } from './../types.d';
import { orderItemsType } from '../actions/orderActions';

export interface ProductActionType {
    type: string;
    payload: ProductType[];
}

export interface CartActionType {
    type: string;
    payload: cartItemType | string;
}

export interface userActionType {
    type: string;
    payload: userType | string;
}

export interface userProfileUpdateActionType {
    type: string;
    payload: any;
}

export interface orderActionType {
    type: string;
    payload: orderItemsType
}

export interface orderDetailActionType {
    type: string;
    payload: orderDetailsType;
}

export interface orderPayActionType {
    type: string;
    payload: orderPayType
}

export interface orderMyListActionType {
    type: string;
    payload: any;
}