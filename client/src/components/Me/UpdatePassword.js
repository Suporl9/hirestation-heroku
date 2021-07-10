import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "../Home/CSS/home.css";
import { PASSWORD_UDPATE_RESET } from "../redux/constants/Constants";
import { loadUser, updatePassword } from "../redux/user/userAction";
import MetaData from "../layout/metaData";

export const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyPassword] = useState("");
  const [pwdonotmatch, setpwdonotmatch] = useState(false);
  const history = useHistory();
  // const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isUpdated } = useSelector((state) => state.userUpdate);

  useEffect(() => {
    // console.log(isUpdated);
    if (isUpdated) {
      dispatch(loadUser());
      history.push("/me");
      dispatch({ type: PASSWORD_UDPATE_RESET });
    }
  }, [dispatch, history, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (newPassword !== verifyNewPassword) {
      setTimeout(() => {
        setpwdonotmatch(true);
      }, 500);
    } else {
      const formData = new FormData();
      formData.set("oldPassword", oldPassword);
      formData.set("newPassword", newPassword);
      formData.set("verifyNewPassword", verifyNewPassword);
      dispatch(updatePassword(formData));
    }
  };

  return (
    <div className="bg1">
      <MetaData title={`Update Password`} />

      <div className="pwcarddiv">
        <div className="passwordcard">
          <form onSubmit={submitHandler}>
            <h5 className="h6bold" style={{ marginBottom: "5%" }}>
              Old Password:
            </h5>
            <input
              type="password"
              className="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <h5 className="h6bold" style={{ marginBottom: "5%" }}>
              New Password:
            </h5>
            <input
              type="password"
              className="oldPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <h5 className="h6bold" style={{ marginBottom: "5%" }}>
              Verify New Password:
            </h5>
            <input
              type="password"
              className="oldPassword"
              value={verifyNewPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
            {pwdonotmatch && (
              <div className="pwdontmatch">
                <span style={{ fontWeight: "bold" }}>
                  Passwords do not match!!
                </span>
              </div>
            )}
            <button className="card-btn-det" type="submit">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
