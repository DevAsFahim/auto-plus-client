import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllBuyers = () => {

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteUser = id => {
        fetch(`http://localhost:5000/user/${id}`, {
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
            <h2 className="text-3xl mb-5 text-center font-bold text-primary">All Buyers</h2>

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
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr
                                key={user._id}
                                className="bg-white border-b hover:bg-gray-50"
                            >
                                <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap">
                                    <img className="w-10 h-10 rounded-full" src={user.img} alt="" />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{user.name}</div>
                                        <div className="font-normal text-gray-500">{user.email}</div>
                                    </div>
                                </th>
                                <td className="py-4 px-6">
                                    User
                                </td>
                                <td className="py-4 px-6">
                                    <Link onClick={ () => handleDeleteUser(user._id)} className="btn btn-primary btn-xs text-white normal-case">Delete</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default AllBuyers;