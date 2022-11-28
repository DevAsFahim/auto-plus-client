import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '../../Shared/Spinner/Spinner';
import './Testimonial.css'

const Testimonial = () => {

    const { data: testimonials = [], isLoading } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/testimonials');
            const data = await res.json();
            return data;
        }
    })

    if(isLoading){
        return <Spinner></Spinner>
    }

    return (
        <div className='bg-slate-50 px-3'>
            <div className='container  m-auto py-20'>
                <p className='text-green-500 font-bold mb-4'>Testimonial</p>
                <h3 className="text-3xl font-bold mb-6">TRUST FROM OUR CLIENTS</h3>
                <div className="carousel">
                    {
                        testimonials?.map(testimonial => <div key={testimonial._id} className="carousel-item w-[300px] flex flex-col md:w-[500px] mr-12">
                            <div className="testimonial_message shadow-lg rounded-xl py-7 px-5 bg-white mb-5">
                                <p className="italic">"{testimonial.review}"</p>
                            </div>
                            <div className="testimonial_user flex items-center">
                                <div className="avatar mr-3">
                                    <div className="w-16 rounded-full">
                                        <img src={testimonial.img} alt='' />
                                    </div>
                                </div>
                                <div>
                                    <h5 className="font-bold text-xl">{testimonial.name}</h5>
                                    <p>Happy Customer</p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Testimonial;