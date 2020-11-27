import { orderItemsType } from './../actions/orderActions';
import { cartItemType } from './cartReducers';
import { saveShippingAddressDataType } from './../actions/cartActions';
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_RESET } from './../constants/orderConstant';
import { orderActionType } from './../actions/types.d';


export interface orderIinitialStateType {
    loading: boolean;
    error: string;
    success: boolean;
    order: orderItemsType;
}

export const orderInitialState: orderIinitialStateType = {
    loading: false,
    error: '',
    success: false,
    order: {
        orderItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems") as string)
            : [],
        shippingAddress: localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress") as string) : {},
        paymentMethod: 'PayPal',
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
    }

}

export const orderCreateReducer = (state = orderInitialState, action: orderActionType) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
}