import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '../../Shared/Spinner/Spinner';
import Category from './Category';

const Categories = () => {

    const {data: categories = [], isLoading} = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('https://auto-plus-server.vercel.app/categories')
        .then(res => res.json())
    })

    if(isLoading) {
        return <Spinner></Spinner>
    }

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