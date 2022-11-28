import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
// import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Spinner from '../../Shared/Spinner/Spinner';

const MyWishlist = () => {
    const { user, loading } = useContext(AuthContext)

    const { data: wishes, isLoading, refetch } = useQuery({
        queryKey: ['wishes'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://auto-plus-server-devasfahim.vercel.app/wishlist/${user.email}`, {
                    // headers: {
                    //     authorization: `bearer ${localStorage.getItem('accessToken')}`
                    // }
                })
                const data = await res.json();
                return data;
            } catch (error) {

            }
        }
    })


    if (isLoading || loading) {
        return <Spinner></Spinner>
    }

    return (
        <div className='py-10 px-5'>
            <h2 className="text-3xl mb-5 text-center font-bold text-primary">My Products</h2>

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-primary text-white">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Product
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Price
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            wishes?.map(wish => <tr
                                key={wish._id}
                                className="bg-white border-b  hover:bg-gray-50 "
                            >
                                <td className="p-4 w-32">
                                    <img src={wish.img} alt="" />
                                </td>
                                <td className="py-4 px-6 font-semibold">
                                    {wish.name}
                                </td>
                                <td className="py-4 px-6 font-semibold">
                                    ${wish.resalePrice}
                                </td>
                                <td className="py-4 px-6">
                                    <Link to={`/category/${wish.categoryId}`} className="btn btn-primary btn-outline btn-xs">Buy Now</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyWishlist;