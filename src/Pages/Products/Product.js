import React, { useState } from 'react';
import './Product.css';
import { FaCheckCircle } from 'react-icons/fa';

const Product = ({ product }) => {
    const { img, location, name, originalPrice, postTime, resalePrice, sellerEmail, sellerImg, sellerName, yearsUsed, verified } = product;
    
    return (
        <div className='product'>
            <div className="mb-5 flex items-center">
                <div className="avatar mr-3">
                    <div className="w-12 rounded-full">
                        <img src="https://placeimg.com/192/192/people" alt=''/>
                    </div>
                </div>
                <div>
                    <p></p>
                    <h5 className="font-bold">{sellerName} {verified && <FaCheckCircle className='inline-block text-primary'></FaCheckCircle>} </h5>
                    <p className='text-sm'>{sellerEmail}</p>
                </div>
            </div>
            <div className="product_img">
                <img src={img} alt="" />
            </div>
            <div className="product_info px-3 py-5">
                <h2 className="text-3xl font-bold name">{name}</h2>
                <div className="flex justify-between">
                    <p>{postTime}</p>
                    <p>{location}</p>
                </div>
                <p>{yearsUsed}</p>
                <p>{originalPrice}</p>
                <p>{resalePrice}</p>
                <p>{Response}</p>
                <div>
                    <button className='btn btn-primary w-full'>Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default Product;