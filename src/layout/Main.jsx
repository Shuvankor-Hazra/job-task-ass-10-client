import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";


const Main = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-screen-xl mx-auto min-h-[calc(100vh-292px)] px-3 lg:px-0">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default Main;
