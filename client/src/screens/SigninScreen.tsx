import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'

export const SigninScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }



    return (
        <div>
            <form onSubmit={submitHandler} className="form">
                <div>
                    <h1>Sign In</h1>
                </div>
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
                            <Link to="/register">Create your account</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
