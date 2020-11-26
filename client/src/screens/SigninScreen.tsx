import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { signin } from '../actions/userActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { initialAppStateType } from '../store';

export const SigninScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const redirect = location.search ? location.search.split('=')[1] : '/';
    const userSignin = useSelector((state: initialAppStateType) => state.userStore);
    const { userInfo, error, loading } = userSignin;

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signin(email, password))
    }

    useEffect(() => {
        console.log('redirect:+++++', redirect)
        if (userInfo) {
            history.push(redirect);
        }
    }, [userInfo, redirect, history])



    return (
        <div>
            <form onSubmit={submitHandler} className="form">
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox />}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter email" required onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="email" placeholder="Enter password" required onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Sign In</button>
                    <div>
                        <label />
                        <div>
                            New customer?{''}
                            <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
