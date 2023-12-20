import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  selectedItemId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
      state.selectedItemId = action.payload._id;
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item._id === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.price;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item._id === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.price;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
    resetSelectedItemId(state) {
      state.selectedItemId = null;
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  resetSelectedItemId,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getSelectedItemId = (state) => state.cart.selectedItemId;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item._id === id)?.quantity ?? 0;
