import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
// import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Spinner from '../../Shared/Spinner/Spinner';

const MyProducts = () => {
    const { user, loading } = useContext(AuthContext)
    // const [deletingDoctor, setDeletingDoctor] = useState(null)

    // const closeModal = () => {
    //     setDeletingDoctor(null)
    // }

    const { data: myProducts, isLoading, refetch } = useQuery({
        queryKey: ['myProducts'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/myproducts/${user.email}`, {
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

    const handleAdvertiseProduct = id => {
        console.log(id);
        fetch(`http://localhost:5000/advertise/${id}`, {
            method: 'PUT',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Advertised Successfully')
                    refetch()
                }
            })
    }

    const handleDeleteProduct = id => {
        fetch(`http://localhost:5000/myproducts/${id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success(`Product deleted successfully`)
                    refetch()
                }
            })
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
                                sale status
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Price
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Advertise
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts?.map(product => <tr
                                key={product._id}
                                className="bg-white border-b  hover:bg-gray-50 "
                            >
                                <td className="p-4 w-32">
                                    <img src={product.img} alt="" />
                                </td>
                                <td className="py-4 px-6 font-semibold">
                                    {product.name}
                                </td>
                                <td className="py-4 px-6 capitalize">
                                    {product.saleStatus}
                                </td>
                                <td className="py-4 px-6 font-semibold">
                                    ${product.resalePrice}
                                </td>
                                <td className="py-4 px-6">
                                    {
                                        product.saleStatus === "available" && <button disabled={product.advertise === "true"} onClick={() => handleAdvertiseProduct(product._id)} className="btn btn-primary btn-xs btn-outline">Advertise</button>
                                    }
                                </td>
                                <td className="py-4 px-6">
                                    <Link onClick={() => handleDeleteProduct(product._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* {
                deletingDoctor && 
                <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`if your delete ${deletingDoctor.name}. It cannot be recovered`}
                    successAction={handleDeleteDoctor}
                    modalData= {deletingDoctor}
                    successButtonName='Delete'
                    closeModal={closeModal}
                ></ConfirmationModal>
            } */}
        </div>
    );
};

export default MyProducts;