import React, { useState, useEffect } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from "react-redux";
import CheckoutForm from "../../../../Dashboard/Components/Pages/PaymentForm";

const FormPay = () => {
  const stripePromise = loadStripe('pk_test_51OCKcnSDU5t4Ug5wTU8Q149707OMgFbwBqPD0368AIYdzqVTm6d6zbL7zWUhw6wWloxnoKnHtuU2MXrLM66PsmEo00jB9Qj3dO');

  const cartTotal = useSelector((state) => state.cart.reduce((acc, cur) => acc + parseInt(cur.qty * cur.price), 0));
  const [clientSecret, setClientSecret] = useState("");
  const [cartTax, setCartTax] = useState(null);
  const [cartSubTotal, setCartSubTotal] = useState(null);
  const [delivCharge, setDelivCharge] = useState(20);
 


  useEffect(() => {
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
    fetch("http://localhost:4000/payment/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: cartSubTotal, currency: "USD" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.clientSecret, "response");
        const dataRes = data.clientSecret;
        setClientSecret(dataRes);
      })

  }, [cartSubTotal]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance
  };



  return (
    <>
      <div className="payForm">
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
      <div className="my-4"><h4>Total Billing Amount: ${cartSubTotal}</h4></div>
    </>


  );
};

export default FormPay;