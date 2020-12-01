
import { CustomRequestExtendsUser } from './types';
import { NextFunction, Request, Response } from 'express';
import { userFromDB } from './types';
import jwt from 'jsonwebtoken';


export const generateToken = (user: userFromDB) => {
    console.log('process.env.JWT_SECRET', process.env.JWT_SECRET)
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET as string, {
        expiresIn: '24h',
    });
}

export interface decodeType {
    _id: string;
}


// 일반 유저 계정으로 접속 햇을 때 API를 사용하기 위해 verify 하는 middleware.
export const isAuth = (req: CustomRequestExtendsUser, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    console.log('req.headers', req.headers.data)
    if (authorization) {
        const token = authorization.slice(5, authorization.length); // Hong XXXXXXX  : Hong하고 띄워쓰기 까지 포함한 5개 글자 이후가 token이라서 이렇게 해줌
        console.log('token:    ', token)
        jwt.verify(token, process.env.JWT_SECRET as string, (err, decode) => {
            if (err) {
                console.log('베리파이 에러 발생함')
                res.status(401).send({ message: 'Invalid Token' });
            } else {
                const { _id } = decode as decodeType;
                req.user = _id;
                console.log('_id, verify 에러 발생 안함', _id);

                next();
            }
        });
    } else {
        res.status(401).send({ message: 'No Token' });
    }

}


// amin계정으로 접속했을 경우에 admin관리를 할 수 있는 페이지에서 동작하는 API를 verify 해주기 위한 middleware
export const isAdmin = (req: CustomRequestExtendsUser, res: Response, next: NextFunction) => {
    console.log("admin인지 확인하러 들어옴")
    console.log('1: ', req.user)
    console.log('2: ', req.body)
    if (req.user && req.body.userInfo.isAdmin) {
        next();
    } else {
        // res.status(401).send({ message: 'Invalid Admin Token' });
        res.send(req.headers);
    }
}