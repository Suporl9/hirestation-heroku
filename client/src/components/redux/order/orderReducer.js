import {
  CLEAR_ORDER_ERROR,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ADMIN_ORDERS_CLEAR_ERRORS,
  GET_ADMIN_ORDERS_ERROR,
  GET_ADMIN_ORDERS_REQUEST,
  GET_ADMIN_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_CLEAR_ERROR,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_SUCCESS,
} from "../constants/Constants";

const initialState = {
  loading: false,
  orders: [],
  error: "",
  order: {},
  adminOrders: [],
  orderDetails: {},
};

export const newOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload.order,
      };

    case CREATE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload.response.data.message,
      };

    case CLEAR_ORDER_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getMyOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };

    case GET_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.message,
      };

    case CLEAR_ORDER_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getAdminOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ADMIN_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        adminOrders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };

    case GET_ADMIN_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.message,
      };

    case GET_ADMIN_ORDERS_CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const updateOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };

    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.message,
      };

    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_ORDER_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: action.payload.order,
      };

    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.message,
      };
    default:
      return state;
  }
};
