import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Spinner from '../Shared/Spinner/Spinner';
import Product from './Product';
import ProductModal from './ProductModal/ProductModal';

const Products = () => {
    const [singleProduct, setSingleProduct] = useState('');
    const products = useLoaderData();
    const {user, loading} = useContext(AuthContext)

    if(loading){
        return <Spinner></Spinner>
    }
    

    return (
        <div className='py-20 container m-auto px-3'>
            <h2 className="md:text-4xl font-bold mb-10">We have found 25 vehicles under this category</h2>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        setSingleProduct={setSingleProduct}
                    ></Product>)
                }
            </div>
            <ProductModal
                singleProduct={singleProduct}
                user={user}
            ></ProductModal>
        </div>
    );
};

export default Products;