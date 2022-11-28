import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useState } from 'react';
// import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToke';

const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)
    const navigate = useNavigate()
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    if (token) {
        navigate('/')
    }


    // sign in with email and password 
    const handleCreateUser = (data) => {
        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // create and update user image and name
                    createUser(data.email, data.password)
                        .then((userCredential) => {
                            const createdUser = userCredential.user;
                            console.log(createdUser);
                            handleUpdateUserProfile(data.name, imgData.data.url);
                            // save users to the database
                            const user = {
                                name: data.name,
                                email: data.email,
                                img: imgData.data.url,
                                userType: data.userType
                            }
                            fetch('https://auto-plus-server.vercel.app/users', {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(user)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.acknowledged) {
                                        setCreatedUserEmail(user.email)
                                        toast.success('Successfully account created')
                                    }
                                })
                        })
                        .catch((error) => {
                            toast.error(error.message)
                        });

                }

            })
    }

    const handleUpdateUserProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        updateUserProfile(profile)
            .then(() => { })
            .catch(error => console.error(error))
    }


    return (
        <div className="connect p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 connect_container lg:w-9/12 m-auto h-[600px] items-center rounded-xl overflow-hidden">
                <div className="connect_img hidden md:block">
                    <div className="text-center mt-48 bg-white bg-opacity-20 backdrop-blur-md rounded drop-shadow-lg py-8 px-4 mx-10">
                        <h2 className="text-3xl text-white font-semibold mb-4">Already have an account?</h2>
                        <Link to='/login'><button className='btn'>Login</button></Link>
                    </div>
                </div>
                <div className="connect_form px-7">
                    <h1 className='text-4xl font-bold'>Sign Up</h1>
                    <form onSubmit={handleSubmit(handleCreateUser)}>
                        <div className="mb-3 form-control">
                            <input type="text" {...register("name", { required: true })} className="input input-bordered" placeholder="Your Full Name" />
                        </div>
                        <div className="mb-3 form-control">
                            <input type="email" {...register("email", { required: true })} className=" input input-bordered" placeholder="Your Email" />
                        </div>
                        <div className="mb-3 form-control">
                            <input type="password" {...register("password", { required: true })} className="input input-bordered" placeholder="Your Password" />
                        </div>
                        <select defaultValue='user' {...register("userType", { required: true })} className="select select-bordered w-full mb-3">
                            <option value='user' >User</option>
                            <option value='seller'>Seller</option>
                        </select>
                        <div className="mb-3 form-control">
                            <input type="file" {...register("image", { required: true })} className="input input_photo input-bordered" placeholder="Photo URL" />
                        </div>
                        <button className="btn default-btn d-block w-full mt-4">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;