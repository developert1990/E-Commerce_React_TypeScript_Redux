import { Document } from 'mongoose';
import { Request } from 'express';

export interface userFromDB extends Document {
    _id: string;
    password: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token: () => string;
}

export interface CustomRequestExtendsUser extends Request {
    user?: String;
}
