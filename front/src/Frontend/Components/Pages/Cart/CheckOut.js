import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from "../../../../Dashboard/Components/Pages/PaymentForm";

// const ShippingField = ({ shippingDetail }) => {



//     const changedValue = (e) => {

//     }

//     return (
//         <>

//             <label className="small text-muted mb-1">First Name</label>
//             <input name="shippingFirstName" onChange={changedValue} type="text" className="form-control form-control-sm"
//                 id="NAME" aria-describedby="helpId" />

//             <label className="small text-muted mb-1">Last Name</label>
//             <input name="shippingLastName" onChange={changedValue} type="text" className="form-control form-control-sm"
//                 id="NAME" aria-describedby="helpId" />

//             <label className="small text-muted mb-1">House/Flat Number & Street
//                 Name</label>
//             <input onChange={changedValue} type="text" className="form-control form-control-sm" name="shippingAddress"
//                 id="NAME" aria-describedby="helpId" />

//             <label className="small text-muted mb-1">Land-Mark</label>
//             <input onChange={changedValue} type="text" className="form-control form-control-sm" name="shippingLandmark"
//                 id="NAME" aria-describedby="helpId" />

//             <div className="row no-gutters">
//                 <div className="form-group">
//                     <label className="small text-muted mb-1">City</label>
//                     <input onChange={changedValue} type="text" className="form-control form-control-sm" name="shippingCity"
//                         id="NAME" aria-describedby="helpId" />
//                 </div>

//                 <div className="form-group">
//                     <label className="small text-muted mb-1">Pin-code</label>
//                     <input onChange={changedValue} type="text" className="form-control form-control-sm" name="shippingPinCode"
//                         id="NAME" aria-describedby="helpId" />
//                 </div>

//                 <div className="form-group mx-auto">
//                     <label className="small text-muted mb-1">State</label>
//                     <input onChange={changedValue} type="text" className="form-control form-control-sm" name="shippingState"
//                         id="NAME" aria-describedby="helpId" />
//                 </div>
//             </div>
//             <label className="small text-muted mb-1">Phone No.</label>
//             <input onChange={changedValue} type="text" className="form-control form-control-sm" name="shippingPhoneNo"
//                 id="NAME" aria-describedby="helpId" />

//         </>
//     )
// }

