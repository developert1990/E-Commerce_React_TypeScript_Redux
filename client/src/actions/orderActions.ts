import { saveShippingAddressDataType } from './cartActions';
import { cartItemType } from './../reducers/cartReducers';
import { CART_EMPTY } from './../constants/cartConstant';
import { ORDER_CREATE_REQUEST, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS } from './../constants/orderConstant';
import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';


export interface orderItemsType {
    orderItems: cartItemType[];
    shippingAddress: saveShippingAddressDataType;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
}

export const createOrder = (order: orderItemsType) => async (dispatch: ThunkDispatch<any, any, any>, getState: () => any) => {

    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        const { userStore: { userInfo } } = getState(); // getState() 함수는 redux에서 사용된 모든 state정보를 가져온다 그중에서 userSignin을 distructuring 햇고 그 userSignin 에서 userInfo를 distructuring해서 뽑아준것이다.
        const { data } = await axios.post('/api/orders', order, {
            headers: {
                Authorization: `Hong ${userInfo.token}`
            }
        });
        console.log('data:+++++++', data)
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem("cartItems");
    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}