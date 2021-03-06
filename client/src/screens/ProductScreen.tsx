import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { Rating } from '../components/Rating';
import { initialAppStateType } from '../store';
import { ProductType } from '../types';

interface ProductScreenParamType {
    id: string;
}

export const ProductScreen = () => {
    const dispatch = useDispatch();
    const param: ProductScreenParamType = useParams();
    const history = useHistory();
    const [qty, setQty] = useState<number>(1);
    const productId = param.id;
    const productDetails = useSelector((state: initialAppStateType) => state.productDetailsStore);
    const { loading, error, product } = productDetails;

    // const { description, image, name, numReviews, price, rating, countInStock } = product as ProductType;
    // console.log('loading', loading)
    if (error) {
        console.log('loading', loading)
    }
    // console.log('product', product)

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        history.push(`/cart/${productId}?qty=${qty}`);
    }

    return (
        <div>
            {loading ? (
                <LoadingBox />) :
                error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                        <div>
                            <Link to="/">Back to result</Link>

                            {
                                product &&
                                <div className="row top">
                                    <div className="col-2">
                                        <img className="large" src={product.image} alt={product.name}></img>
                                    </div>
                                    <div className="col-1">
                                        <ul>
                                            <li>
                                                <h1>{product.name}</h1>
                                            </li>
                                            <li>
                                                <Rating rating={product.rating} numReviews={product.numReviews} />
                                            </li>
                                            <li>Price: ${product.price}</li>
                                            <li>Description: <p>{product.description}</p></li>
                                        </ul>
                                    </div>
                                    <div className="col-1">
                                        <div className="card card-body">
                                            <ul>
                                                <li>
                                                    <div className="row">
                                                        <div>Price</div>
                                                        <div className="price">${product.price}</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="row">
                                                        <div>Status: </div>
                                                        <div>
                                                            {
                                                                // TODO: 여기 나중에 countInStock 으로 바꿔줘야함
                                                                product.countInStock && product.countInStock > 0
                                                                    ? <span className="success">In Stock</span>
                                                                    : <span className="danger">Unavailable</span>
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* 만약 stock 이 0 이상일 경우에만 띄워주게 만들었음 */}
                                                {product.countInStock && product.countInStock > 0 && (
                                                    <>
                                                        <li>
                                                            <div className="row">
                                                                <div>Qty</div>
                                                                <div>

                                                                    <select value={qty} onChange={(e: ChangeEvent<HTMLSelectElement>) => setQty(parseInt(e.target.value))}>
                                                                        {
                                                                            //이부분 한번 공부제대로 해볼것
                                                                            //[...Array(4).keys()] 이렇게 하면 [0,1,2,3] 이라는 새로운 배열이 생성된다.
                                                                            [...Array(product.countInStock).keys()].map(x => (
                                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                                        </li>
                                                    </>

                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            }


                        </div>
                    )
            }
        </div>

    )
}
