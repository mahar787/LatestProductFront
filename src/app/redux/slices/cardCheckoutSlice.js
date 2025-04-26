import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  address: null,
  paymentMethod: null,
  cartItems: null,
  deliveryCharges: null,
  totalAmount: null,
};

const cardCheckoutSlice = createSlice({
  name: "cardCheckout",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    addToCart: (state, action) => {
      // state.cartItems.push(action.payload);
      state.cartItems = action.payload;
    },
    setDeliveryCharge: (state, action) => {
      state.deliveryCharges = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    resetCart: () => initialState,
  },
});

export const {
  setAddress,
  setPaymentMethod,
  addToCart,
  setDeliveryCharge,
  setTotalAmount,
} = cardCheckoutSlice.actions;
export default cardCheckoutSlice.reducer;
