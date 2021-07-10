import {
  ADD_TO_CART_ERROR,
  ADD_TO_CART_ISADDED_RESET,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  CART_ITEMS_ERROR,
  CART_ITEMS_REQUEST,
  CART_ITEMS_SUCCESS,
  CLEAR_MESSAGE,
  DELETE_CART_ITEMS_ERROR,
  DELETE_CART_ITEMS_REQUEST,
  DELETE_CART_ITEMS_SUCCESS,
  GET_ITEM_SESSION_STORAGE,
  GET_ORDER_INFO_SESSION_STORAGE,
  SAVE_ITEM_SESSION_STORAGE,
  SAVE_ORDER_INFO,
} from "../constants/Constants";

const initialState = {
  // cartItem: {},
  // cartItemsCount: "",
  orderInfo: {},
  cartItems: [],
  loading: false,
  error: null,
};

export const getCartItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SAVE_ITEM_SESSION_STORAGE:
      return {
        ...state,
        cartItem: action.payload,
      };
    case GET_ORDER_INFO_SESSION_STORAGE:
      return {
        ...state,
        orderInfo: action.payload,
      };
    case GET_ITEM_SESSION_STORAGE:
      return {
        ...state,
        cartItem: action.payload,
      };

    case CART_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload.myCartItems,
        cartItemsCount: action.payload.cartItemsCount,
      };

    case SAVE_ORDER_INFO:
      return {
        ...state,
        orderInfo: action.payload,
      };

    case CART_ITEMS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CART_ITEMS_REQUEST:
      return {
        ...state,
        loadingg: true,
      };

    case DELETE_CART_ITEMS_SUCCESS:
      return {
        ...state,
        loadingg: false,
        message: action.payload.message,
      };

    case DELETE_CART_ITEMS_ERROR:
      return {
        ...state,
        loadingg: false,
        error: action.payload,
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        loadin: true,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loadin: false,
        cartItem: action.payload.cart,
        isAdded: action.payload.sucess,
      };
    case ADD_TO_CART_ISADDED_RESET:
      return {
        ...state,
        loadin: false,
        isAdded: false,
      };
    case ADD_TO_CART_ERROR:
      return {
        ...state,
        loadin: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
