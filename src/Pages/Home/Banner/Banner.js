import React from 'react';
import './Banner.css';

const Banner = () => {
    return (
        <div className='banner shadow-xl'>
            <div className="banner_content flex flex-col justify-center h-screen container m-auto">
                <div className='md:w-7/12'>
                    <h3 className="md:text-6xl text-4xl font-bold text-white mb-6">The Easy Way To Buy and Sell Your Car Online With
                        Auto Plus</h3>
                    <p className='text-white text-xl'>Delivery to your door. 14-day back money back guarantee. Serving <br /> customers for over 40 years.</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;