const CheckOut = () => {

    const [Razorpay] = useRazorpay();
    const navigate = useNavigate()
    const [shippingToggle, setShippingToggle] = useState(false);
    const cartList = useSelector((state) => state.cart);
    const [billingDetails, setBillingDetails] = useState({});
    const [shippingDetails, setShippingDetails] = useState({});
    const cartTotal = useSelector((state) => state.cart.reduce((acc, cur) => acc + parseInt(cur.qty * cur.price), 0));

    const [cartTax, setCartTax] = useState(null);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const [delivCharge, setDelivCharge] = useState(20);
    const [loader, setLoader] = useState(false);


    const changedValue = (e) => {
        setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });

    }
    const changedShippingValue = (e) => {
        setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
    }

    // Verify RazorPay payment
    const initPayment = (data, order_id) => {
        const options = {
            key: "rzp_test_GJ0bndQHuqv7QU",
            amount: data.amount,
            currency: data.currency,
            name: cartList.name,
            description: "Test Transaction",
            image: cartList.coverImage,
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifyUrl = "http://localhost:4000/razor-payment/verify";
                    const { data } = await axios.post(verifyUrl, {...response, order_id});
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.on("payment.success", function (response) {
            window.alert("success");
        })
        rzp1.open();
        // updatePaymentStatus(order_id);
        navigate('/order-success');
    };

    // const updatePaymentStatus = async (order_id)=>{
    //     const data = await axios.post(`http://localhost:4000/orders/paymentStatusUpdate`, {order_id});
    //     console.log(data, "payment status");

    // }

    const submitForm = async (e) => {
        e.preventDefault();
        setLoader(true);
        let orderData = { billingData: billingDetails, shippingData: shippingDetails, cartData: cartList, order_total: cartSubTotal };
        console.log(orderData);
        const response = await axios.post("http://localhost:4000/orders/neworder", orderData);
        const data = response.data;
        const order_id = data.newOrderData._id;
        console.log(order_id, "xxx");
        if (data) {
            setLoader(false);
            // Initiate RazorPay Payment
            try {
                const orderUrl = "http://localhost:4000/razor-payment/orders";
                const { data } = await axios.post(orderUrl, { amount: cartSubTotal });
                console.log(data);
                initPayment(data.data, order_id);
            } catch (error) {
                console.log(error);
            }
        };
    }

    // Make sure to call `loadStripe` outsideu of a component’s render to avoid
    // recreating the `Stripe` object on every render.
    // const stripePromise = loadStripe('pk_test_51OCKcnSDU5t4Ug5wTU8Q149707OMgFbwBqPD0368AIYdzqVTm6d6zbL7zWUhw6wWloxnoKnHtuU2MXrLM66PsmEo00jB9Qj3dO');

    // async function initialize() {



    //     const response = await fetch("http://localhost:4000/payment/create", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ product: cartList }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setClientSecret(data.id);
    //             console.log(data, "response");
    //         });
    // }

    useEffect(() => {
        // calculateSubtotal();
        console.log(cartList, "items");
        const tax = 8 / 100;
        const taxAmount = cartTotal * tax;
        setCartTax(taxAmount);
        console.log(cartTax, "total price");

        if (cartTotal >= 500 || cartTotal == 0) {
            setDelivCharge(0);
            let subTotal = cartTotal + taxAmount;
            setCartSubTotal(subTotal);

        } else if (cartTotal < 500 && cartTotal != 0) {
            setDelivCharge(20);
            let subTotal = cartTotal + taxAmount + delivCharge;
            setCartSubTotal(subTotal);
        }
        // Create PaymentIntent as soon as the page loads
        // initialize();

    }, [cartSubTotal]);

    // const appearance = {
    //     theme: 'stripe',
    // };
    // const options = {
    //     clientSecret,
    //     appearance
    // };


    return (
        <>
            <div class="loading-overlay"
                style={loader ? { display: "flex" } : { display: "none" }}>
                <div class="loading-spinner"></div>
            </div>
            <div className=" container-fluid my-5">
                <div className="row justify-content-center ">
                    <div className="col-xl-10">
                        <form onSubmit={submitForm}>
                            <div className="card shadow-lg ">
                                <h2 className="card-title space text-center my-4">Checkout</h2>
                                <div className="row justify-content-around">
                                    <div className="col-md-5">
                                        <div className="card border-0">
                                            <div className="card-header pb-0">
                                                <p className="card-text text-muted mt-4  space">BILLING DETAILS</p>
                                                <hr className="my-0" />
                                            </div>
                                            <div className="card-body">
                                                <div className="row flex-column justify-content-between">
                                                    <div className="col-auto mt-0">

                                                        <input name="billingCustomerId" value="" type="hidden" className="form-control form-control-sm"
                                                            id="NAME" aria-describedby="helpId" />

                                                        <label className="small text-muted mb-1">First Name</label>
                                                        <input name="billingFirstName" onChange={changedValue} type="text" className="form-control form-control-sm"
                                                            id="NAME" aria-describedby="helpId" />

                                                        <label className="small text-muted mb-1">Last Name</label>
                                                        <input name="billingLastName" onChange={changedValue} type="text" className="form-control form-control-sm"
                                                            id="NAME" aria-describedby="helpId" />

                                                        <label className="small text-muted mb-1">Email Id</label>
                                                        <input name="billingEmailId" onChange={changedValue} type="text" className="form-control form-control-sm"
                                                            id="NAME" aria-describedby="helpId" />

                                                        <label className="small text-muted mb-1">House/Flat Number & Street
                                                            Name</label>
                                                        <input name="billingAddress" onChange={changedValue} type="text" className="form-control form-control-sm"
                                                            id="NAME" aria-describedby="helpId" />

                                                        <label className="small text-muted mb-1">Land-Mark</label>
                                                        <input name="billingLandmark" onChange={changedValue} type="text" className="form-control form-control-sm"
                                                            id="NAME" aria-describedby="helpId" />

                                                        <div className="row no-gutters">
                                                            <div className="form-group">
                                                                <label className="small text-muted mb-1">City</label>
                                                                <input name="billingCity" onChange={changedValue} type="text" className="form-control form-control-sm"
                                                                    id="NAME" aria-describedby="helpId" />
                                                            </div>

                                                            <div className="form-group">
                                                                <label className="small text-muted mb-1">Pin-code</label>
                                                                <input name="billingPinCode" onChange={changedValue} type="text" className="form-control form-control-sm"
                                                                    id="NAME" aria-describedby="helpId" />
                                                            </div>

                                                            <div className="form-group mx-auto">
                                                                <label className="small text-muted mb-1">State</label>
                                                                <input name="billingState" onChange={changedValue} type="text" className="form-control form-control-sm"
                                                                    id="NAME" aria-describedby="helpId" />
                                                            </div>
                                                        </div>
                                                        <label className="small text-muted mb-1">Phone No.</label>
                                                        <input name="billingPhoneNo" onChange={changedValue} type="text" className="form-control form-control-sm"
                                                            id="NAME" aria-describedby="helpId" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="card border-0 ">

                                            <div className="row flex-column justify-content-between">
                                                <div className="col-auto mt-0">
                                                    <div className="card-header pb-0">
                                                        <p className="card-text text-muted mt-4  space">SHIPPING DETAILS</p>
                                                        <hr className="my-0" />
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="d-flex my-2">
                                                            <input type="checkbox"
                                                                onChange={() => setShippingToggle(!shippingToggle)}></input><p className="mx-2">Ship to a different address?</p>
                                                        </div>

                                                        <div style={{ "display": shippingToggle ? "block" : "none" }} >
                                                            <label className="small text-muted mb-1">First Name</label>
                                                            <input name="shippingFirstName" onChange={changedShippingValue} type="text" className="form-control form-control-sm"
                                                                id="NAME" aria-describedby="helpId" />

                                                            <label className="small text-muted mb-1">Last Name</label>
                                                            <input name="shippingLastName" onChange={changedShippingValue} type="text" className="form-control form-control-sm"
                                                                id="NAME" aria-describedby="helpId" />

                                                            <label className="small text-muted mb-1">House/Flat Number & Street
                                                                Name</label>
                                                            <input onChange={changedShippingValue} type="text" className="form-control form-control-sm" name="shippingAddress"
                                                                id="NAME" aria-describedby="helpId" />

                                                            <label className="small text-muted mb-1">Land-Mark</label>
                                                            <input onChange={changedShippingValue} type="text" className="form-control form-control-sm" name="shippingLandmark"
                                                                id="NAME" aria-describedby="helpId" />

                                                            <div className="row no-gutters">
                                                                <div className="form-group">
                                                                    <label className="small text-muted mb-1">City</label>
                                                                    <input onChange={changedShippingValue} type="text" className="form-control form-control-sm" name="shippingCity"
                                                                        id="NAME" aria-describedby="helpId" />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label className="small text-muted mb-1">Pin-code</label>
                                                                    <input onChange={changedShippingValue} type="text" className="form-control form-control-sm" name="shippingPinCode"
                                                                        id="NAME" aria-describedby="helpId" />
                                                                </div>

                                                                <div className="form-group mx-auto">
                                                                    <label className="small text-muted mb-1">State</label>
                                                                    <input onChange={changedShippingValue} type="text" className="form-control form-control-sm" name="shippingState"
                                                                        id="NAME" aria-describedby="helpId" />
                                                                </div>
                                                            </div>
                                                            <label className="small text-muted mb-1">Phone No.</label>
                                                            <input onChange={changedShippingValue} type="text" className="form-control form-control-sm" name="shippingPhoneNo"
                                                                id="NAME" aria-describedby="helpId" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="card-header card-2">
                                                <p className="card-text text-muted mt-md-4  mb-2 space">YOUR ORDER </p>
                                                <hr className="my-2" />
                                            </div>
                                            {
                                                cartList?.map((product, index) => (
                                                    <div key={index} className="card-body pt-0">
                                                        <div className="row  justify-content-between">
                                                            <div className="col-auto col-md-7">
                                                                <div className="media flex-column flex-sm-row">
                                                                    <div className=" img-fluid">{(product.coverImage) ?
                                                                        <img
                                                                            height={100}
                                                                            width={70}
                                                                            src={`${process.env.REACT_APP_API_URL}/${product.coverImage.replace('public', '')}`}
                                                                        /> :
                                                                        <img
                                                                            height={100}
                                                                            width={70}
                                                                            src={`/dummy-image-square.jpg`} />}
                                                                    </div>
                                                                    <div className="media-body mx-3 my-auto">
                                                                        <div className="row ">
                                                                            <div className="col-auto">
                                                                                <p className="mb-0"><b>{product.name}</b></p><small
                                                                                    className="text-muted">by {product.author}</small>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className=" pl-0 flex-sm-col col-auto  my-auto">
                                                                <p className="boxed-1">{product.qty}</p>
                                                            </div>
                                                            <div className=" pl-0 flex-sm-col col-auto  my-auto ">
                                                                <p><b>$ {product.qty * product.price}</b></p>
                                                            </div>
                                                        </div>
                                                        <hr className="my-2" />
                                                    </div>
                                                ))
                                            }
                                            <hr className="my-2" />
                                            <div className="row">
                                                <div className="col">
                                                    <div className="row justify-content-between">
                                                        <div className="col-4 mx-2">
                                                            <p className="mb-1"><b>Subtotal</b></p>
                                                        </div>
                                                        <div className="flex-sm-col col-auto mx-3">
                                                            <p className="mb-1"><b>$ {cartTotal}</b></p>
                                                        </div>
                                                    </div>
                                                    <div className="row justify-content-between">
                                                        <div className="col mx-2">
                                                            <p className="mb-1"><b>Shipping + Tax</b></p>
                                                        </div>
                                                        <div className="flex-sm-col col-auto mx-3">
                                                            <p className="mb-1"><b>$ {cartTax + delivCharge}</b></p>
                                                        </div>
                                                    </div>
                                                    <hr className="my-2" />
                                                    <div className="row justify-content-between text-bold">
                                                        <div className="col-4 mx-2">
                                                            <p><b>Total</b></p>
                                                        </div>
                                                        <div className="flex-sm-col col-auto mx-3">
                                                            <p className="mb-1"><b>$ {cartSubTotal}</b></p>
                                                        </div>
                                                    </div>
                                                    <hr className="my-0" />
                                                    <div className="mx-2">
                                                        <div className="row mt-4">
                                                            <div className="col">
                                                                <hr className="mt-0" />
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn-primary">Proceed to payment</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckOut;