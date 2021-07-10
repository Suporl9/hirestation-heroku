/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "./arrow.svg";

export const CheckOutSteps = ({ orderInfo, confirmOrder, payment }) => {
  return (
    <div className="checkout-progress">
      {orderInfo ? (
        <Link to="/order" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="numandinfo">
            <div className="num active2">1</div>
            <div className="step active-step">Order Info</div>
          </div>
        </Link>
      ) : (
        <Link to="#!" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="numandinfo">
            <div className="num">1</div>
            <div className="step">Order Info</div>
          </div>
        </Link>
      )}
      <div className="arrow">
        <Arrow className="arrowSvg" />
      </div>
      {confirmOrder ? (
        <Link
          to="/order/confirm"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="numandinfo">
            <div className="num active2 one">2</div>
            <div className="step active-step">Confirm Order</div>
          </div>
        </Link>
      ) : (
        <Link to="#!" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="numandinfo">
            <div className="num">2</div>
            <div className="step">Confirm Order</div>
          </div>
        </Link>
      )}
      <div className="arrow">
        <Arrow className="arrowSvg" />
      </div>
      {payment ? (
        <Link
          to="/order/payment"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="numandinfo">
            <div className="num active2 one">3</div>
            <div className="step active-step">Payment</div>
          </div>
        </Link>
      ) : (
        <Link to="#!" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="numandinfo">
            <div className="num">3</div>
            <div className="step">Payment</div>
          </div>
        </Link>
      )}
    </div>
  );
};
