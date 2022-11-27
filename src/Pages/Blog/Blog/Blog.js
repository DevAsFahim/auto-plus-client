import React from 'react';
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";

const Blog = ({ blog }) => {
    const { _id, title, description, img} = blog;
    return (
        <>
            <div className="card rounded-none single-service" style={{
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
            }}>
                <figure><img src={img} alt="BlogImage"/></figure>
                <div className="card-body">
                    <h2 className="card-title"> {title} </h2>
                    <p>
                        {
                            description.slice(0, 100)
                        }...
                    </p>
                    <div className="card-actions justify-center mt-6 items-center">
                        <Link to={`/blogs/${_id}`} className='btn btn-primary text-white'> Read More </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog;