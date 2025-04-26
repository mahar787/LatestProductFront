import { configureStore } from "@reduxjs/toolkit";
import cardCheckoutReducer from "../redux/slices/cardCheckoutSlice.js";
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("reduxCart");
    return data ? JSON.parse(data) : undefined;
  } catch (e) {
    return undefined;
  }
};

const saveToLocalStorage = (state) => {
  try {
    const data = JSON.stringify(state.cardCheckout);
    localStorage.setItem("reduxCart", data);
  } catch (e) {
    console.log("Saving failed");
  }
};
export const store = configureStore({
  reducer: {
    cardCheckout: cardCheckoutReducer,
  },
  preloadedState: {
    cardCheckout: loadFromLocalStorage(),
  },
});
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
