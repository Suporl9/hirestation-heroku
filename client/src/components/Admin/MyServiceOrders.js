import React, { Fragment, useEffect } from "react";
import { SideBar } from "./SideBar";
import { Link } from "react-router-dom";
import editpng from "./edit.png";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders } from "../redux/order/orderActions";
import { useAlert } from "react-alert";
import { GET_ADMIN_ORDERS_CLEAR_ERRORS } from "../redux/constants/Constants";
import { OrderLoader } from "../layout/OrderLoader";
import MetaData from "../layout/metaData";
export const MyServiceOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    loading,
    adminOrders,
    //  totalAmount,
    error,
  } = useSelector((state) => state.getAdminOrders);

  useEffect(() => {
    dispatch(getAdminOrders());

    if (error) {
      alert.error(error);
      dispatch({ type: GET_ADMIN_ORDERS_CLEAR_ERRORS });
    }
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`Orders`} />

      <div className="bg">
        <div className="sideBarAndDash">
          <SideBar myOrders />
          <div className="tabpanel">
            <div className="dashboardflex">
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "25px",
                  marginTop: "4%",
                }}
              >
                Orders:
              </span>

              <div className="myitemscardleftorder">
                {loading ? (
                  <OrderLoader />
                ) : (
                  <Fragment>
                    {" "}
                    {adminOrders &&
                      adminOrders.map((order) => (
                        <div key={order} className="flexdownorder">
                          <div className="ordernoandhl">
                            <span
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              Order No:{" "}
                              <span style={{ color: "#2c8fec" }}>
                                #{order._id}
                              </span>
                            </span>
                            <div className="hl3"></div>
                          </div>
                          <div className="cardleftorder">
                            <div className="titleandphotoorder">
                              <Link
                                to={`/service/${
                                  order.service && order.service._id
                                }`}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                <img
                                  src={
                                    order.service && order.service.images[0].url
                                  }
                                  alt="gig"
                                  style={{
                                    height: "100px",
                                    width: "120px",
                                    borderRadius: "5px",
                                  }}
                                />
                              </Link>

                              <span className="titlerow">
                                <Link
                                  to={`/service/${
                                    order.service && order.service._id
                                  }`}
                                  className="liTitle"
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  {order.service && order.service.title}
                                </Link>
                              </span>

                              {/* </Link> */}
                            </div>
                            <div className="midstatus">
                              <h5
                                className="h6bold"
                                style={{
                                  fontSize: "20px",
                                }}
                              >
                                Status:
                              </h5>
                              <h5
                                className="h6bold"
                                style={{
                                  fontSize: "20px",
                                }}
                              >
                                {order && order.orderStatus === "Delivered" ? (
                                  <p className="paid1">Delivered</p>
                                ) : (
                                  <p className="notpaid2">Processing</p>
                                )}
                              </h5>
                            </div>
                            <div className="btns">
                              <Link
                                to={`/dashboard/serviceDetails/${order._id}`}
                              >
                                <img
                                  src={editpng}
                                  alt="editPng"
                                  style={{ height: "35px", width: "35px" }}
                                ></img>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
