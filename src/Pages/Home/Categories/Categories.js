import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Category from './Category';

const Categories = () => {

    const {data: categories = []} = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('http://localhost:5000/categories')
        .then(res => res.json())
    })

    return (
        <div className='container categories py-20 px-4 m-auto'>
            <div className="cat_header md:w-1/2 m-auto text-center font-bold">
                <h2 className="text-3xl md:text-5xl">Expect Great Things From Our Auto Plus</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {
                    categories.map(category => <Category 
                        key={category._id}
                        category={category}
                    ></Category>)
                }
            </div>
            
        </div>
    );
};

export default Categories;