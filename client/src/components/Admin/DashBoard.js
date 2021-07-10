import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { GET_ADMIN_ORDERS_CLEAR_ERRORS } from "../redux/constants/Constants";
import { getAdminOrders } from "../redux/order/orderActions";
import { clearErrors, getUserServices } from "../redux/service/serviceActions";
import MetaData from "../layout/metaData";
import { SideBar } from "./SideBar";
export const DashBoard = () => {
  const dispatch = useDispatch();
  const {
    adminOrders,
    //  totalAmount,
    error: adminOrdersError,
  } = useSelector((state) => state.getAdminOrders);
  const { services, error } = useSelector((state) => state.services);
  // const [tabIndex, setTabIndex] = useState(0);
  const alert = useAlert();
  useEffect(() => {
    dispatch(getUserServices());
    dispatch(getAdminOrders());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (adminOrdersError) {
      alert.error(adminOrdersError);
      dispatch({ type: GET_ADMIN_ORDERS_CLEAR_ERRORS });
    }
  }, [error, dispatch, alert, adminOrdersError]);
  return (
    <Fragment>
      <div className="bg">
        <MetaData title={`DashBoard`} />

        <div className="sideBarAndDash">
          <SideBar dashBoard />
          <div className="tabpanel">
            <div className="dashboardflex">
              {/* <div className="mgTopdashb"> */}
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "25px",
                  margin: "4% 0 4% 0",
                }}
              >
                DashBoard:
              </span>

              <div className="amountdiv">
                <h2 className="totalAmountdiv">Total Amount(Orders):</h2>
                <h2 className="totalAmountdiv">
                  Rs.
                  {adminOrders &&
                    adminOrders.reduce((acc, item) => item.totalPrice + acc, 0)}
                </h2>
              </div>
              <div className="secondflexrow">
                <div className="servicediv">
                  <h2 className="totalAmountdiv">Services:</h2>
                  <h2 className="totalAmountdiv">
                    Rs.{services && services.length}
                  </h2>
                </div>

                <div className="ordersdiv">
                  <h2 className="totalAmountdiv">Orders:</h2>
                  <h2 className="totalAmountdiv">
                    Rs.{adminOrders && adminOrders.length}
                  </h2>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
