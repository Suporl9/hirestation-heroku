/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { clearErrors, resetPassword } from "../redux/user/userAction";
import MetaData from "../layout/metaData";

export const ResetPassword = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const [newPassWord, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");
  const [pwdonotmatch, setpwdonotmatch] = useState(false);

  const { loading, error, success } = useSelector(
    (state) => state.forgotPasswordReducer
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated");
      history.push("/login");
    }
  }, [history, error, success, alert, dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassWord !== verifyNewPassword) {
      setTimeout(() => {
        setpwdonotmatch(true);
      }, 500);
    } else {
      const formData = new FormData();
      formData.set("password", newPassWord);

      dispatch(resetPassword(match.params.token, formData));
    }
  };
  return (
    <div className="bg3">
      <MetaData title={`Reset Password`} />
      <div className="pwcarddiv">
        <div className="passwordcard">
          <form onSubmit={submitHandler}>
            <h5 className="h6bold" style={{ marginBottom: "5%" }}>
              New Password:
            </h5>
            <input
              type="password"
              className="oldPassword"
              value={newPassWord}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <h5 className="h6bold" style={{ marginBottom: "5%" }}>
              Confirm New Password:
            </h5>
            <input
              type="password"
              className="oldPassword"
              value={verifyNewPassword}
              onChange={(e) => setVerifyNewPassword(e.target.value)}
            />
            {pwdonotmatch && (
              <div className="pwdontmatch">
                <span style={{ fontWeight: "bold" }}>
                  Passwords do not match!!
                </span>
              </div>
            )}
            <Button
              className="card-btn-det"
              type="submit"
              style={{
                padding: "9px 25px",
                backgroundColor: "#fd4c4c",
                textTransform: "uppercase",
                fontWeight: "900",
                borderStyle: "none",
                borderRadius: "5px",
                outline: "none",
                textShadow: "#000 2px",
                fontSize: "20px",
              }}
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
