import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addBookToCart: (state, action) => {
            const data = action.payload;
            console.log(data, "redux payload");
            const exist = state.find((x) => x._id === data._id)
            if (exist) {
                // exist.qty += 1;
                exist.qty = data.qty;
            } else {
                state.push(data);
            }
        },
        deleteCartItem: (state, action) => {
            const item = action.payload;
            return  state.filter((x) => x._id != item._id);
        },
        emptyCart: (state) => {
            return state = [];
        }
    }
})

export const { addBookToCart, deleteCartItem, emptyCart } = CartSlice.actions;
export default CartSlice.reducer;