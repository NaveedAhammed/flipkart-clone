import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import fetchReducer from "./fetchRedux";
import userReducer from "./userRedux";

export default configureStore({
    reducer: {
        user: userReducer,
        fetch: fetchReducer,
        cart: cartReducer
    }
})