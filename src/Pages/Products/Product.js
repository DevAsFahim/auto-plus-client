import React, { useContext } from 'react';
import './Product.css';
import { FaCheckCircle, FaMapMarkedAlt, FaStopwatch } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Shared/Spinner/Spinner';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Product = ({ product, setSingleProduct }) => {
    const { user } = useContext(AuthContext);
    const { img, location, name, originalPrice, categoryId, postTime, resalePrice, sellerEmail, sellerImg, sellerName, yearsUsed, verified } = product;

    const { data: sellers = [], isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('https://auto-plus-server.vercel.app/sellers');
            const data = await res.json();
            return data;
        }
    })



    const handleAddToWish = () => {
        const wishList = {
            img,
            location,
            name,
            originalPrice,
            resalePrice,
            sellerEmail,
            sellerImg,
            sellerName,
            yearsUsed,
            userName: user?.displayName,
            userEmail: user?.email,
            userImg: user?.photoURL,
            categoryId
        }

        fetch('http://localhost:5000/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(wishList)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Added to Wishlist')
                }
                else {
                    toast.error(data.message)
                }
            })
    }

    if (isLoading) {
        return <Spinner></Spinner>
    }


    return (
        <div className='product'>
            {
                sellers.map((seller, i) => <div key={i}>
                    {seller?.email === sellerEmail && <div className="mb-5 flex items-center">
                        <div className="avatar mr-3">
                            <div className="w-12 rounded-full">
                                <img src={sellerImg} alt='' />
                            </div>
                        </div>
                        <div>
                            <p></p>
                            <h5 className="font-bold">{sellerName} {seller?.verified === "true" && <FaCheckCircle className='inline-block text-primary'></FaCheckCircle>} </h5>
                            <p className='text-sm'>{sellerEmail}</p>
                        </div>
                    </div>}
                </div>)
            }
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
                    <label onClick={() => setSingleProduct(product)} htmlFor="productModal" className="btn btn-primary w-full mt-9" >Book Now</label>
                    <label onClick={handleAddToWish} className="btn btn-secondary w-full mt-3" >Wish List</label>
                </div>
            </div>
        </div>
    );
};

export default Product;