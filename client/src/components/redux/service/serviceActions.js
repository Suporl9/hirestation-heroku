//create an fuction with side effect//because of he thunk middleware
import axios from "axios";

import {
  CLEAR_ERROR,
  DELETE_SERVICE_FAIL,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_SUCCESS,
  FETCH_ERROR,
  FETCH_SERVICES,
  FETCH_SERVICE_DETAILS,
  FETCH_SERVICE_DETAILS_ERROR,
  FETCH_SERVICE_DETAILS_SUCCESS,
  FETCH_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_SERVICE_FAIL,
  NEW_SERVICE_REQUEST,
  NEW_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAIL,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  USER_SERVICES_ERROR,
  USER_SERVICES_REQUEST,
  USER_SERVICES_SUCCESS,
} from "../constants/Constants"; //importing the constants for dispatching the actions

export const getAllServices =
  (keyword = "", currentPage = 1, price, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: FETCH_SERVICES }); //set the loading to true
      let link = `/services?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      if (category) {
        link = `/services?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      }

      const data = await axios.get(link).then((result) => result.data);
      //get the data from the backend and set it to const data
      // const { data } = await axios.get("/services");
      dispatch({
        //after getting the data pass it with payload to the reducer
        type: FETCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      //if any error dispatch the action "FETCH_ERROR" and display the error
      dispatch({
        type: FETCH_ERROR,
        payload: error.message,
      });
    }
  };

//function to clear the errors  if every thing was a success
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

export const getServiceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SERVICE_DETAILS });
    const data = await axios
      .get(`/services/${id}`)
      .then((result) => result.data);

    dispatch({
      type: FETCH_SERVICE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SERVICE_DETAILS_ERROR,
      payload: error,
    });
  }
};

//get user's Services Details

export const getUserServices = () => async (dispatch) => {
  try {
    dispatch({ type: USER_SERVICES_REQUEST });

    const data = await axios
      .get("/services/me")
      .then((response) => response.data);
    dispatch({ type: USER_SERVICES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_SERVICES_ERROR, payload: error });
  }
};
export const newReview = (userData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put("/services/review", userData, config);

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEW_REVIEW_FAIL, payload: error });
  }
};

export const addNewService = (serviceData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SERVICE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/services/new", serviceData, config);

    dispatch({ type: NEW_SERVICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEW_SERVICE_FAIL, payload: error });
  }
};

export const deleteService = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SERVICE_REQUEST });

    const { data } = await axios.delete(`/services/${id}`);

    dispatch({ type: DELETE_SERVICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_SERVICE_FAIL, payload: error });
  }
};

export const updateService = (id, serviceData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SERVICE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/services/${id}`, serviceData, config);

    dispatch({ type: UPDATE_SERVICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_SERVICE_FAIL, payload: error });
  }
};
