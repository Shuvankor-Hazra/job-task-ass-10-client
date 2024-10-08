import React from 'react';

const Product = ({ pen }) => {
    const { name, brand, image, desc, price, category, ratings, creation_date_time } = pen;
    return (
        <>
            <div className="card bg-base-300 border-2 min-h-[600px] p-6 hover:scale-[1.03] transition-all">
                <figure>
                    <img className='w-full hover:scale-125 transition-all' src={image} />
                </figure>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold mt-3">{name}</h2>
                    <p className='min-h-8'>{desc}</p>
                    <div className='font-semibold'>
                        <p>Brand: {brand}</p>
                        <p>Price: $ {price}</p>
                        <p>Category: {category}</p>
                        <p>Ratings: {ratings}</p>
                        <p>Date: {creation_date_time}</p>
                    </div>
                    <div>
                        <button className="btn btn-primary w-full mt-3">Buy Now</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;