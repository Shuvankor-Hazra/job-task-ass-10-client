import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import Product from '../Product/Product';

const Products = () => {
    const axiosCommon = useAxiosCommon();

    const [size] = useState(6);
    const [currentPage, setCurrentPage] = useState(1)
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [sortPrice, setSortPrice] = useState('');
    const [search, setSearch] = useState('');

    const { data } = useQuery({
        queryKey: ['pens', size, currentPage, brand, category, price, date, sortPrice, search],
        queryFn: async () => {
            const res = await axiosCommon.get(`/all_pens`, {
                params: {
                    size,
                    page: currentPage,
                    brand,
                    category,
                    price,
                    date,
                    sortPrice,
                    search
                }
            })
            return res.data;
        }
    })


    const pens = data?.pens || [];
    const totalPages = data?.totalPages || 1;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // handlePagination btn
    const handlePaginationButton = (value) => {
        setCurrentPage(value);
    }

    const handleResetButton = () => {
        setBrand('');
        setCategory('');
        setPrice('');
        setDate('');
        setSortPrice('');
        setSearch('');
    }

    return (
        <>
            <div className='text-2xl font-bold text-center py-6'>
                <h2 className=''>Total Products: {data?.totalProducts}</h2>
                <h2 className='font-semibold'>Sorted Products: {data?.totalDocuments}</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 space-y-2 lg:space-y-0 mb-6 text-center'>
                {/* brand */}
                <div>
                    <select
                        onChange={e => {
                            setBrand(e.target.value)
                            setCurrentPage(1)
                        }}
                        value={brand}
                        className='border p-4 rounded-lg'
                    >
                        <option value=''>Filter By Brand</option>
                        <option value='TechMark'>TechMark</option>
                        <option value='EliteTech'>EliteTech</option>
                        <option value='MajestyMobile'>MajestyMobile</option>
                        <option value='GoldTech'>GoldTech</option>
                    </select>
                </div>

                {/* category */}
                <div>
                    <select
                        onChange={e => {
                            setCategory(e.target.value)
                            setCurrentPage(1)
                        }}
                        value={category}
                        className='border p-4 rounded-lg'
                    >
                        <option value=''>Filter By Category</option>
                        <option value='Luxury'>Luxury</option>
                        <option value='High'>High</option>
                        <option value='Medium'>Medium</option>
                        <option value='Low'>Low</option>
                    </select>
                </div>

                {/* price */}
                <div>
                    <select
                        onChange={e => {
                            setPrice(e.target.value)
                            setCurrentPage(1)
                        }}
                        value={price}
                        className='border p-4 rounded-lg'
                    >
                        <option value=''>Filter By Price</option>
                        <option value='0-100'>$ 0 - $ 100</option>
                        <option value='100-200'>$ 100 - $ 200</option>
                        <option value='200-300'>$ 200 - $ 300</option>
                        <option value='300-400'>$ 300 - $ 400</option>
                        <option value='400-500'>$ 400 - $ 500</option>
                    </select>
                </div>

                {/* date */}
                <div>
                    <select
                        onChange={e => {
                            setDate(e.target.value)
                            setCurrentPage(1)
                        }}
                        value={date}
                        className='border p-4 rounded-md'
                    >
                        <option value=''>Sort by Date</option>
                        <option value='ascending'>Ascending Date</option>
                        <option value='descending'>Descending Date</option>
                    </select>
                </div>

                {/* sort price */}
                <div>
                    <select
                        onChange={e => {
                            setSortPrice(e.target.value)
                            setCurrentPage(1)
                        }}
                        value={sortPrice}
                        className='border p-4 rounded-md'
                    >
                        <option value=''>Sort by Price</option>
                        <option value='ascending'>Ascending Price</option>
                        <option value='descending'>Descending Price</option>
                    </select>
                </div>

                {/* search */}
                <div>
                    <input value={search}
                        onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search by Name" className="border p-4 rounded-md input-md" required />
                </div>
            </div>
            <div className='flex items-center justify-center mb-6 '>
                <button onClick={handleResetButton} className='btn bg-primary text-white'>Reset</button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    pens?.map((pen, idx) => <Product key={idx} pen={pen} />)
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
                    disabled={currentPage === pens.length}
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