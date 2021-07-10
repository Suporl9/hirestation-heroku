import React, { useEffect, useState } from "react";
import { SideBar } from "./SideBar";
// import sudimg from "./sud.JPG";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearOrderError,
  getOrderDetails,
  updateOrder,
} from "../redux/order/orderActions";
import {
  UPDATE_ORDER_CLEAR_ERROR,
  UPDATE_ORDER_RESET,
} from "../redux/constants/Constants";
import MetaData from "../layout/metaData";

export const AdminOrderDetails = () => {
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const { orderDetails, error } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.updateOrder
  );
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (error) {
      alert.error(error);
      dispatch(clearOrderError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch({ type: UPDATE_ORDER_CLEAR_ERROR });
    }
    if (isUpdated) {
      alert.success("Order updated!!");
      dispatch({ type: UPDATE_ORDER_RESET });
      // dispatch({ type: UPDATE_ORDER_RESET })
    }
  }, [dispatch, id, alert, error, updateError, isUpdated]);

  const updateHandler = (id) => {
    const formData = new FormData();

    formData.set("orderStatus", status);

    dispatch(updateOrder(id, formData));
  };

  return (
    <div className="bg">
      <MetaData title={`Order Details`} />

      <div className="sideBarAndDash">
        <SideBar myOrders />
        <div className="tabpanel">
          <div className="dashoarddetailsmr">
            <div className="dashoarddetailsflex">
              <div className="orderdetailss">
                <div className="orderdetailsflex">
                  <span
                    className="oditm"
                    style={{ fontWeight: "bold", fontSize: "30px" }}
                  >
                    Order Details :
                  </span>
                  <h5 className="h6boldorder">
                    Order : #{orderDetails && orderDetails._id}
                  </h5>
                  <div className="myitemscardleft">
                    <span
                      className="oditm"
                      style={{ fontWeight: "bold", fontSize: "22px" }}
                    >
                      User Info:
                    </span>
                    <div
                      className="hl"
                      style={{ marginTop: "1.5%", marginBottom: "3%" }}
                    ></div>
                    <h6 className="h6boldii">
                      Name : {orderDetails.user && orderDetails.user.fullname}
                    </h6>
                    <h6 className="h6boldii" style={{ marginTop: "1.5%" }}>
                      phone Number :
                      {orderDetails.orderInfo &&
                        orderDetails.orderInfo.phoneNumber}
                    </h6>
                    <h6 className="h6boldii" style={{ marginTop: "1.5%" }}>
                      email : {orderDetails.user && orderDetails.user.email}
                    </h6>

                    <Link
                      to={`/user/${orderDetails.user && orderDetails.user._id}`}
                    >
                      <button
                        className="card-btn-det"
                        style={{ marginBottom: "3%" }}
                      >
                        View Profile
                      </button>
                    </Link>
                  </div>
                  <div className="orderdeliverflex">
                    <h5 className="h6boldorderi">Payment :</h5>
                    <h5 className="h6boldorderi">
                      {orderDetails.paymentInfo &&
                      orderDetails.paymentInfo.status === "succeeded" ? (
                        <p className="paid">paid</p>
                      ) : (
                        <p className="notpaid">Not Paid</p>
                      )}
                    </h5>
                  </div>
                  <div className="orderdeliverflex">
                    <h5 className="h6boldorderi">Order Status :</h5>
                    <h5 className="h6boldorderi">
                      {orderDetails &&
                      orderDetails.orderStatus === "Delivered" ? (
                        <p className="paid">Delivered</p>
                      ) : (
                        <p className="notpaid">Processing</p>
                      )}
                    </h5>
                  </div>
                  <span
                    className="oditm"
                    style={{
                      fontWeight: "bold",
                      fontSize: "27px",
                      marginTop: "10%",
                    }}
                  >
                    Order Item:
                  </span>
                  <div className="myitemscardleft">
                    <div className="gigstitleandphoto">
                      <div className="cardleft">
                        <div className="titleandphoto">
                          <Link
                            to={`/service/${
                              orderDetails.service && orderDetails.service._id
                            }`}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            <img
                              src={
                                orderDetails.service &&
                                orderDetails.service.images[0].url
                              }
                              alt="gig"
                              style={{
                                height: "100px",
                                width: "120px",
                                borderRadius: "5px",
                              }}
                            />
                          </Link>
                          <Link
                            to={`/service/${
                              orderDetails.service && orderDetails.service._id
                            }`}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            <span
                              className="titlerow"
                              style={{ fontSize: "18.5px" }}
                            >
                              {orderDetails.service &&
                                orderDetails.service.title}
                            </span>
                          </Link>
                        </div>
                        <h2 style={{ marginTop: "20px" }} className="h2price">
                          Rs.
                          {orderDetails.service &&
                            orderDetails.service.price}{" "}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="changestatus">
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    marginTop: "5%",
                  }}
                >
                  Status:
                </span>
                <div className="form-group" style={{ marginTop: "8%" }}>
                  <select
                    className="form-control"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button
                    className="card-btn-det"
                    onClick={() =>
                      updateHandler(orderDetails && orderDetails._id)
                    }
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
