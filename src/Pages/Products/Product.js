import React, { useState } from 'react';
import './Product.css';
import { FaCheckCircle, FaMapMarkedAlt, FaStopwatch } from 'react-icons/fa';

const Product = ({ product }) => {
    const { img, location, name, originalPrice, postTime, resalePrice, sellerEmail, sellerImg, sellerName, yearsUsed, verified } = product;

    return (
        <div className='product'>
            <div className="mb-5 flex items-center">
                <div className="avatar mr-3">
                    <div className="w-12 rounded-full">
                        <img src={sellerImg} alt=''/>
                    </div>
                </div>
                <div>
                    <p></p>
                    <h5 className="font-bold">{sellerName} {verified === "true" && <FaCheckCircle className='inline-block text-primary'></FaCheckCircle>} </h5>
                    <p className='text-sm'>{sellerEmail}</p>
                </div>
            </div>
            <div className="product_img">
                <img src={img} alt="" />
            </div>
            <div className="product_info px-3 py-5">
                <h2 className="text-3xl font-bold name">{name}</h2>
                <div className="flex justify-between py-4">
                    <p> <FaStopwatch className='inline-block mr-1'></FaStopwatch> {postTime}</p>
                    <p> <FaMapMarkedAlt className='inline-block mr-1'></FaMapMarkedAlt> {location}</p>
                </div>
                <p className='mb-2'>Used: <span className="font-bold">{yearsUsed} {yearsUsed > 1 ? "years" : "year"}</span></p>
                <p className='mb-2'>Original Price: <span className="font-bold"> ${originalPrice}</span></p>
                <p className='text-xl '>Resale Price: <span className="font-bold text-2xl text-orange-500"> ${resalePrice}</span></p>
                <p>{Response}</p>
                <div>
                    <button className='btn btn-primary w-full mt-9'>Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default Product;