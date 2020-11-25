import { data } from './../data';
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel';
import expressAsyncHandler from 'express-async-handler'; // express에서 비동기식으로 에러 헨들링을 하기 위한 라이브러리 이다.
import { userFromDB } from '../types';
import { generateToken } from '../utils';

const userRouter = express.Router();


userRouter.get('/seed', expressAsyncHandler(async (req: Request, res: Response) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });

}));

userRouter.post('/signin', expressAsyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.body.email });
    const typedUser = user as userFromDB;
    if (user) {
        if (bcrypt.compareSync(req.body.password, typedUser.password)) {
            res.send({
                _id: typedUser._id,
                name: typedUser.name,
                email: typedUser.email,
                isAdmin: typedUser.isAdmin,
                token: generateToken(typedUser),
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password' });
}))

export default userRouter;