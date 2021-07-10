import React, { useEffect } from "react";
import { CheckOutSteps } from "./CheckOutSteps";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItetmSession,
  getOrderInfoSession,
} from "../redux/cart/cartActions";
import axios from "axios";
import { useHistory } from "react-router";
import { clearOrderError, createOrder } from "../redux/order/orderActions";

// const options = {
//   //this is not working for now
//   style: {
//     fontSize: "20px",
//   },
//   invalid: {
//     color: "#ff2424",
//   },
// };
export const OrderPayment = () => {
  const { cartItem, orderInfo } = useSelector((state) => state.getCart);
  const { error } = useSelector((state) => state.newOrder);
  const alert = useAlert();
  const order = {
    service: cartItem && cartItem.service,
    orderInfo,
    // paymentInfo: orderInfo,
    totalPrice: cartItem && cartItem.service.price,
    adminUser: cartItem.service && cartItem.service.user[0],
  };
  const stripe = useStripe();
  const elements = useElements();
  // const {}
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // console.log(cartItem.service.user[0]);
    dispatch(getCartItetmSession());
    dispatch(getOrderInfoSession());
    if (error) {
      alert.error(error);
      dispatch(clearOrderError());
    }
  }, [dispatch, alert, error]);

  const paymentData = {
    amount: Math.round(cartItem && cartItem.service.price * 100),
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector(".card-btn-det").disabled = true;
    let res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      res = await axios.post("/payment/process", paymentData, config);

      const clientSecret = res.data.client_secret;
      // console.log("clientsecret", clientSecret);

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.fullname,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        document.querySelector(".card-btn-det").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          alert.success("payment successfull!!");
          history.push("/orders/me");
        } else {
          alert.error("There was  some issue in payment processing!!");
        }
      }
    } catch (error) {
      document.querySelector(".card-btn-det").disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <div className="bg4">
      <CheckOutSteps orderInfo confirmOrder payment />
      <div className="pwcarddiv">
        <div className="passwordcard">
          <form onSubmit={submitHandler}>
            <h4
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
                margin: "0 0 8% 0",
              }}
            >
              Card Info:
            </h4>
            <h5 className="h6bold" style={{ marginBottom: "5%" }}>
              Card Number:
            </h5>
            <div className="elementsdiv">
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      iconColor: "#c4f0ff",
                      color: "#fff",
                      fontWeight: 500,
                      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                      fontSize: "16px",
                      fontSmoothing: "antialiased",
                      ":-webkit-autofill": {
                        color: "#fce883",
                      },
                      "::placeholder": {
                        color: "#455163",
                      },
                    },
                    invalid: {
                      iconColor: "#f83636",
                      color: "#f83636",
                    },
                  },
                }}
                className="oldPassword"
              />
            </div>
            <span style={{ fontSize: "15px", color: "orange" }}>
              Use this number : 4000000000003220
            </span>
            <h5
              className="h6bold"
              style={{ marginTop: "5%", marginBottom: "5%" }}
            >
              Card Expiry:
            </h5>
            <div className="elementsdiv">
              <CardExpiryElement
                options={{
                  style: {
                    base: {
                      iconColor: "#c4f0ff",
                      color: "#fff",
                      fontWeight: 500,
                      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                      fontSize: "16px",
                      fontSmoothing: "antialiased",

                      ":-webkit-autofill": {
                        color: "#fce883",
                      },
                      "::placeholder": {
                        color: "#455163",
                      },
                    },
                    invalid: {
                      iconColor: "#FFC7EE",
                      color: "#FFC7EE",
                    },
                  },
                }}
                className="oldPassword"
              />
            </div>
            <span style={{ fontSize: "15px", color: "orange" }}>
              Use : 04/44
            </span>
            <h5
              className="h6bold"
              style={{ marginTop: "5%", marginBottom: "5%" }}
            >
              Card CVC:
            </h5>
            <div className="elementsdiv">
              <CardCvcElement
                options={{
                  style: {
                    base: {
                      iconColor: "#c4f0ff",
                      color: "#fff",
                      fontWeight: 500,
                      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                      fontSize: "16px",
                      fontSmoothing: "antialiased",

                      ":-webkit-autofill": {
                        color: "#fce883",
                      },
                      "::placeholder": {
                        color: "#455163",
                      },
                    },
                    invalid: {
                      iconColor: "#FFC7EE",
                      color: "#FFC7EE",
                    },
                  },
                }}
                className="oldPassword"
              />
            </div>
            <span style={{ fontSize: "15px", color: "orange" }}>Use : 444</span>
            <button className="card-btn-det" type="submit">
              PAY - (Rs.{cartItem && cartItem.service.price})
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
