import axios from "axios";
import {
  ADD_TO_CART_ERROR,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  // ADD_TO_CART,
  CART_ITEMS_ERROR,
  CART_ITEMS_REQUEST,
  CART_ITEMS_SUCCESS,
  DELETE_CART_ITEMS_ERROR,
  DELETE_CART_ITEMS_REQUEST,
  DELETE_CART_ITEMS_SUCCESS,
  GET_ITEM_SESSION_STORAGE,
  GET_ORDER_INFO_SESSION_STORAGE,
  SAVE_ITEM_SESSION_STORAGE,
  SAVE_ORDER_INFO,
} from "../constants/Constants";

export const getCartItems = () => async (dispatch) => {
  try {
    dispatch({ type: CART_ITEMS_REQUEST });

    const data = await axios
      .get("/cart/getMyCartItems")
      .then((resp) => resp.data);

    // console.log(data);

    dispatch({ type: CART_ITEMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CART_ITEMS_ERROR, payload: error });
  }
};

export const deleteCartItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CART_ITEMS_REQUEST });

    const data = await axios
      .delete(`/cart/deleteCartItem/${id}`)
      .then((resp) => resp.data);

    dispatch({ type: DELETE_CART_ITEMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_CART_ITEMS_ERROR, payload: error });
  }
};

export const addItemToCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });

    const data = await axios.post(`/cart/new/${id}`).then((resp) => resp.data);
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_TO_CART_ERROR, payload: error });
  }
};

export const saveOrderInfo = (userData) => async (dispatch) => {
  dispatch({ type: SAVE_ORDER_INFO, payload: userData });

  sessionStorage.setItem("orderInfo", JSON.stringify(userData));
};

export const addCartItemSession = (itemData) => async (dispatch) => {
  dispatch({ type: SAVE_ITEM_SESSION_STORAGE, payload: itemData });

  sessionStorage.setItem("cartItem", JSON.stringify(itemData));
};
export const getCartItetmSession = () => async (dispatch) => {
  const data = sessionStorage.getItem("cartItem");
  const newData = JSON.parse(data);
  dispatch({ type: GET_ITEM_SESSION_STORAGE, payload: newData });
};
export const getOrderInfoSession = () => async (dispatch) => {
  const data = sessionStorage.getItem("orderInfo");
  const newData = JSON.parse(data);
  dispatch({ type: GET_ORDER_INFO_SESSION_STORAGE, payload: newData });
};
// export const addItemToCart = (id) => async (dispatch) => {
//   const data = await axios
//     .get(`/services/${id}`)
//     .then((response) => response.data);

//   dispatch({
//     type: ADD_TO_CART,
//     payload: {
//       service: data.getService._id,
//       title: data.getService.title,
//       price: data.getService.price,
//       image: data.getService.images[0].url,
//     },
//   });

//   localStorage.setItem("cartItems", JSON.stringify());
// };
