import { cartItemType } from './../reducers/cartReducers';
import { ProductType } from './../types.d';

export interface ProductActionType {
    type: string;
    payload: ProductType[];
}

export interface CartActionType {
    type: string;
    payload: cartItemType | string;
}