import React from 'react';

const ProductModal = ({ singleProduct, user }) => {
    const {name: productName, resalePrice} = singleProduct;

    
    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        // const booking = {
        //     appointmentDate: date,
        //     treatment: treatmentName,
        //     patient: name,
        //     slot,
        //     email,
        //     phone,
        //     price
        // }

        // fetch('http://localhost:5000/bookings', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(booking)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data);
        //     if(data.acknowledged){
        //         setTreatment(null)
        //         toast.success('booking confirmed')
        //         refetch()
        //     }
        //     else{
        //         toast.error(data.message)
        //     }
        // })

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
                        <input name='phone' type="text" placeholder="Your Phone" className="input w-full input-bordered" />
                        <input name='meetingLocation' type="text" placeholder="Your Phone" className="input w-full input-bordered" />
                        <input type="submit" value="Submit" className='input w-full btn btn-accent' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;