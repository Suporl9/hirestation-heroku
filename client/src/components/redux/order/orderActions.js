import axios from "axios";
import {
  CLEAR_ORDER_ERROR,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ADMIN_ORDERS_ERROR,
  GET_ADMIN_ORDERS_REQUEST,
  GET_ADMIN_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "../constants/Constants";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios
      .post("/order/new", order, config)
      .then((resp) => resp.data);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error,
    });
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERS_REQUEST });

    const data = await axios.get("/order/me").then((resp) => resp.data);

    dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ORDERS_FAIL, payload: error });
  }
};

export const getAdminOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ADMIN_ORDERS_REQUEST });

    const { data } = await axios.get("/order/myOrders");

    dispatch({ type: GET_ADMIN_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ADMIN_ORDERS_ERROR, payload: error });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/order/${id}`);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error });
  }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/order/myOrders/${id}`,
      orderData,
      config
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAIL, payload: error });
  }
};

export const clearOrderError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ORDER_ERROR });
};
