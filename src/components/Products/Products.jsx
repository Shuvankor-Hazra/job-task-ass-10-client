import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import Product from '../Product/Product';

const Products = () => {
    const axiosCommon = useAxiosCommon();
    const { data: pens, isLoading } = useQuery({
        queryKey: ['pen'],
        queryFn: async () => {
            const res = await axiosCommon.get('/pens')
            return res.data;
        }
    })


    return (
        <>
            <h2 className='text-2xl font-bold text-center py-6'>Total Products: {pens?.length}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {
                    pens?.slice(0, 12).map((pen, idx) => <Product key={idx} pen={pen} />)
                }
            </div>
            <div className='flex justify-between pt-6 mb-10'>
                <button className='btn'>Prev</button>
                <button className='btn'>Next</button>
            </div>
        </>
    );
};

export default Products;