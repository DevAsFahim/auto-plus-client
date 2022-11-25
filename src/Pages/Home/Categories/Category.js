import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './category.css'

const Category = ({ category }) => {
    const { name, description, category_id } = category;
    return (
        <div className='overflow-hidden rounded-xl py-12 px-10 mt-9 min-h-[300px] category'>
            <div className='flex justify-between mb-3'>
                <span></span>
                <Link to={`category/${category_id}`} className='text-3xl icon'><FaArrowRight></FaArrowRight></Link>
            </div>
            <h4 className="text-2xl font-bold">{name}</h4>
            <p>{description}</p>
        </div>
    );
};

export default Category;