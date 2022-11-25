import React from 'react';
import './Testimonial.css'

const Testimonial = () => {
    return (
        <div className='bg-slate-50'>
            <div className='container  m-auto py-20'>
                <p className='text-green-500 font-bold mb-4'>Testimonial</p>
                <h3 className="text-3xl font-bold mb-6">TRUST FROM OUR CLIENTS</h3>
                <div className="carousel">
                    <div className="carousel-item w-1/2 flex flex-col md:w-[500px] mr-12">
                        <div className="testimonial_message shadow-lg rounded-xl py-7 px-5 bg-white mb-5">
                            <p className="italic">"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus officiis minima quisquam dolorem asperiores dolor deleniti! Neque harum incidunt voluptates. Aliquam quisquam nam maxime, dolorem excepturi molestiae magnam eum obcaecati."</p>
                        </div>
                        <div className="testimonial_user flex items-center">
                            <div className="avatar mr-3">
                                <div className="w-16 rounded-full">
                                    <img src="https://placeimg.com/192/192/people" />
                                </div>
                            </div>
                            <div>
                                <h5 className="font-bold text-xl">His name</h5>
                                <p>Happy Customer</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item w-1/2 flex flex-col md:w-[500px] mr-12">
                        <div className="testimonial_message shadow-lg rounded-xl py-7 px-5 bg-white mb-5">
                            <p className="italic">"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus officiis minima quisquam dolorem asperiores dolor deleniti! Neque harum incidunt voluptates. Aliquam quisquam nam maxime, dolorem excepturi molestiae magnam eum obcaecati."</p>
                        </div>
                        <div className="testimonial_user flex items-center">
                            <div className="avatar mr-3">
                                <div className="w-16 rounded-full">
                                    <img src="https://placeimg.com/192/192/people" />
                                </div>
                            </div>
                            <div>
                                <h5 className="font-bold text-xl">His name</h5>
                                <p>Happy Customer</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item w-1/2 flex flex-col md:w-[500px] mr-12">
                        <div className="testimonial_message shadow-lg rounded-xl py-7 px-5 bg-white mb-5">
                            <p className="italic">"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus officiis minima quisquam dolorem asperiores dolor deleniti! Neque harum incidunt voluptates. Aliquam quisquam nam maxime, dolorem excepturi molestiae magnam eum obcaecati."</p>
                        </div>
                        <div className="testimonial_user flex items-center">
                            <div className="avatar mr-3">
                                <div className="w-16 rounded-full">
                                    <img src="https://placeimg.com/192/192/people" />
                                </div>
                            </div>
                            <div>
                                <h5 className="font-bold text-xl">His name</h5>
                                <p>Happy Customer</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item w-1/2 flex flex-col md:w-[500px] mr-12">
                        <div className="testimonial_message shadow-lg rounded-xl py-7 px-5 bg-white mb-5">
                            <p className="italic">"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus officiis minima quisquam dolorem asperiores dolor deleniti! Neque harum incidunt voluptates. Aliquam quisquam nam maxime, dolorem excepturi molestiae magnam eum obcaecati."</p>
                        </div>
                        <div className="testimonial_user flex items-center">
                            <div className="avatar mr-3">
                                <div className="w-16 rounded-full">
                                    <img src="https://placeimg.com/192/192/people" alt=''/>
                                </div>
                            </div>
                            <div>
                                <h5 className="font-bold text-xl">His name</h5>
                                <p>Happy Customer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;