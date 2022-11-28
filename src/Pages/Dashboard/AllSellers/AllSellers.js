import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllSellers = () => {

    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('https://auto-plus-server.vercel.app/sellers', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    const handleMakeSeller = id => {
        fetch(`https://auto-plus-server.vercel.app/seller/${id}`, {
            method: 'PUT',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Verified Successfully')
                    refetch()
                }
            })
    }

    const handleDeleteSeller = id => {
        fetch(`https://auto-plus-server.vercel.app/seller/${id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.error('Deleted Successfully')
                    refetch()
                }
            })
    }

    return (
        <div className='py-10 px-5'>
            <h2 className="text-3xl mb-5 text-center font-bold text-primary">All Sellers</h2>

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="text-x uppercase bg-primary text-white">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Position
                            </th>
                            <th scope="col" className="py-3 px-6">
                                verify Status
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, i) => <tr
                                key={seller._id}
                                className="bg-white border-b hover:bg-gray-50"
                            >
                                <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap">
                                    <img className="w-10 h-10 rounded-full" src={seller.img} alt="" />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{seller.name}</div>
                                        <div className="font-normal text-gray-500">{seller.email}</div>
                                    </div>
                                </th>
                                <td className="py-4 px-6">
                                    Seller
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center">
                                        {
                                            seller?.verified ? 
                                            <FaCheckCircle className='inline-block text-primary'></FaCheckCircle>
                                            :
                                            <button onClick={() => handleMakeSeller(seller._id)} className="btn btn-primary btn-xs normal-case text-white">Verify</button>
                                        }
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <Link onClick={ () => handleDeleteSeller(seller._id)} className="btn btn-primary btn-xs text-white normal-case">Delete</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default AllSellers;