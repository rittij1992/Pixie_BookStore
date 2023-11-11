import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate()
    const [shippingToggle, setShippingToggle] = useState(false);
    const cartList = useSelector((state) => state.cart);
    const [billingDetails, setBillingDetails] = useState({});
    const [shippingDetails, setShippingDetails] = useState({});
    const cartTotal = useSelector((state) => state.cart.reduce((acc, cur) => acc + parseInt(cur.qty * cur.price), 0));
    const [cartTax, setCartTax] = useState(0);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const [delivCharge, setDelivCharge] = useState(20);
    const [loader, setLoader] = useState(false);


    const changedValue = (e) => {
        setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });

    }
    const changedShippingValue = (e) => {
        setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
    }
    const submitForm = async (e) => {
        e.preventDefault();
        setLoader(true);
        let orderData = { billingData: billingDetails, shippingData: shippingDetails, cartData: cartList, order_total: cartSubTotal };
        console.log(orderData);
        const response = await axios.post("http://localhost:4000/orders/neworder", orderData);
        const data = response.data;
        // console.log(data);
        if(data){
            setLoader(false);
            navigate("/order-success");
        }
    }

    const calculateSubtotal = () => {

        const tax = 8 / 100;
        const taxAmount = cartTotal * tax;
        setCartTax(taxAmount);

        if (cartTotal >= 500 || cartTotal == 0) {
            setDelivCharge(0);
            let subTotal = cartTotal + taxAmount;
            setCartSubTotal(subTotal);

        } else if (cartTotal < 500 && cartTotal != 0) {
            setDelivCharge(20);
            let subTotal = cartTotal + taxAmount + delivCharge;
            setCartSubTotal(subTotal);
        }

    }
    useEffect(() => {
        calculateSubtotal();
    }, [cartTotal])


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

                                                <div className="row mt-4">
                                                    <div className="col">
                                                        <p className="text-muted mb-2">PAYMENT DETAILS</p>
                                                        <hr className="mt-0" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="small text-muted mb-1">NAME ON CARD</label>
                                                    <input type="text" className="form-control form-control-sm" name="NAME" id="NAME"
                                                        aria-describedby="helpId" placeholder="Name Surname" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="small text-muted mb-1">CARD NUMBER</label>
                                                    <input type="text" className="form-control form-control-sm" name="NAME" id="NAME"
                                                        aria-describedby="helpId" placeholder="4534 5555 5555 5555" />
                                                </div>
                                                <div className="row no-gutters">
                                                    <div className="col-sm-6 pr-sm-2">
                                                        <div className="form-group">
                                                            <label className="small text-muted mb-1">VALID
                                                                THROUGH</label>
                                                            <input type="text" className="form-control form-control-sm" name="NAME"
                                                                id="NAME" aria-describedby="helpId" placeholder="06/21" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label className="small text-muted mb-1">CVC CODE</label>
                                                            <input type="text" className="form-control form-control-sm" name="NAME"
                                                                id="NAME" aria-describedby="helpId" placeholder="183" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-md-5">
                                                    <div className="col">
                                                        <button type="submit" className="btn btn-lg btn-block btn-primary ">PURCHASE
                                                            $37 SEK</button>
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