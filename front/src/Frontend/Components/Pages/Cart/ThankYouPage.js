import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../../../Feature/CartSlice";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
    const dispatch = useDispatch();
    const refreshCart = () => {
        dispatch(emptyCart());
    }
    useEffect(()=>{
        refreshCart();
    }, []);

    return (
        <>
        <div className="thanks_pageStyle">
            <h1>Thank you for your order. Enjoy reading.</h1>
        </div>
        <div className="my-5 text-center">
            <Link to="/">Continue Shopping</Link>
        </div>
        </>
    )
}

export default ThankYouPage;