import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa6";
import { NavLink } from "react-router-dom";


const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
                <nav className="grid grid-flow-col gap-4">
                    <NavLink to={'/'} className="link link-hover">Home</NavLink>
                    <NavLink to={'/all_products'} className="link link-hover">All Products</NavLink>

                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4 text-3xl">
                        <a>
                            <FaTwitter />
                        </a>
                        <a>
                            <FaYoutube />
                        </a>
                        <a>
                            <FaFacebook />
                        </a>
                    </div>
                </nav>
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Luxury Pen</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;