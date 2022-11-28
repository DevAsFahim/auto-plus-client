import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
// import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Spinner from '../../Shared/Spinner/Spinner';

const MyOrders = () => {
    const { user, loading } = useContext(AuthContext)

    const { data: bookings, isLoading, refetch } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://auto-plus-server-devasfahim.vercel.app/bookings/${user.email}`, {
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
    console.log(bookings);

    const handleAdvertiseProduct = id => {
        // console.log(id);
        // fetch(`https://auto-plus-server-devasfahim.vercel.app/advertise/${id}`, {
        //     method: 'PUT',
        //     // headers: {
        //     //     authorization: `bearer ${localStorage.getItem('accessToken')}`
        //     // }
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.modifiedCount > 0) {
        //             toast.success('Advertised Successfully')
        //             refetch()
        //         }
        //     })
    }

    const handleDeleteProduct = id => {
        // fetch(`https://auto-plus-server-devasfahim.vercel.app/myproducts/${id}`, {
        //     method: 'DELETE',
        //     // headers: {
        //     //     authorization: `bearer ${localStorage.getItem('accessToken')}`
        //     // }
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.deletedCount > 0) {
        //             toast.success(`Product deleted successfully`)
        //             refetch()
        //         }
        //     })
    }

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
                                Meeting Location
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
                            bookings?.map(booking => <tr
                                key={booking._id}
                                className="bg-white border-b  hover:bg-gray-50 "
                            >
                                <td className="p-4 w-32">
                                    <img src={booking.productImg} alt="" />
                                </td>
                                <td className="py-4 px-6 font-semibold">
                                    {booking.productName}
                                </td>
                                <td className="py-4 px-6 capitalize">
                                    {booking.meetingLocation}
                                </td>
                                <td className="py-4 px-6 font-semibold">
                                    ${booking.resalePrice}
                                </td>
                                <td className="py-4 px-6">
                                    <Link onClick={() => handleDeleteProduct(booking._id)} className="btn btn-xs btn-secondary">Pay</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;