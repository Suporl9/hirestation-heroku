import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/LoginRegister.css";
import { Register } from "../../redux/user/userAction";
import { CLEAR_ERRORS } from "../../redux/constants/Constants";
import { useAlert } from "react-alert";
import { Button } from "react-bootstrap";
import MetaData from "../../layout/metaData";

function SignUpform() {
  const history = useHistory();

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordverify, setPasswordVerify] = useState("");

  const alert = useAlert();

  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (error) {
      alert.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [history, isAuthenticated, error, alert, dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("fullname", fullname);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("passwordverify", passwordverify);
    dispatch(Register(formData));
  };

  return (
    <Fragment>
      <MetaData title={`SignUp`} />
      <div className="split-screen">
        <Fragment>
          <div className="left">
            <section className="copy">
              <h1 className="explorecrec">Explore your creativity</h1>
              <p>Over 1000 services!!</p>
            </section>
          </div>
          <div className="right">
            <form onSubmit={submitHandler} encType="multipart/form-data">
              <section className="copy">
                <h2 className="h2class">Sign Up</h2>
                <div className="login-container">
                  <p>
                    Already have an account?
                    <Link to="/login" className="LinkClass">
                      <strong>Log In.</strong>
                    </Link>
                  </p>
                </div>
              </section>
              <div className="input-container Full Name">
                <label htmlFor="fullname-field">Full Name</label>
                <input
                  className="fname"
                  name="fullname"
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                ></input>
              </div>
              <div className="input-container email">
                <label htmlFor="email-field">Email</label>
                <input
                  className="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="input-container password">
                <label htmlFor="password-field">Password</label>
                <input
                  className="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="input-container password">
                <label htmlFor="verify-password-field">Verify Password</label>
                <input
                  className="password"
                  name="passwordverify"
                  type="password"
                  value={passwordverify}
                  onChange={(e) => setPasswordVerify(e.target.value)}
                ></input>
              </div>

              {/* <div className="input-container cta">
                  <label className="checkbox-container">
                    <input type="checkbox" />
                    <span className="checkmark">Sign Up for Email updates</span>
                  </label>
                </div> */}
              <Button
                className="signup-btn"
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
                Sign Up
              </Button>
              <section className="copy legal">
                <p>
                  <span className="small">
                    By Continuing, you agree to accept our
                    <br />
                    <Link to="/loginRegister" className="LinkClass">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link to="/loginRegister" className="LinkClass">
                      Terms of Services
                    </Link>
                  </span>
                </p>
              </section>
            </form>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
}

export default SignUpform;
