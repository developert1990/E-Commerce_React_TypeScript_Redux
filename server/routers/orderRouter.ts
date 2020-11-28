import { OrderType } from './../types.d';
import { isAuth } from './../utils';
import expressAsyncHandler from 'express-async-handler';
import express, { Request, Response, NextFunction } from 'express';
import Order from '../models/orderModel';
import { CustomRequestExtendsUser } from '../types';

const orderRouter = express.Router();


orderRouter.post('/', isAuth, expressAsyncHandler(async (req: CustomRequestExtendsUser, res: Response, next: NextFunction) => {
    console.log("isAuth성공하고 post에 들어옴");
    console.log(req.body);
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user, // _id 값이 들어간다
        });
        const createdOrder = await order.save();
        console.log('createdOrder: ____', createdOrder)
        res.status(201).send({ message: 'New Order Created', order: createdOrder });
    }
}));

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);
    // console.log('order', order)
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: "Order Not Found" });
    }
}));


orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);
    const typedOrder = order as OrderType;
    console.log('페이버튼 누르고 진행하는 router로 들어옴')
    if (order) {
        typedOrder.isPaid = true;
        typedOrder.paidAt = Date.now();
        typedOrder.paymentResult = { id: req.body.id, status: req.body.status, update_time: req.body.update_time, email_address: req.body.email_address }
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', data: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
}))

export default orderRouter;