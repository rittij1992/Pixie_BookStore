import { useContext, useEffect, useState } from "react";
// import { AddToCartContext } from "../../../../ContextAPI/AddToCartContext";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addBookToCart, deleteCartItem, emptyCart } from "../../../../Feature/CartSlice";

const CartPage = () => {
    ;
    // const { cartItems, totallCartItems } = useContext(AddToCartContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(cartItems)
    const cartList = useSelector((state) => state.cart);
    const cartTotal = useSelector((state) => state.cart.reduce((acc, cur) => acc + parseInt(cur.qty * cur.price), 0));
    const [cartTax, setCartTax] = useState(0);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const [delivCharge, setDelivCharge] = useState(20);


    const calculateSubtotal = () => {

        const tax = 8 / 100;
        const taxAmount = cartTotal * tax;
        setCartTax(taxAmount);
        
        if ( cartTotal >=500 || cartTotal == 0 ) {
            setDelivCharge(0);
            let subTotal = cartTotal + taxAmount;
            setCartSubTotal(subTotal);

        } else if( cartTotal < 500 && cartTotal != 0 ){
            setDelivCharge(20);
            let subTotal = cartTotal + taxAmount + delivCharge;
            setCartSubTotal(subTotal); 
        }
        
    }
    useEffect(() => {
        calculateSubtotal();
        console.log(delivCharge);
        console.log(cartList);
    }, [cartTotal])

    const changeQty = (e, product) => {
        dispatch(addBookToCart({ ...product, qty: e.target.value }))
    }

    const deleteItem = (e, product) => {
        e.preventDefault();
        dispatch(deleteCartItem(product))
    }

    const deleteCart = (e) => {
        e.preventDefault();
        dispatch(emptyCart());
    }

    const checkout = (e)=>{
        e.preventDefault();
        navigate('/checkout') 
        // if(cartTotal === 0){
            
        //  }else{
        //     window.alert("cart empty");
        //  }
    }

    

    return (
        <>
            <div className="row my-5">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Check Out Table</h3>
                        </div>

                        {/* <!-- /.card-header --> */}
                        <div className="card-body table-responsive p-0">
                            <table className="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th>Book Cover</th>
                                        <th>Book Name</th>
                                        <th>Quantity</th>
                                        <th>Price/Unit</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartList?.map((product, index) => (
                                            <tr key={index}>
                                                <td>{(product.coverImage) ?
                                                    <img
                                                        height={100}
                                                        width={70}
                                                        src={`${process.env.REACT_APP_API_URL}/${product.coverImage.replace('public', '')}`} />
                                                    :
                                                    <img
                                                        height={100}
                                                        width={70}
                                                        src={`/dummy-image-square.jpg`} />}</td>
                                                <td>{product.name}</td>
                                                <td><input className="mx-2" style={{ width: 50}} value={product.qty} onChange={(e) => changeQty(e, product)} type="number" ></input></td>
                                                <td>${product.price}</td>
                                                <td>${product.qty * product.price}</td>
                                                <td><Link
                                                    onClick={(e) => deleteItem(e, product)}
                                                    className="mx-2 text-danger">
                                                    Delete/Remove From Cart
                                                </Link></td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                        {/* <!-- /.card-body --> */}
                    </div>
                    {/* <!-- /.card --> */}
                </div>
            </div>
            {/* <!-- /.row --> */}
            <div>
                <button
                    type="submit"
                    className="btn btn-primary mx-2"
                    onClick={(e) => deleteCart(e)}>Empty Cart</button>
            </div>
            <div className="text-end mx-3 flex">
                <h5>Cart Price - ${cartTotal}</h5>
                <h5>Delivery Charge - ${delivCharge}</h5>
                <p>**(No delivery charge above $500)</p>
                <h5>Tax - ${cartTax}</h5>
                <p>--------------------------------------</p>
                <h4>Total Price - ${cartSubTotal}</h4>
                <div className="my-4">
                    <button onClick={(e)=>checkout(e)} type="submit" className="btn btn-primary">Check Out</button>
                </div>
            </div>
        </>
    )
}

export default CartPage;