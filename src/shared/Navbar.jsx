import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const navItems = <>
        <li className='px-4 font-semibold hover:text-blue-400'><NavLink to='/'>Home</NavLink></li>
        <li className='px-4 font-semibold hover:text-blue-400'><NavLink to='/all_products'>All Products</NavLink></li>
    </>
    return (
        <div>
            <div className="navbar bg-base-200 py-3">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navItems}
                        </ul>
                    </div>
                    <Link to={'/'} className="lg:text-2xl font-bold py-2 px-6 bg-primary rounded-xl border-4 border-primary text-base-300">Luxury-Pen</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center px-2">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end gap-3">
                    {
                        !user && <><Link to={'/register'} className="btn btn-primary">Register</Link>
                            <Link to={'/login'} className="btn btn-primary">Login</Link></>
                    }
                    {
                        user && <Link onClick={logOut} className="btn btn-primary">Log Out</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;