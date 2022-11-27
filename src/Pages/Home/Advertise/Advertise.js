import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../Shared/Spinner/Spinner';

const Advertise = () => {

    const { data: advertiseItem = [], isLoading } = useQuery({
        queryKey: ['advertiseItem'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/advertise')
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    })
    if (isLoading) {
        return <Spinner></Spinner>
    }


    return (
        <div>
            {
                advertiseItem.length > 0 &&
                <div className='bg-slate-50'>
                    <div className='container  m-auto py-20'>
                        <h3 className="text-3xl font-bold mb-6">Suggestion For You</h3>
                        <div className="carousel py-4 px-3">
                            {
                                advertiseItem?.map(item => <Link key={item._id} to={`category/${item.categoryId}`}>
                                    <div className="carousel-item flex flex-col md:w-[300px] mr-6 hover:translate-y-[-7px] transition-all">
                                        <div className='product'>
                                            <div className="product_img">
                                                <img src={item.img} alt="" />
                                            </div>
                                            <div className="product_info px-3 py-5">
                                                <h2 className="text-2xl font-bold name">{item.name}</h2>
                                                <p className='mb-2'>Used: <span className="font-bold">{item.yearsUsed} {item.yearsUsed > 1 ? "years" : "year"}</span></p>
                                                <p className='mb-2'>Original Price: <span className="font-bold"> ${item.originalPrice}</span></p>
                                                <p className='text-xl '>Resale Price: <span className="font-bold text-2xl text-orange-500"> ${item.resalePrice}</span></p>
                                                <p>{Response}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>)
                            }


                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Advertise;