import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  cartReducer,
  deleteCartReducer,
  getCartItemsReducer,
} from "./redux/cart/cartReducer";
import {
  getAdminOrdersReducer,
  getMyOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  updateOrderReducer,
} from "./redux/order/orderReducer";

import {
  deleteOrUpdateServiceReducer,
  newReviewReducer,
  newServiceReducer,
  serviceDetailsReducer,
  serviceReducer,
} from "./redux/service/serviceReducer";

import {
  authReducer,
  forgotPasswodReducer,
  userDetailsReducer,
  userUpdateReducer,
} from "./redux/user/userReducer";

const rootReducer = combineReducers({
  services: serviceReducer,
  serviceDetails: serviceDetailsReducer,
  auth: authReducer,
  userUpdate: userUpdateReducer,
  forgotPasswordReducer: forgotPasswodReducer,
  addToCart: cartReducer,
  getCart: getCartItemsReducer,
  deleteCartItem: deleteCartReducer,
  newOrder: newOrderReducer,
  getMyOrders: getMyOrdersReducer,
  getAdminOrders: getAdminOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newService: newServiceReducer,
  deleteOrUpdateService: deleteOrUpdateServiceReducer,
  updateOrder: updateOrderReducer,
  userDetails: userDetailsReducer,
});

const initialState = {};

const store = createStore(
  rootReducer,
  initialState, //optional specify to restore previous serialised user session// must be plain if combineReducer used
  //without initailstate the reducer will return undefined and therefore servicereducer.services,authreducer.user would be undefined but since preloadedstate is provided the properties will be set and hydrate the data coming from the server
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
