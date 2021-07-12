import axios from "axios";
import {
  GET_STRIPE_API_KEY_ERROR,
  GET_STRIPE_API_KEY_REQUEST,
  GET_STRIPE_API_KEY_SUCCESS,
} from "../constants/Constants";

export const getStripeApiKey = () => async (dispatch) => {
  try {
    dispatch({ type: GET_STRIPE_API_KEY_REQUEST });

    const { data } = await axios.get("/payment/stripeApiKey");

    dispatch({ type: GET_STRIPE_API_KEY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_STRIPE_API_KEY_ERROR, payload: error });
  }
};
