import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const { userLogIn, createUserWithGoogle, createUserWithGithub } = useContext(AuthContext);
    // const navigate = useNavigate();
    // const location = useLocation();

    // const from = location.state?.from?.pathname || '/';


    // log in user with email and password
    const handleLogIn = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        userLogIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                form.reset()
                // navigate(from , {replace: true} )
                toast.success('Logged in successfully')
            })
            .catch((error) => {
                toast.error(error.message)
            });
    }

    // sign in with google
    const handleGoogleUser = () => {
        createUserWithGoogle()
            .then((result) => {
                const user = result.user;
                // navigate("/")
                console.log(user);
                toast.success('Logged in successfully')
            }).catch((error) => {
                // setError(error.message)
                console.error(error);
                toast.error(error.message)
            });
    }

    // // sign in with github
    // const handleGithubUser = () => {
    //     createUserWithGithub()
    //     .then((result) => {
    //         const user = result.user;
    //         navigate("/")
    //         console.log(user);
    //     }).catch((error) => {
    //         setError(error.message)
    //     });
    // }

    return (
        <div className="connect p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 connect_container lg:w-9/12 m-auto h-[600px] items-center rounded-xl overflow-hidden">
                <div className="connect_img hidden md:block">
                    <div className="text-center mt-48 bg-white bg-opacity-20 backdrop-blur-md rounded drop-shadow-lg py-8 px-4 mx-10">
                        <h2 className="text-3xl text-white font-semibold mb-4">New on this website?</h2>
                        <Link to='/signup'><button className='btn'>Sign Up</button></Link>
                    </div>
                </div>
                <div className="connect_form px-7">
                    <h1 className='text-4xl font-bold'>Create your account</h1>
                    <form onSubmit={handleLogIn}>
                        <div className="mb-3 form-control">
                            <input type="email" name='email' className=" input input-bordered" placeholder="Your Email" required />
                        </div>
                        <div className="mb-3 form-control">
                            <input type="password" name='password' className="input input-bordered" placeholder="Your Password" required />
                        </div>
                        <button className="btn default-btn mb-8 d-block w-full">Login</button>
                    </form>
                    <button onClick={handleGoogleUser} className="btn mt-2 btn-outline d-block w-full"> <FaGoogle className='mr-3'></FaGoogle> Login with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;