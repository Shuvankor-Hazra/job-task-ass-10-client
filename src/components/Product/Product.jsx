import React from 'react';

const Product = ({ pen }) => {
    const { name, image, desc, price, category, ratings, creation_date_time } = pen;
    return (
        <div>
            <div className="card bg-base-300 border-2 ">
                <figure>
                    <img src={image} />
                </figure>
                <div className="p-6 flex flex-col gap-1">
                    <h2 className="card-title">{name}</h2>
                    <p className='flex-1'>{desc}</p>
                    <div className='font-semibold'>
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
        </div>
    );
};

export default Product;