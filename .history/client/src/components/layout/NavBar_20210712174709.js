import React, { Fragment, useEffect, useRef, useState } from "react";
// eslint-disable-next-line
import { Link, NavLink } from "react-router-dom";
import img1 from "../welcomepage/welcomepagecoponents/imgs/logo.png";
// import wishlist from "../Home/testimgs/wishlist.svg";
import { ReactComponent as Cart } from "./cart.svg";

import "../welcomepage/welcomepagecoponents/css/welcomestyles.css";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../redux/user/userAction";

//(problem to be solved : dropdown is showing whne  registering or logging in(fix later))
//understand how click event is working in dropdown

function Navbar() {
  const { user, loading } = useSelector((state) => state.auth);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { cartItemsCount } = useSelector((state) => state.getCart);
  // const { cartItem, isAdded, loadin } = useSelector((state) => state.addToCart);
  const onCLickHandler = () => setIsActive(!isActive);
  const logOutHandler = () => {
    setIsActive(!isActive);
    dispatch(logOutUser());
  };
  const Categories = [
    "Graphics-And-Design",
    "Game-Development",
    "Web-Programming",
    "Mobile-Apps",
  ];

  useEffect(() => {
    // console.log(isActive);
    // setIsActive(false);
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive, cartItemsCount]);

  return (
    <nav>
      <Link to="/welcome">
        <img className="logo" src={img1} alt="logo" />
      </Link>

      <ul className={click ? "nav_links active" : "nav_links"}>
        <li className="listyle">
          <Link to="/" className="listyleLink" onClick={handleClick}>
            Explore
          </Link>
        </li>{" "}
        <li className="listyle">
          <Link to="/category" className="listyleLink ct" onClick={handleClick}>
            Categories &nbsp;
            <i className="fa fa-sort-desc" aria-hidden="true"></i>
          </Link>
          <ul className="innerul">
            {Categories.map((categori) => (
              <li className="innerulli" key={categori}>
                <Link to={`/category/${categori}`} className="listyleLinka">
                  {categori}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="listyle">
          <Link
            to="/dashboard/services/new"
            className="listyleLink"
            onClick={handleClick}
          >
            Become a seller
          </Link>
        </li>
      </ul>

      <div className="loginandcart">
        {user && (
          <div className="cartanditems">
            <Link to="/myWishList">
              <div className="icon-button">
                <span className="material-icons">
                  <Cart className="cart-icon" />
                </span>
                <span className="icon-button_badge">
                  {cartItemsCount && cartItemsCount}
                </span>
              </div>
            </Link>
          </div>
        )}
        {user ? (
          <Fragment>
            <div className="menu-container">
              <button className="menu-trigger" onClick={onCLickHandler}>
                <div className="insidetriggerbtn">
                  <span style={{ color: "white", fontWeight: "bold  " }}>
                    {/* {user && hello()} */}
                    {user.fullname && user.fullname.split(" ")[0]}
                  </span>
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.fullname}
                    className="navimg"
                  />
                </div>
              </button>
              <div
                ref={dropdownRef}
                className={isActive ? "menu active" : "menu inactive"}
              >
                <ul>
                  <li>
                    <Link
                      to="/me"
                      className="listyleLinkprofile"
                      onClick={onCLickHandler}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="listyleLinkprofile"
                      onClick={onCLickHandler}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders/me"
                      className="listyleLinkprofile"
                      onClick={onCLickHandler}
                    >
                      Orders
                    </Link>
                  </li>

                  <li className="libg">
                    <Link
                      to="/"
                      className="listyleLinkprofile"
                      onClick={logOutHandler}
                    >
                      Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Fragment>
        ) : (
          !loading && (
            <div className="loginbtndiv">
              <Link to="/login">
                <button className="LogInBtn">Log In</button>
              </Link>
            </div>
          )
        )}
      </div>
      <div className="nav-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
    </nav>
  );
}

export default Navbar;
