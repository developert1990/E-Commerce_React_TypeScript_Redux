import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { initialAppStateType } from '../store';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import { ProductType } from '../types';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

interface adminProductListType {
    _id: string;
    name: string;
    category: string;
    image: string;
    price: number;
    brand: string;
    rating: number;
    numReviews: number;
    description: string;
}

export const ProductListScreen = () => {
    const productList = useSelector((state: initialAppStateType) => state.productListStore);
    const { loading, error, products } = productList;

    const productCreateStoreInfo = useSelector((state: initialAppStateType) => state.productCreateStore);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreateStoreInfo;

    const dispatch = useDispatch();
    const history = useHistory();


    const productDeleteStoreInfo = useSelector((state: initialAppStateType) => state.productDeleteStore);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDeleteStoreInfo;


    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            history.push(`/product/${createdProduct._id}/edit`);
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET })
        }
        dispatch(listProducts())
    }, [createdProduct, dispatch, history, successCreate, successDelete]);



    const deleteHandler = (product: ProductType) => {
        dispatch(deleteProduct(product));
    }

    const createHandler = () => {
        dispatch(createProduct());
    }

    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button type="button" className="primary" onClick={createHandler}>Create Product</button>
            </div>
            {loadingDelete && <LoadingBox />}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loadingCreate && <LoadingBox />}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            {
                loading ? <LoadingBox /> :
                    error ? <MessageBox variant="danger">{error}</MessageBox> :
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>NAME</td>
                                    <td>PRICE</td>
                                    <td>CATEGORY</td>
                                    <td>BRAND</td>
                                    <td>ACTIONS</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>
                                            <td>
                                                <button type="button" className="samll" onClick={() => history.push(`/product/${product._id}/edit`)}>Edit</button>
                                                <button type="button" className="samll" onClick={() => deleteHandler(product)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
            }
        </div>
    )
}
