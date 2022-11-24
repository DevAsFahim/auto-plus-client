import React, { useContext } from 'react';
// import { useState } from 'react';
// import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const SignUp = () => {
    

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
                    <form onSubmit={handleCreateUser}>
                        <div className="mb-3 form-control">
                            <input type="text" name='name' className="input input-bordered" placeholder="Your Full Name" required />
                        </div>
                        <div className="mb-3 form-control">
                            <input type="text" name='photoURL' className="input input-bordered" placeholder="Photo URL" required />
                        </div>
                        <div className="mb-3 form-control">
                            <input type="email" name='email' className=" input input-bordered" placeholder="Your Email" required />
                        </div>
                        <div className="mb-3 form-control">
                            <input type="password" name='password' className="input input-bordered" placeholder="Your Password" required />
                        </div>
                        {/* {success && <p className="text-success">Successfully Logged in</p>}
                                    {error && <p className="text-danger">{error}</p>} */}
                        <button className="btn default-btn d-block w-full mt-4">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;