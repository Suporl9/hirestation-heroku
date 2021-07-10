import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { saveOrderInfo } from "../redux/cart/cartActions";
import { CheckOutSteps } from "./CheckOutSteps";

export const OrderInfo = () => {
  const history = useHistory();
  const { orderInfo } = useSelector((state) => state.getCart);
  const [phoneNumber, setPhoneNumber] = useState(
    orderInfo ? orderInfo.phoneNumber : ""
  );
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveOrderInfo({ phoneNumber }));
    history.push("/order/confirm");
  };
  // useEffect(() => {
  //   if (orderInfo) {
  //     setPhoneNumber(orderInfo.phoneNumber);
  //   }
  // }, [orderInfo]);
  return (
    <div className="bg1">
      <CheckOutSteps orderInfo />
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
              Order Info:
            </h4>
            <h5 className="h6bold" style={{ marginBottom: "5%" }}>
              Phone Number:
            </h5>
            {/* some problem in input displaying session storage number  */}
            <input
              type="text"
              className="oldPassword"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button className="card-btn-det" type="submit">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
