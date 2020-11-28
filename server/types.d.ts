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


export interface OrderType extends Document {
    orderItems: cartItemType[];
    shippingAddress: saveShippingAddressDataType;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    isDelivered: boolean;
    createdAt: string;
    _id?: string;

    isPaid: boolean;
    paidAt?: number;
    paymentResult: PaymentResultType;
}

export interface PaymentResultType {
    id: string;
    status: boolean;
    update_time: string;
    email_address: string;
}


export interface cartItemType {
    name: string;
    image: string;
    price: number;
    countInStock: number;
    product: string;
    qty: number;
}


export interface saveShippingAddressDataType {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}