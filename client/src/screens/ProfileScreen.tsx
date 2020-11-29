import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { updateUser } from '../actions/userActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';

export const ProfileScreen = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const userStoreInfo = useSelector((state: initialAppStateType) => state.userStore);
    const { userInfo } = userStoreInfo;
    // console.log('userInfo', userInfo)


    const userUpdatedInfo = useSelector((state: initialAppStateType) => state.userProfileUpdateStore);
    const { error, loading, user } = userUpdatedInfo;
    // console.log('user', user)
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(updateUser(userInfo._id));
        setName(userInfo.name);
        setEmail(userInfo.email);
        console.log("일단한번 들어옴")
    }, [dispatch, userInfo._id])

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // dispatch update profile
        console.log('dispatch로 업데이트 할거', { name, email, password, confirmPassword });
        if (password !== confirmPassword) {
            alert('Password and Confirm Password are not Matched !')
        } else {
            dispatch(updateUser(userInfo._id, { name, email, password, confirmPassword }));
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox /> :
                        error ? <MessageBox variant="danger">{error}</MessageBox> :
                            (
                                <>
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" placeholder="Enter name" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" placeholder="Enter email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" placeholder="Enter password" onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input type="password" id="confirmPassword" placeholder="Enter confirm password" onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <div>
                                        <label />
                                        <button className="primary" type="submit">Update</button>
                                    </div>
                                </>
                            )
                }
            </form>
        </div>
    )
}
