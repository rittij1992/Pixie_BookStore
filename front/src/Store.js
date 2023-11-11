import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Feature/CartSlice";

const store = configureStore(
    {
        reducer: {
            cart: cartReducer
        }
    }
)

export default store;