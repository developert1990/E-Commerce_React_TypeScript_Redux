import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { detailsOrder, orderPay } from '../actions/orderActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { initialAppStateType } from '../store';

interface paramsType {
    id: string;
}

export interface PayPalPaymentResultType {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
}


export const OrderScreen = () => {
    const orderDetails = useSelector((state: initialAppStateType) => state.orderDetailStore);
    const payedOrder = useSelector((state: initialAppStateType) => state.orderPayStore);
    const { error: payError, order: payResult, loading: payLoading } = payedOrder;

    console.log('orderDetails;;;;;;;;;;', orderDetails);
    const [sdkReady, setSdkReady] = useState<boolean>(false); // paypal 의 sdk 받아오기위한 hook 이다.
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();
    const params: paramsType = useParams();
    const orderId = params.id;
    useEffect(() => {

        console.log('pay dispatch 해서 일로 들어온다')

        const addPayPalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if ((order && order._id !== orderId)) {
            dispatch(detailsOrder(orderId));
        } else {
            if (!order?.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }

    }, [dispatch, order, order?._id, order?.isPaid, orderId])

    // 여기서 paymentResult 는 react-paypal-button-v2 에서 자동으로 제공해주는 파라미터 값으로 payment한 결과에 대한 정보를 인자로 준다.
    const successPaymentHandler = (paymentResult: PayPalPaymentResultType) => {
        dispatch(orderPay(order, paymentResult));
    }

    return (
        loading ? (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
                    <div>
                        <h1>Order {order?._id}</h1>
                        <div className="row top">
                            <div className="col-2">
                                <ul>
                                    <li>
                                        <div className="card card-body">
                                            <h2>Shipping</h2>
                                            <p>
                                                <strong>Name:</strong>{order?.shippingAddress.fullName} <br />
                                                <strong>Address:</strong>{order?.shippingAddress.address}, {order?.shippingAddress.city}, {order?.shippingAddress.postalCode}, {order?.shippingAddress.country}
                                            </p>
                                            {/* 배달 유무 */}
                                            {order?.isDelivered ? <MessageBox variant="success">Delivered at {order?.isDelivered}</MessageBox> :
                                                <MessageBox variant="danger">Not Delivered</MessageBox>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <div className="card card-body">
                                            <h2>Payment</h2>
                                            <p>
                                                <strong>Method:</strong>{order?.paymentMethod} <br />
                                            </p>
                                            {order?.isPaid ? <MessageBox variant="success">Paid at {order?.paidAt}</MessageBox> :
                                                <MessageBox variant="danger">Not Paid</MessageBox>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <div className="card card-body">
                                            <h2>Order Items</h2>
                                            <ul>{order?.orderItems.map((item) => (
                                                <li key={item.product}>
                                                    <div className="row">
                                                        <div>
                                                            <img className="small" src={item.image} alt={item.name} />
                                                        </div>
                                                        <div className="min-30">
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>
                                                        <div>
                                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}</ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-1">
                                <div className="card card-body">
                                    <ul>
                                        <li>
                                            <h2>Order Summary</h2>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Items</div>
                                                <div>${order?.itemsPrice.toFixed(2)}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Shipping</div>
                                                <div>${order?.shippingPrice.toFixed(2)}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Tax</div>
                                                <div>${order?.taxPrice.toFixed(2)}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div><strong>Order Total</strong></div>
                                                <div><strong>${order?.totalPrice.toFixed(2)}</strong></div>
                                            </div>
                                        </li>
                                        {
                                            !order?.isPaid && (
                                                <li>
                                                    {!sdkReady ? <LoadingBox /> : <PayPalButton amount={order?.totalPrice} onSuccess={successPaymentHandler} />}
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
    )
}