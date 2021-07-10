import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails } from "../redux/order/orderActions";
import { Loader } from "../layout/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/metaData";

export const OrderDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const { orderDetails, loading, error } = useSelector(
    (state) => state.orderDetails
  );
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (error) {
      alert.error(error);
    }
  }, [dispatch, id, alert, error]);
  return (
    <div className="bg">
      <MetaData title={`Order Details`} />
      <div className="orderdetails">
        <div className="orderdetailsflex">
          <span style={{ fontWeight: "bold", fontSize: "30px" }}>
            Order Details :
          </span>
          <h5 className="h6boldorder">Order : #{id}</h5>
          <div className="myitemscardleft">
            <span style={{ fontWeight: "bold", fontSize: "25px" }}>
              Personal Info:
            </span>
            <div
              className="hl"
              style={{ marginTop: "1.5%", marginBottom: "3%" }}
            ></div>
            <h5 className="h6bold">Name : {user.fullname}</h5>
            <h5 className="h6bold" style={{ marginTop: "1.5%" }}>
              phone Number :{" "}
              {orderDetails.orderInfo && orderDetails.orderInfo.phoneNumber}
            </h5>
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
              {orderDetails && orderDetails.orderStatus === "Delivered" ? (
                <p className="paid">Delivered</p>
              ) : (
                <p className="notpaid">Processing</p>
              )}
            </h5>
          </div>
          <span
            style={{ fontWeight: "bold", fontSize: "27px", marginTop: "5%" }}
          >
            Order Item:
          </span>
          {loading ? (
            <Loader />
          ) : (
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
                        className="imgphuto"
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
                      <span className="titlerow" style={{ fontSize: "20px" }}>
                        {orderDetails.service && orderDetails.service.title}
                      </span>
                    </Link>
                  </div>
                  <h2 style={{ marginTop: "20px" }}>
                    Rs.{orderDetails.service && orderDetails.service.price}
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
