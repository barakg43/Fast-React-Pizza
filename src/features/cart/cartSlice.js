import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const itemInCart = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      if (itemInCart === undefined) {
        state.cart.push(action.payload);
      } else {
        itemInCart.quantity++;
        itemInCart.totalPrice = itemInCart.quantity * itemInCart.unitPrice;
      }
    },
    deleteItemFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    incrementItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decrementItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItemFromCart(state, action);
      }
    },
    clearCart(state) {
      console.log(state.cart);
      state.cart = [];
    },
  },
});

export const {
  addItemToCart,
  deleteItemFromCart,
  decrementItemQuantity,
  incrementItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
export const getCart = (state) => state.cart.cart;
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
