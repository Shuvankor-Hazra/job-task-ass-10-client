import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import Product from '../Product/Product';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import axios from 'axios';

const Products = () => {
    const [itemsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1)
    const [count, setCount] = useState(0);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const axiosCommon = useAxiosCommon();

    const { data: pens, isLoading } = useQuery({
        queryKey: ['pens'],
        queryFn: async () => {
            const res = await axiosCommon.get('/pens')
            return res.data;
        }
    })

    useEffect(() => {
        getData();
    }, [currentPage, filter, itemsPerPage, sort])
    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/all-books?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}`)
        setBooks(data);
    }

    useEffect(() => {
        const getCount = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/pens-count?filter=${filter}`)
            setCount(data.count);
        }
        getCount();
    }, [filter])

    const numberOfPages = Math.ceil(count / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1)

    // handlePagination btn
    const handlePaginationButton = (value) => {
        setCurrentPage(value);
    }


    return (
        <>
            <h2 className='text-2xl font-bold text-center py-6'>Total Products: {pens?.length}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    pens?.slice(0, 6).map((pen, idx) => <Product key={idx} pen={pen} />)
                }
            </div>

            <div className='flex justify-center my-12'>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePaginationButton(currentPage - 1)}
                    className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500 hover:text-white'>
                    <div className='flex items-center mx-1'>
                        <FaArrowLeftLong />
                        <span className='mx-1'>prev</span>
                    </div>
                </button>

                {pages?.map(btnNum => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}
                        key={btnNum}
                        className={`hidden ${currentPage === btnNum ? 'bg-blue-500 text-white' : ''} px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-blue-500 hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}

                <button
                    disabled={currentPage === numberOfPages}
                    onClick={() => handlePaginationButton(currentPage + 1)}
                    className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
                    <div className='flex items-center mx-1'>
                        <span className='mx-1'>Next</span>
                        <FaArrowRightLong />
                    </div>
                </button>
            </div>
            {/* <div className='flex justify-between pt-6 mb-10'>
                <button className='btn btn-primary'>Prev</button>
                <button className='btn btn-primary'>Next</button>
            </div> */}
        </>
    );
};

export default Products;