import React from 'react';
import { toast } from 'react-toastify';

const ProductModal = ({ singleProduct, user, setSingleProduct }) => {
    const {name: productName, img, resalePrice, categoryId, sellerEmail, sellerImg, sellerName, sellerPhone} = singleProduct;
    
    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const resalePrice = form.resalePrice.value;
        const meetingLocation = form.meetingLocation.value;

        const booking = {
            email,
            phone,
            name,
            resalePrice,
            meetingLocation,
            productName,
            categoryId,
            sellerEmail,
            sellerImg,
            sellerName,
            sellerPhone,
            productImg: img
        }

        // send booking information to database
        fetch('https://auto-plus-server-devasfahim.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                toast.success('booking confirmed')
                setSingleProduct(null)
            }
            else{
                toast.error(data.message)
            }
        })

    }

    return (
        <div>
            < input type="checkbox" id="productModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="productModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <h3 className="text-lg font-bold"> {productName} </h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input name='name' type="text" placeholder="Your Name" defaultValue={user?.displayName} disabled className="input w-full input-bordered" />
                        <input name='email' type="email" placeholder="Your Email" defaultValue={user?.email} disabled className="input w-full input-bordered" />
                        <input name='resalePrice' type="text" value={`$ ${resalePrice}`} disabled className="input w-full input-bordered" />
                        <input name='phone' type="text" placeholder="Your Phone" className="input w-full input-bordered" required />
                        <input name='meetingLocation' type="text" placeholder="Location" className="input w-full input-bordered" required />
                        <input type="submit" value="Submit" className='input w-full btn btn-primary font-bold' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;