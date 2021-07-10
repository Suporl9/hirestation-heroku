import axios from "axios";
import {
  CLEAR_ERRORS,
  // AVATAR_ERROR,
  // AVATAR_REQUEST,
  // AVATAR_SUCCESS,
  FETCH_LOGIN_ERROR,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_REGISER_ERROR,
  FETCH_REGISTER_REQUEST,
  FETCH_REGISTER_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_DETAILS_FAIL,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  LOAD_USER_ERROR,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  PASSWORD_UDPATE_REQUEST,
  PASSWORD_UPDATE_ERROR,
  PASSWORD_UPDATE_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  USER_PROFILE_UPDATE_ERROR,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
} from "../constants/Constants";

//login acttion creator
export const Login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_LOGIN_REQUEST });
    //sends the header as json and not as html text //expects to get a json or xml body {"email": "testing@gmail.com",
    // "password": "password"}
    //Content-Type in the header of a HTTP request specifies to the server what data it should expect. If a server allows and accepts multiple types of content it can use this field know how to interpret the body of the request
    //applicaion/json only to be put in  post or  put request
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios
      .post("/auth/login", { email, password }, config)
      .then((result) => result.data);

    dispatch({ type: FETCH_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_LOGIN_ERROR, payload: error });
  }
};

//user registration action
export const Register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_REGISTER_REQUEST });
    //multipart/form-data: each value is sent as a block of data ("body part"), with a user agent-defined delimiter ("boundary") separating each part. The keys are given in the Content-Disposition header of each part.
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const data = await axios
      .post("/auth/new", userData, config)
      .then((result) => result.data);

    dispatch({ type: FETCH_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_REGISER_ERROR, payload: error });
  }
};

//update user with form

export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const data = await axios
      .put("/auth/me/update", userData, config)
      .then((resp) => resp.data);

    dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_PROFILE_UPDATE_ERROR, payload: error });
  }
};

//update password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: PASSWORD_UDPATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios
      .put("/auth/password/update", passwords, config)
      .then((resp) => resp.data);

    dispatch({ type: PASSWORD_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PASSWORD_UPDATE_ERROR, payload: error });
  }
};

//load loggedIn User action creator //also gets the user datails from here

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const data = await axios.get("/auth/me").then((result) => result.data);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_ERROR, payload: error });
  }
};

export const logOutUser = () => async (dispatch) => {
  try {
    await axios.get("/auth/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_ERROR, payload: error });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios
      .post("/auth/password/forgot", email, config)
      .then((resp) => resp.data);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_ERROR, payload: error });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios
      .post(`/auth/password/reset/${token}`, password, config)
      .then((resp) => resp.data);

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_ERROR, payload: error });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/auth/user/${id}`);

    dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_DETAILS_FAIL, payload: error });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// export const avatarUpdate = (avatar) => async (dispatch) => {
//   try {
//     dispatch({ type: AVATAR_REQUEST });
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const data = await axios
//       .put("/auth/avatarUpdate", avatar, config)
//       .then((response) => response.data);

//     dispatch({ type: AVATAR_SUCCESS, payload: data.success });
//   } catch (error) {
//     // dispatch({type:AVATAR})
//     dispatch({ type: AVATAR_ERROR, payload: error });
//   }
// };
