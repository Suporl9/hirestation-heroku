import React, { useEffect } from "react";
import { CheckOutSteps } from "./CheckOutSteps";
import img from "../Home/testimgs/b.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItetmSession,
  getOrderInfoSession,
} from "../redux/cart/cartActions";
export const OrderConfirm = () => {
  const { cartItem, orderInfo } = useSelector((state) => state.getCart);
  // const orderInfo = sessionStorage.getItem("orderInfo");
  // const phoneNumber = JSON.parse(orderInfo);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItetmSession());
    dispatch(getOrderInfoSession());
  }, [dispatch]);
  return (
    <div className="bg">
      <CheckOutSteps orderInfo confirmOrder />
      <div className="myprofilebody1">
        <div className="h1andmyitemscardleft">
          <span style={{ fontWeight: "bold", fontSize: "28px" }}>
            Order Info:
          </span>
          <div className="infoclass">
            <h6
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                marginBottom: "4%",
              }}
            >
              Name : {user && user.fullname}
            </h6>
            <h6 style={{ fontWeight: "bold", fontSize: "20px" }}>
              Phone Number : {orderInfo && orderInfo.phoneNumber}
            </h6>
          </div>
          {/* <span style={{ fontWeight: "bold", fontSize: "30px" }}>
            Order Info:
          </span> */}
          <div className="myitemscardleft">
            <div className="gigstitleandphoto">
              <div className="cardleft">
                <div className="titleandphoto1">
                  <Link
                    to={`/service/${cartItem && cartItem.service._id}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <img
                      src={cartItem && cartItem.service.images[0].url}
                      alt="gig"
                      style={{
                        height: "100px",
                        width: "120px",
                        borderRadius: "5px",
                      }}
                    />
                  </Link>
                  <span className="titlerow1">
                    <Link
                      to={`/service/${cartItem && cartItem.service._id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {cartItem && cartItem.service.title}
                    </Link>
                  </span>
                </div>

                <h2 style={{ marginTop: "20px", color: "#fd4c4c" }}>
                  Rs.{cartItem && cartItem.service.price}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="myitemscardright1">
          <span style={{ fontWeight: "bold", fontSize: "25px" }}>Summary:</span>
          <div className="hl" style={{ marginBottom: "10%" }}></div>
          <div className="subtotal">
            <h5 className="h6bold">Subtotal:</h5>
            <h5 className="h6bold">1(unit)</h5>
          </div>
          <div className="subtotal">
            <h5 className="h6bold">Total Price:</h5>
            <h5 className="h6bold">
              Rs.{cartItem && cartItem.service.price}
              {/* {cartItems.reduce((acc, item) => item.service.price + acc, 0)} */}
            </h5>
          </div>
          <Link to="/payment">
            <button className="card-btn-det">Proceed to payment</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
