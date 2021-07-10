import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  // Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./LoginandRegister/Login";

import SignUp from "./LoginandRegister/SignUp";

import Navbar from "./layout/NavBar";
import Footer from "./layout/Footer";
import Home from "./Home/Home";
import Welcomepage from "./welcomepage/welcomepage";
import ServiceDetails from "./service/ServiceDetails";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/user/userAction";
import { MyProfile } from "./Me/MyProfile";
import { ProtectedRoute } from "./route/ProtectedRoute";
// import { UpdateProfile } from "./Me/UpdateProfile";
import { UpdateForm } from "./Me/UpdateForm";
import { UpdatePassword } from "./Me/UpdatePassword";
import { ForgotPassword } from "./Me/ForgotPassword";
import { ResetPassword } from "./Me/ResetPassword";
import { MyWishList } from "./cart/MyWishList";
import { getCartItems } from "./redux/cart/cartActions";
import { OrderInfo } from "./orderAndPayment/OrderInfo";
import { OrderConfirm } from "./orderAndPayment/OrderConfirm";
import { OrderPayment } from "./orderAndPayment/OrderPayment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { MyOrders } from "./Me/MyOrders";
import { OrderDetails } from "./Me/OrderDetails";
import { DashBoard } from "./Admin/DashBoard";
import { MyServices } from "./Admin/MyServices";
import { NewService } from "./Admin/NewService";
import { UpdateService } from "./Admin/UpdateService";
import { MyServiceOrders } from "./Admin/MyServiceOrders";
import { AdminOrderDetails } from "./Admin/AdminOrderDetails";
import { UserProfile } from "./layout/UserProfile";
import { CategoriesMView } from "./layout/CategoriesMView";
import { Users } from "./Admin/Users";
// import { OrderDetails } from "./orderAndPayment/OrderDetails";
// import { OrderDetails } from "./Me/OrderDetails";
// import store from "./store";

//as cors sends the credentials axios alloes the credentails(cookies or token) tto be saved in browser
// axios.defaults.withCredentials = true;
//this is like setting the cookies globally .

function App() {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");

  // const {cart}
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getCartItems());

    async function getStripeApiKey() {
      const data = await axios
        .get("/payment/stripeApiKey")
        .then((resp) => resp.data);

      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  });

  // const { user } = useSelector((state) => state.auth);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/category" exact component={CategoriesMView} />

        <Route path="/category/:category" exact component={Home} />
        <Route path="/service/:id" component={ServiceDetails} />
        <Route path="/welcome" component={Welcomepage} />

        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/user/:id" component={UserProfile} />
        <ProtectedRoute path="/me" exact component={MyProfile} />
        <ProtectedRoute path="/me/update" component={UpdateForm} />
        <ProtectedRoute
          path="/me/updatePassword"
          exact
          component={UpdatePassword}
        />
        <ProtectedRoute path="/myWishList" component={MyWishList} />
        <ProtectedRoute path="/order" exact component={OrderInfo} />
        <ProtectedRoute path="/order/confirm" exact component={OrderConfirm} />
        <ProtectedRoute path="/orders/me" component={MyOrders} />
        <ProtectedRoute path="/order/:id" component={OrderDetails} />
        <ProtectedRoute path="/dashboard" exact component={DashBoard} />
        <ProtectedRoute
          path="/dashboard/services"
          exact
          component={MyServices}
        />
        <ProtectedRoute
          path="/dashboard/services/new"
          exact
          component={NewService}
        />

        <ProtectedRoute
          path="/dashboard/service/:id"
          component={UpdateService}
          exact
        />
        <ProtectedRoute
          path="/dashboard/orders"
          component={MyServiceOrders}
          exact
        />
        <ProtectedRoute
          path="/dashboard/serviceDetails/:id"
          component={AdminOrderDetails}
          exact
        />
        <ProtectedRoute path="/dashboard/users" component={Users} exact />

        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/password/reset/:token" component={ResetPassword} />
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/payment" exact component={OrderPayment} />
          </Elements>
        )}

        {/* when path:{service/:id} tried it shows error and goes to service/services/:id // so fix that error later on*/}
        {/* <Route path="services/:keyword" component={Home} /> */}
        {/* <Redirect from="/**" to="/welcome" /> */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
