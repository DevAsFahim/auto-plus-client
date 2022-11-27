import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './SingleBlog.css'

const SingleBlog = () => {
    const blog = useLoaderData();
    const { title, description, img } = blog


    return (
        <div className='container single_blog'>
            <div className="details_container">
                <h4 className="text-4xl font-bold mb-5"> {title} </h4>
                <img src={img} className='service_img mb-8' alt='' />
                <p> {description} </p>
            </div>
        </div>
    );
};

export default SingleBlog;