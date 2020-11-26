import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { register } from '../actions/userActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { initialAppStateType } from '../store';

export const RegisterScreen = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const redirect = location.search ? location.search.split("=")[1] : '/';
    const userRegister = useSelector((state: initialAppStateType) => state.registerStore);
    const { userInfo, error, loading } = userRegister;

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and confirm password are not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    useEffect(() => {

        console.log('userInfo:___', userInfo)
        if (userInfo) {
            console.log('redirect:___', redirect)
            history.push(redirect);
        }
    }, [userInfo, redirect, history])



    return (
        <div>
            <form onSubmit={submitHandler} className="form">
                <div>
                    <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox />}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter name" required onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter email" required onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" required onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="confirmPassword">ConfirmPassword</label>
                    <input type="password" id="confirmPassword" placeholder="Enter confirm password" required onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Register</button>
                    <div>
                        <label />
                        <div>
                            Already have an account?{''}
                            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
