import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <h2 className='text-2xl text-center font-bold'>Oops something wrong</h2>
            <Link to='/' className='underline'>Go Home</Link>
        </div>
    );
};

export default ErrorPage;