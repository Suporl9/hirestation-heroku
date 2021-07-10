import React, { useEffect, Fragment } from "react";
import { SideBar } from "./SideBar";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { AiFillInfoCircle } from "react-icons/ai";
import { getAdminOrders } from "../redux/order/orderActions";
import { GET_ADMIN_ORDERS_CLEAR_ERRORS } from "../redux/constants/Constants";
import { Link } from "react-router-dom";
import { Loader } from "../layout/Loader";
import MetaData from "../layout/metaData";
export const Users = () => {
  const dispatch = useDispatch();
  const { loading, adminOrders, error } = useSelector(
    (state) => state.getAdminOrders
  );
  const alert = useAlert();

  useEffect(() => {
    dispatch(getAdminOrders());

    if (error) {
      alert.error(error);
      dispatch({ type: GET_ADMIN_ORDERS_CLEAR_ERRORS });
    }
  }, [dispatch, alert, error]);
  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },

        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: [],
    };

    adminOrders.forEach((order) => {
      data.rows.push({
        name: order.user && order.user.fullname,
        email: `Rs.${order.user && order.user.email}`,

        action: (
          <Link to={`/user/${order.user && order.user._id}`}>
            <AiFillInfoCircle size="25" fill="rgb(6, 121, 253)" />
          </Link>
        ),
      });
    });
    return data;
  };

  return (
    <div className="bg">
      <MetaData title={`Users`} />

      <div className="sideBarAndDash">
        <SideBar users />
        <div className="tabpanel">
          <div className="dashboardflextable">
            <span
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                marginTop: "4%",
              }}
              className="spanusers"
            >
              Users:
            </span>
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                {" "}
                <MDBDataTable
                  data={setUsers()}
                  striped
                  // bordered
                  // hover
                />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
