import { data } from './../data';
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel';
import expressAsyncHandler from 'express-async-handler'; // express에서 비동기식으로 에러 헨들링을 하기 위한 라이브러리 이다.
import { userFromDB } from '../types';
import { generateToken, isAuth } from '../utils';

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
}));

userRouter.post('/register', expressAsyncHandler(async (req: Request, res: Response) => {
    // 새로운 유저의 정보를 만들고 
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    // 그 유저의 정보를 db에 저장한다.
    const createdUser = await user.save();
    const typedUser = createdUser as userFromDB;
    res.send({
        _id: typedUser._id,
        name: typedUser.name,
        email: typedUser.email,
        isAdmin: typedUser.isAdmin,
        token: generateToken(typedUser),
    });
}));



// user profile Update
userRouter.put('/:id', isAuth, expressAsyncHandler(async (req: Request, res: Response) => {
    console.log('req.body', req.body)
    console.log('req.params.id', req.params.id)
    const user = await User.findById(req.params.id);
    const typedUser = user as userFromDB;
    if (user) {

        typedUser.name = req.body.name || typedUser.name;
        typedUser.email = req.body.email || typedUser.email;
        if (req.body.password) {
            typedUser.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        const typedUpdatedUser = updatedUser as userFromDB;
        res.send({
            _id: typedUser._id,
            name: typedUser.name,
            email: typedUser.email,
            isAdmin: typedUser.isAdmin,
            token: generateToken(typedUpdatedUser),

        })
        console.log('업데이트 성공함')
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
}));


export default userRouter;