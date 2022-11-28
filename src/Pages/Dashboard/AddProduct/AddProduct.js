import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import Spinner from '../../Shared/Spinner/Spinner';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const { user, loading } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('en-us', { month: 'short' });
    const year = date.getFullYear();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate()

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://auto-plus-server.vercel.app/categories')
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = data => {
        // console.log(data.name, data.originalPrice, data.resalePrice, data.location, data.yearsUsed, data.categories, data.postTime, data.phone);

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const product = {
                        img: imgData.data.url,
                        name: data.name,
                        location: data.location,
                        resalePrice: data.resalePrice,
                        originalPrice: data.originalPrice,
                        yearsUsed: data.yearsUsed,
                        postTime: data.postTime,
                        categoryId: data.categories,
                        sellerName: user?.displayName,
                        sellerImg: user?.photoURL,
                        sellerEmail: user?.email,
                        saleStatus: "available"
                    }

                    //save doctors information to database
                    fetch('https://auto-plus-server.vercel.app/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            // authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.acknowledged) {
                                toast.success(`${data.name} is added successfully`)
                            }
                            navigate('/dashboard/myproducts')
                        })

                }
            })
    }

    if (isLoading || loading) {
        return <Spinner></Spinner>
    }

    return (
        <div className="px-3">
            <div className='md:w-[550px] p-7 m-auto py-10 px-8 rounded-xl bg-white my-10'>
                <h2 className="text-3xl mb-5 text-center font-bold text-primary">Sell Your Car</h2>

                <form onSubmit={handleSubmit(handleAddDoctor)} >
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">Car Name</span></label>
                        <input type="text"
                            {...register("name", {
                                required: "Email is required"
                            })}
                            className="input input-bordered w-full " />
                        {errors.name && <p className='text-red-500'> {errors.name.message} </p>}
                    </div>
                    <div className='flex justify-between items-center gap-4 flex-wrap md:flex-nowrap'>
                        <div className="form-control w-full ">
                            <label className="label"><span className="label-text">Original Price $</span></label>
                            <input type="text"
                                {...register("originalPrice", {
                                    required: "Price is required"
                                })}
                                className="input input-bordered w-full " />
                            {errors.originalPrice && <p className='text-red-500'> {errors.originalPrice.message} </p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label"><span className="label-text">Resale Price $</span></label>
                            <input type="text"
                                {...register("resalePrice", {
                                    required: "price is required"
                                })}
                                className="input input-bordered w-full " />
                            {errors.resalePrice && <p className='text-red-500'> {errors.resalePrice.message} </p>}
                        </div>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">Image</span></label>
                        <input type="file"
                            {...register("image", {
                                required: "image is required"
                            })}
                            className="input input-bordered input_photo w-full " />
                        {errors.image && <p className='text-red-500'> {errors.image.message} </p>}
                    </div>
                    <div className='flex justify-between items-center gap-4 flex-wrap md:flex-nowrap'>
                        <div className="form-control w-full ">
                            <label className="label"><span className="label-text">Location</span></label>
                            <input type="text"
                                {...register("location", {
                                    required: "Location is required"
                                })}
                                className="input input-bordered w-full " />
                            {errors.location && <p className='text-red-500'> {errors.location.message} </p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label"><span className="label-text">Used Years</span></label>
                            <input type="number"
                                {...register("yearsUsed", {
                                    required: "Used Years is required"
                                })}
                                className="input input-bordered w-full " />
                            {errors.yearsUsed && <p className='text-red-500'> {errors.yearsUsed.message} </p>}
                        </div>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">Category</span></label>
                        <select
                            {...register('categories')}
                            className="select select-bordered w-full ">
                            {
                                categories?.map(category => <option
                                    key={category._id}
                                    value={category.category_id}
                                >{category.name}</option>)
                            }
                        </select>
                    </div>
                    <div className='flex justify-between items-center gap-4 flex-wrap md:flex-nowrap'>
                        <div className="form-control w-full ">
                            <label className="label"><span className="label-text">Date</span></label>
                            <input type="text" defaultValue={`${day} ${month} ${year}`}
                                {...register("postTime")}
                                readOnly
                                className="input input-bordered w-full " />
                            {errors.postTime && <p className='text-red-500'> {errors.postTime.message} </p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label"><span className="label-text">Phone</span></label>
                            <input type="number"
                                {...register("phone", {
                                    required: "Phone is required"
                                })}
                                className="input input-bordered w-full " />
                            {errors.phone && <p className='text-red-500'> {errors.phone.message} </p>}
                        </div>
                    </div>


                    <input className='btn btn-primary w-full mt-5 font-bold text-white' value='Add Car' type="submit" />

                </form>
            </div>
        </div>
    );
};

export default AddProduct;