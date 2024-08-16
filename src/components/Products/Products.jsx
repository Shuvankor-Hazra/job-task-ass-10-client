import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import Product from '../Product/Product';

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
        const { data } = await axiosCommon.get(`/all-pens?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}`)
        setBooks(data);
    }

    useEffect(() => {
        const getCount = async () => {
            const { data } = await axiosCommon.get(`/pens-count?filter=${filter}`)
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

            <div className='flex flex-col md:flex-row justify-center items-center gap-5 mb-6'>
                <div>
                    <select
                        onChange={e => {
                            setFilter(e.target.value)
                            setCurrentPage(1)
                        }}
                        value={filter}
                        name='category'
                        id='category'
                        className='border p-4 rounded-lg'
                    >
                        <option value=''>Filter By Category</option>
                        <option value='Novel'>Novel</option>
                        <option value='Thriller'>Thriller</option>
                        <option value='History'>History</option>
                        <option value='Sci-Fi'>Sci-Fi</option>
                    </select>
                </div>
                <div>
                    <select
                        onChange={e => {
                            setSort(e.target.value)
                            setCurrentPage(1)
                        }}
                        value={sort}
                        name='sort'
                        id='sort'
                        className='border p-4 rounded-md'
                    >
                        <option value=''>Sort by Rating</option>
                        <option value='descending'>Descending Order</option>
                        <option value='ascending'>Ascending Order</option>
                    </select>
                </div>
            </div>

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
        </>
    );
};

export default Products;