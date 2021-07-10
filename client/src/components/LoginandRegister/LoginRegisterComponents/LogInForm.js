/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";

import { Login } from "../../redux/user/userAction";
import "../CSS/LoginRegister.css";

import { CLEAR_ERRORS } from "../../redux/constants/Constants";
import { useAlert } from "react-alert";
import MetaData from "../../layout/metaData";

//alert error to be done later
function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const emailref = useRef(null);
  const dispatch = useDispatch();
  const alert = useAlert();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // console.log(error);
    emailref.current.focus();
    if (isAuthenticated) {
      history.push("/");
    }
    if (error) {
      alert.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [history, isAuthenticated, dispatch, error, alert]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(Login(email, password));
    // if (isAuthenticated) {
    //   history.push("/");
    // }
  };

  return (
    <Fragment>
      <MetaData title={`Login`} />
      <div className="split-screen">
        <Fragment>
          <div className="right">
            <form onSubmit={submitHandler}>
              <section className="copy">
                <h2 className="h2class">Log In</h2>
                <div className="login-container">
                  <p>
                    Donot have an account?
                    <Link to="/signup" className="LinkClass">
                      <strong>Sign Up.</strong>
                    </Link>
                  </p>
                </div>
              </section>

              <div className="input-container email">
                <label>Email</label>
                <input
                  className="email"
                  name="email"
                  type="email"
                  ref={emailref}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </div>
              <div className="input-container password">
                <label>Password</label>
                <input
                  className="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
              </div>
              <Link to="/forgotPassword">
                <h6 style={{ marginBottom: "5%", fontWeight: "bold" }}>
                  Forgot password?
                </h6>
              </Link>
              {/* <div className="input-container cta">
                  <label className="checkbox-container">
                    <input type="checkbox" />
                    <span className="checkmark">Remember me.</span>
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
                Log In
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
          <div className="left">
            <section className="copy">
              <h1 className="explorecrec">Explore your creativity</h1>
              <p>Over 1000 services!!</p>
            </section>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
}

export default Loginform;
