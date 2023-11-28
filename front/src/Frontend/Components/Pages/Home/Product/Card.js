import axios from "axios";
import { useState } from "react";
// import { AddToCartContext } from "../../../../../ContextAPI/AddToCartContext";
import { useDispatch } from "react-redux";
import { addBookToCart } from "../../../../../Feature/CartSlice";

const Card = ({ product, gridColumb }) => {
    const dispatch = useDispatch();
    // const {manageCart} = useContext(AddToCartContext)
    const gridClass = "my-5 item new col-md-" + gridColumb;
    const gridClass1 = "col-md-" + gridColumb;
    const [qty, setQty] = useState(1)

    const addToCart1 = (product) => {
        // manageCart(product, qty)
        dispatch(addBookToCart({ ...product, qty }))
    }

    const changeQty = (e) => {
        setQty(e.target.value)
    }


    return (

        <>
            <div className="mx-4">
                <div className={gridClass}>
                    {
                        (product.coverImage) ?
                            <img height={300} width={200} src={`${process.env.REACT_APP_API_URL}/${product.coverImage.replace('public', '')}`} /> :
                            <img height={300} width={200} src={`/dummy-image-square.jpg`} />
                    }
                </div>
                <div >
                    <h4>{product.name}</h4>
                    <h6>${product.price}</h6>
                    <div className="d-flex my-2">
                        <button className="btn btn-primary" onClick={() => addToCart1(product)}>Add To Cart</button>
                        <button className="mx-2 btn btn-primary">View Book</button>
                    </div>
                    <label>Quantity:&nbsp;</label>
                    <input className="mx-2" style={{ width: 130 }} value={qty} onChange={(e) => changeQty(e)} type="number" ></input>
                </div>
            </div>
        </>
    )
}

export default Card;