import {
  FETCH_REGISTER_SUCCESS,
  FETCH_LOGIN_ERROR,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_REGISER_ERROR,
  FETCH_REGISTER_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_RESET,
  USER_PROFILE_UPDATE_ERROR,
  PASSWORD_UDPATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UDPATE_RESET,
  PASSWORD_UPDATE_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  CLEAR_ERRORS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAIL,
  GET_USER_DETAILS_CLEAR_ERROR,
  FORGOT_PASSWORD_SUCCESS_RESET,
} from "../constants/Constants";

const initialState = {
  user: {},
  userDet: {},
  loading: false,
  error: "",
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
    case FETCH_LOGIN_REQUEST:
    case FETCH_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };

    case LOAD_USER_SUCCESS:
    case FETCH_LOGIN_SUCCESS:
    case FETCH_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        user: null,
        loading: false,
        // error: "",
      };

    case LOGOUT_ERROR:
      return {
        ...state,
        error: action.payload.response.data.message,
      };

    case LOAD_USER_ERROR:
    case FETCH_LOGIN_ERROR:
    case FETCH_REGISER_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload.response.data.message,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        userDet: action.payload.user,
      };
    case GET_USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.message,
      };
    case GET_USER_DETAILS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//user profile update reducer

export const userUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_UDPATE_REQUEST:
    case USER_PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        // abc: "ccc",
      };
    case PASSWORD_UPDATE_SUCCESS:
    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };
    case PASSWORD_UPDATE_ERROR:
    case USER_PROFILE_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PASSWORD_UDPATE_RESET:
    case USER_PROFILE_UPDATE_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };

    default:
      return state;
  }
};

export const forgotPasswodReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
        success: action.payload.success,
        // error: "",
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
      };

    case FORGOT_PASSWORD_ERROR:
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.message,
      };

    case FORGOT_PASSWORD_SUCCESS_RESET:
      return {
        ...state,
        message: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// export const avatarReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case AVATAR_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case AVATAR_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };
//     case "AVATAR_ISUPDATED_RESET":
//       return {
//         ...state,
//         isUpdated: false,
//       };
//     case AVATAR_ERROR:
//       return {
//         ...state,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };
