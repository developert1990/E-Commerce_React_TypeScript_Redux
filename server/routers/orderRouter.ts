import { isAuth } from './../utils';
import expressAsyncHandler from 'express-async-handler';
import express, { Response, NextFunction } from 'express';
import Order from '../models/orderModel';
import { CustomRequestExtendsUser } from '../types';

const orderRouter = express.Router();


orderRouter.post('/', isAuth, expressAsyncHandler(async (req: CustomRequestExtendsUser, res: Response, next: NextFunction) => {
    console.log("isAuth성공하고 post에 들어옴");
    console.log(req.body);
    // if (req.body.orderItems.length === 0) {
    //     res.status(400).send({ message: 'Cart is empty' });
    // } else {
    //     const order = new Order({
    //         orderItems: req.body.orderItems,
    //         shippingAddress: req.body.shippingAddress,
    //         paymentMethod: req.body.paymentMethod,
    //         itemsPrice: req.body.itemsPrice,
    //         shippingPrice: req.body.shippingPrice,
    //         taxPrice: req.body.taxPrice,
    //         totalPrice: req.body.totalPrice,
    //         user: req.user, // _id 값이 들어간다
    //     });
    //     const createdOrder = await order.save();
    //     res.status(201).send({ message: 'New Order Created', order: createdOrder });
    // }
}));

export default orderRouter;