
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from '../constants/userConstant';

export const signin = (email: string, password: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post('/api/users/signin', { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const signout = () => (dispatch: ThunkDispatch<any, any, any>) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({ type: USER_SIGNOUT });
}