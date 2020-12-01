import Axios from 'axios';
import React, { ChangeEvent, FormEvent, TextareaHTMLAttributes, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { detailsProduct, updateProduct } from '../actions/productActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { initialAppStateType } from '../store';

interface ProductEditParamType {
    id: string;
}

export const ProductEditScreen = () => {
    const params: ProductEditParamType = useParams();
    const productId = params.id;
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [countInStock, setCountInStock] = useState<number>(0);
    const [brand, setbrand] = useState<string>('');
    const [description, setDescription] = useState<string>('')

    const dispatch = useDispatch();
    const history = useHistory();

    const productDetails = useSelector((state: initialAppStateType) => state.productDetailsStore);
    const { loading, error, product } = productDetails;

    const productUpdateInfo = useSelector((state: initialAppStateType) => state.productUpdateStore);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdateInfo;

    console.log('productDetails', productDetails)
    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            history.push('/productlist');
        }

        if (!product || (product._id !== productId) || successUpdate) {
            console.log("새로 dispatch해서 detail가져옴")
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detailsProduct(productId));
        } else {
            console.log("else 부분실행")
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock as number);
            setbrand(product.brand);
            setDescription(product.description);
        }
    }, [dispatch, history, product, productId, successUpdate])

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('바껴서 들어가는 값들', name, price, image, category, countInStock, brand, description);
        dispatch(updateProduct({ _id: productId, name, price, image, category, brand, countInStock, description, numReviews: 0, rating: 0 }))
    }

    const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
    const [errorUpload, setErrorUpload] = useState<string>('');

    const userInfoFromStore = useSelector((state: initialAppStateType) => state.userStore);
    const { userInfo } = userInfoFromStore;

    const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const bodyFormData = new FormData();
            console.log('bodyFormData', bodyFormData)
            bodyFormData.append('image', file);
            setLoadingUpload(true);

            try {
                const { data } = await Axios.post(`/api/uploads`, bodyFormData, {
                    headers: { Authorization: `Hong ${userInfo.token}` }
                });
                // image 경로랑 전체 product image 를 서버에서 받아오는 걸로 바꿔야한다.
                setImage(data);
                setLoadingUpload(false);
            } catch (error) {
                setErrorUpload(error.message);
                setLoadingUpload(false);
            }

        }
    }

    const textareaRow = 3;
    return (
        <div>
            <form onSubmit={submitHandler} className="form">
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
                {loadingUpdate && <LoadingBox />}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {
                    loading ? <LoadingBox /> :
                        error ? <MessageBox variant="danger">{error}</MessageBox> :
                            (
                                <>
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" placeholder="Enter name" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                                    </div>

                                    <div>
                                        <label htmlFor="price">Price</label>
                                        <input type="text" id="name" placeholder="Enter price" value={price} onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(parseInt(e.target.value))} />
                                    </div>

                                    <div>
                                        <label htmlFor="image">Image</label>
                                        <input type="text" id="image" placeholder="Enter image" value={image} onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.value)} />
                                    </div>

                                    <div>
                                        <label htmlFor="imageFile">Image File</label>
                                        <input type="file" id="imageFile" placeholder="Choose Image" onChange={uploadFileHandler} />
                                        {loadingUpload && <LoadingBox />}
                                        {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                                    </div>

                                    <div>
                                        <label htmlFor="name">Category</label>
                                        <input type="text" id="category" placeholder="Enter category" value={category} onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)} />
                                    </div>

                                    <div>
                                        <label htmlFor="brand">Brand</label>
                                        <input type="text" id="brand" placeholder="Enter name" value={brand} onChange={(e: ChangeEvent<HTMLInputElement>) => setbrand(e.target.value)} />
                                    </div>

                                    <div>
                                        <label htmlFor="countInStock">Count In Stock</label>
                                        <input type="text" id="countInStock" placeholder="Enter countInStock" value={countInStock} onChange={(e: ChangeEvent<HTMLInputElement>) => setCountInStock(parseInt(e.target.value))} />
                                    </div>

                                    <div>
                                        <label htmlFor="description">Description</label>
                                        <textarea rows={textareaRow} id="description" placeholder="Enter description" value={description} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
                                    </div>

                                    <div>
                                        <label></label>
                                        <button className="primary" type="submit">
                                            Update
                                        </button>
                                    </div>
                                </>
                            )
                }
            </form>
        </div>
    )
}
