import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../welcomepage/welcomepagecoponents/imgs/logo.png";
import "../welcomepage/welcomepagecoponents/css/welcomestyles.css";
export class Footer extends Component {
  render() {
    return (
      <div>
        <footer>
          <div className="footercontainer">
            <div className="left-col">
              <img src={logo} alt="logo" className="logo" />
              <div className="social-media">
                <Link to="/welcome" className="social-links">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="/welcome" className="social-links">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to="/welcome" className="social-links">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to="/welcome" className="social-links">
                  <i className="fab fa-youtube"></i>
                </Link>
                <Link to="/welcome" className="social-links">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
              <p className="rights-text">
                ©2021 Created By HireStation All Rights Reserved.
              </p>
            </div>
            <div className="right-col">
              <h1>Our Newslater</h1>
              <p>eniam enim tempor sit officia reprehenderit.</p>
              <div className="border1">
                <form className="newslater-form">
                  <input
                    type="text"
                    className="txtb"
                    placeholder="Enter Your Email"
                  />

                  <input type="submit" className="subbtn" value="submit" />
                </form>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
