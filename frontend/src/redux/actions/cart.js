import { addToCart, removeFromCart } from "../reducers/cart";

// add to cart
export const addCartItem = (data) => async (dispatch, getState) => {
  dispatch(addToCart(data));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

// remove from cart
export const removeCartItem = (data) => async (dispatch, getState) => {
  dispatch(removeFromCart(data._id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};
