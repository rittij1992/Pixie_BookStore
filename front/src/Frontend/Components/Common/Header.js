import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AddToCartContext } from "../../../ContextAPI/AddToCartContext";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { addToCart, emptyCart } from "../../../Feature/CartSlice";

const Header = () => {

    const cart = useSelector((state) => state.cart);
    const cartCount = useSelector((state) => state.cart.reduce((acc, cur) => acc + parseInt(cur.qty), 0));

    console.log(cart, cartCount, "xyz")

    // const { totallCartItems } = useContext(AddToCartContext)
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top my-2">
                <div className="container">
                    <a className="navbar-brand" href="#"><img src="assets/images/header-logo.png" alt="" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse header" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className="nav-link">
                                    Home
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products" className="nav-link">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/about"}>About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/contact"}>Contact Us</Link>
                            </li>
                            <li>
                                <Link to="/cart" className="nav-link">
                                    Cart
                                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                    <span className="cartNotification">
                                        {cartCount}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;