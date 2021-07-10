import {
  CLEAR_ERROR,
  FETCH_ERROR,
  FETCH_SERVICES,
  FETCH_SUCCESS,
  FETCH_SERVICE_DETAILS,
  FETCH_SERVICE_DETAILS_SUCCESS,
  FETCH_SERVICE_DETAILS_ERROR,
  USER_SERVICES_REQUEST,
  USER_SERVICES_SUCCESS,
  USER_SERVICES_ERROR,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  NEW_SERVICE_REQUEST,
  NEW_SERVICE_SUCCESS,
  NEW_SERVICE_FAIL,
  NEW_SERVICE_RESET,
  NEW_SERVICE_FAIL_RESET,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAIL,
  DELETE_SERVICE_RESET,
  DELETE_SERVICE_CLEAR_ERROR,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAIL,
  UPDATE_SERVICE_RESET,
  UPDATE_SERVICE_CLEAR_ERROR,
  FETCH_SERVICE_DETAILS_RESET_ERROR,
} from "../constants/Constants";

const initialState = {
  loading: false,
  services: [], //check later on
  service: {},
  error: null,
};
export const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SERVICES_REQUEST:
    case FETCH_SERVICES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        services: action.payload.services,
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        services: action.payload.getServices,
        filteredServiceCount: action.payload.filteredServiceCount,
        servicesCount: action.payload.servicesCount,
        resDataPerPage: action.payload.resDataPerPage,
      };
    case FETCH_ERROR:
    case USER_SERVICES_ERROR:
      return {
        ...state,
        error: action.payload.response.data.message,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const serviceDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICE_DETAILS:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SERVICE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        service: action.payload.getService,
      };
    case FETCH_SERVICE_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.message,
      };

    case FETCH_SERVICE_DETAILS_RESET_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };

    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };

    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.message,
      };
    default:
      return state;
  }
};
export const newServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        service: action.payload.service,
      };

    case NEW_SERVICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.message,
      };

    case NEW_SERVICE_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        error: null,
      };

    case NEW_SERVICE_FAIL_RESET:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const deleteOrUpdateServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SERVICE_REQUEST:
    case DELETE_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };

    case UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };
    case UPDATE_SERVICE_FAIL:
    case DELETE_SERVICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.message,
      };

    case DELETE_SERVICE_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };

    case UPDATE_SERVICE_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };
    case UPDATE_SERVICE_CLEAR_ERROR:
    case DELETE_SERVICE_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
