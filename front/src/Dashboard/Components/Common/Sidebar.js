import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../ContextAPI/UserTokenContext_API";


const Sidebar = () => {


    const [showBookMenu, setShowBookMenu] = useState(false);
    const [showCatMenu, setShowCatMenu] = useState(false);
    const { setUserToken } = useContext(UserContext);

    const toggleBookMenu = (e) => {
        e.preventDefault();
        setShowBookMenu(!showBookMenu);
    }

    const toggleCatMenu = (e) => {
        e.preventDefault();
        setShowCatMenu(!showCatMenu);
    }

    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* <!-- Brand Logo --> */}
                <Link className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ 'opacity': .8 }} />
                    <span className="brand-text font-weight-light">Book Store</span>
                </Link>

                {/* <!-- Sidebar --> */}
                <div className="sidebar">




                    {/* <!-- Sidebar Menu --> */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* <!-- Add icons to the links using the .nav-icon className */}
                            {/* with font-awesome or any other icon font library --> */}

                            <li className="nav-item">
                                <Link to="/dashboard/userprofile" className="nav-link">
                                <i class="nav-icon fa fa-user-circle" aria-hidden="true"></i>
                                    <p>
                                        User
                                    </p>
                                </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link
                                    onClick={(e) => toggleBookMenu(e)}
                                    className="nav-link">
                                    <i className="nav-icon fa fa-book" aria-hidden="true"></i>
                                    <p>
                                        Books
                                        {
                                            showBookMenu ? <i className="fas fa-angle-down right"></i> :
                                                <i className="fas fa-angle-left right"></i>
                                        }
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview" style={{ "display": showBookMenu ? "block" : "none" }}>
                                    <li className="nav-item">
                                        <Link to="/dashboard/books" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>All Books</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/books/addbook" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Add Book</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link
                                    onClick={(e) => toggleCatMenu(e)}
                                    className="nav-link">

                                    <i className="nav-icon fa fa-object-group" aria-hidden="true"></i>
                                    <p>
                                        Category
                                        {
                                            showCatMenu ? <i className="fas fa-angle-down right"></i> :
                                                <i className="fas fa-angle-left right"></i>
                                        }

                                    </p>
                                </Link>
                                <ul className="nav nav-treeview" style={{ "display": showCatMenu ? "block" : "none" }}>
                                    <li className="nav-item">
                                        <Link to="/dashboard/categories" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>All Categories</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/categories/addcategory" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Add Category</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link to="/dashboard/inbox" className="nav-link">
                                    <i className="nav-icon far fa-envelope"></i>
                                    <p>
                                        Mailbox
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/dashboard/orders" className="nav-link">
                                <i class="nav-icon fa fa-money" aria-hidden="true"></i>
                                    <p>
                                        Orders
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-item my-5">
                                <Link onClick={() => setUserToken(null)}
                                    className="nav-link">
                                    <i className="fa fa-arrow-left mx-2" aria-hidden="true"></i>
                                    <p>
                                        LOG OUT
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* <!-- /.sidebar-menu --> */}
                </div>
                {/* <!-- /.sidebar --> */}
            </aside>
        </>
    )
}
export default Sidebar;