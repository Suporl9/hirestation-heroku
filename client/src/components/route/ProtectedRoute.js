/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Fragment>
      <Route
        {...rest}
        render={(props) => {
          return user ? <Component {...props} /> : <Redirect to="/welcome" />;
        }}
      />
    </Fragment>
  );
};

// 1.(line no 6) setting  the small component from  the route in app.js  and seting it to  big Component
// 2.(line no 6) ...rest is spreading whatever options we have in route in app.js.in  our case its exact and path
// 3.(line no 12) props is the component file.in our case is MyProfile
// 4.(line no 13) if there is user in the store or initialstate of the reducer we render {...props} i.e MyProfile but if the user is null in state then we redirect to the welcome page path
