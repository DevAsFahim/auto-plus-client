import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Blog from '../Blog/Blog';

const Blogs = () => {
    const {data: blogs = []} = useQuery({
        queryKey: ['blogs'],
        queryFn: async() => {
            const res = await fetch('http://localhost:5000/blogs');
            const data = await res.json();
            return data;
        }
     })
    console.log(blogs);

    return (
        <>
            <div className="text-center mt-14">
                <p className='text-orange-600'>Blogs</p>
                <h3 className="text-5xl font-bold mt-3">See My Blogs</h3>
            </div>
            <div className='grid px-3 md:grid-cols-2 lg:grid-cols-3 gap-7 py-20 container m-auto'>
                {
                    blogs.map(blog => <Blog
                        key={blog._id}
                        blog={blog}
                    ></Blog>)
                }
            </div>
        </>
    );
};

export default Blogs;