import { createContext, useState } from "react";


export const AddToCartContext = createContext();

export const AddToCartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);
    const [totallCartItems, setTotalCartItems] = useState(0);

    const manageCart = (product, qty) => {

        const exist = cartItems.find((x) => x._id === product._id);

    // cartItems.includes(product._id) ? console.log("yes") : console.log("no");
    // cartItems.indexOf(product._id) > -1 ? console.log("yes") : console.log("no");

    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + qty } : x
        )
      )
    } else {
      setCartItems([...cartItems, { ...product, qty }]);
    }
        let total = cartItems.reduce((acc, cur) => acc + parseInt(cur.qty), 0)
        setTotalCartItems(total)
    }

    return (
        <AddToCartContext.Provider value={{ cartItems, totallCartItems, manageCart }}>
            {children}
        </AddToCartContext.Provider>
    )
}