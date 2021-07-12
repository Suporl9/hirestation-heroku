import {
  GET_STRIPE_API_KEY_CLEAR_ERROR,
  GET_STRIPE_API_KEY_ERROR,
  GET_STRIPE_API_KEY_REQUEST,
  GET_STRIPE_API_KEY_SUCCESS,
} from "../constants/Constants";

const initialState = {
  stripeKey: "",
};

export const getStripeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STRIPE_API_KEY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_STRIPE_API_KEY_SUCCESS:
      return {
        ...state,
        loading: false,
        stripeKey: action.payload.stripeApiKey,
      };

    case GET_STRIPE_API_KEY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.message,
      };

    case GET_STRIPE_API_KEY_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
