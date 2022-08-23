import { createSlice } from "@reduxjs/toolkit";

let initialState = localStorage.getItem("flipkartCart") !== null ? JSON.parse(localStorage.getItem("flipkartCart")) : {
    products: [],
    totalAmount: 0,
    discountAmount: 0,
    originalAmount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        add: (state, action) => {
            state.totalAmount += action.payload.product.price;
            const orginalPrice = action.payload.product.price * 100 / (100 - action.payload.product.discount);
            state.originalAmount += orginalPrice;
            state.discountAmount += orginalPrice - action.payload.product.price;
            const existingCartItemIndex = state.products.findIndex(item => item._id === action.payload.product._id);
            const existingCartItem = state.products[existingCartItemIndex];
            if (existingCartItem) {
                state.products[existingCartItemIndex].quantity++;
            }
            else {
                state.products.push({ ...action.payload.product, quantity: 1 });
            }
            localStorage.setItem("flipkartCart", JSON.stringify(state));
        },
        subtract: (state, action) => {
            state.totalAmount -= action.payload.product.price;
            const orginalPrice = action.payload.product.price * 100 / (100 - action.payload.product.discount);
            state.originalAmount -= orginalPrice;
            state.discountAmount -= orginalPrice - action.payload.product.price;
            const existingCartItemIndex = state.products.findIndex(item => item._id === action.payload.product._id);
            state.products[existingCartItemIndex].quantity--;
            localStorage.setItem("flipkartCart", JSON.stringify(state));
        },
        remove: (state, action) => {
            state.totalAmount -= action.payload.product.quantity * action.payload.product.price;
            const orginalPrice = action.payload.product.price * 100 / (100 - action.payload.product.discount);
            state.originalAmount -= orginalPrice * action.payload.product.quantity;
            state.discountAmount -= (orginalPrice - action.payload.product.price) * action.payload.product.quantity;
            state.products = state.products.filter((item) => item._id !== action.payload.product._id);
            localStorage.setItem("flipkartCart", JSON.stringify(state));
        },
        setCart: (state) => {
            state.products = [];
            state.totalAmount = 0;
            state.discountAmount = 0;
            state.originalAmount = 0;
            localStorage.setItem("flipkartCart", JSON.stringify(state));
        }
    }
});

export const { add, subtract, remove, setCart } = cartSlice.actions;

export default cartSlice.reducer;