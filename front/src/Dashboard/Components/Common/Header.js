import { Link } from "react-router-dom";
import DashboardLayout from "../Layouts/Dashboard";
import { useState } from "react";

const Header = () => {


    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* <!-- Left navbar links --> */}
                <ul className="navbar-nav">
                    
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link className="nav-link" to="/dashboard">Home</Link>
                    </li>
                    
                </ul>

                {/* <!-- Right navbar links --> */}
                <ul className="navbar-nav ml-auto">
                    
                </ul>
            </nav>
        </div>
    )
}

export default Header;