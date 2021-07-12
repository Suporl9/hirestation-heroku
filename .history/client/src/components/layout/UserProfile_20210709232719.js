import React, { useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/user/userAction";
import { GET_USER_DETAILS_CLEAR_ERROR } from "../redux/constants/Constants";
import { useAlert } from "react-alert";
import { FaStar } from "react-icons/fa";
import { Loader } from "./Loader";
import MetaData from "../layout/metaData";
// import {} from "react-bootstrap"
export const UserProfile = () => {
  const alert = useAlert();
  const { userDet, loading, error } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserDetails(id));
    if (error) {
      alert.error(error);
      dispatch({ type: GET_USER_DETAILS_CLEAR_ERROR });
    }
  }, [dispatch, alert, error, id]);
  const sendEmail = () => {
    const mailto = `mailto:${userDet && userDet.email}`;
    window.location.href = mailto;
  };
  return (
    <div className="bg">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`User Profile`} />
          <div className="myprofilebody">
            <div className="profilecardsleft1">
              <div className="firstprofilecard">
                <div className="usercredentials">
                  <img
                    src={userDet.avatar && userDet.avatar.url}
                    alt="ProfileP"
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                      marginBottom: "10%",
                    }}
                  />
                  <h2>{userDet && userDet.fullname}</h2>
                  <h6 style={{ marginBottom: "15%" }}>
                    {userDet && userDet.email}
                  </h6>
                </div>

                <div className="locationfrom" style={{ marginBottom: "5%" }}>
                  <h6 className="h6bold">From:</h6>
                  <h6 className="h6bold">{userDet && userDet.from}</h6>
                </div>
                <div className="locationfrom">
                  <h6 className="h6bold">Joined On:</h6>
                  <h6 className="h6bold">
                    {userDet && String(userDet.createdAt).substring(0, 10)}
                  </h6>
                </div>
                <div
                  className="cardetailsbtn"
                  style={{ margin: "1rem 0 0.5rem 0" }}
                >
                  <button className="card-btn-det" onClick={sendEmail}>
                    Message
                  </button>
                </div>
              </div>
            </div>
            <div className="profilecardsright1">
              <div className="descriptionprofile">
                <h4
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    margin: "0 0 3% 0",
                  }}
                >
                  description
                </h4>
                <h6 style={{ fontWeight: "bold", lineHeight: "1.6" }}>
                  {/* {user.bio ? (
                    user.bio
                  ) : (
                    <Fragment>(No Bio Available)</Fragment>
                  )} */}
                  {userDet && userDet.bio ? (
                    userDet.bio
                  ) : (
                    <Fragment>
                      <p>No Bio Available</p>
                    </Fragment>
                  )}
                </h6>
              </div>
              <div className="myservice">
                <div className="myserviceprofile">
                  <h5
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    services:
                  </h5>
                </div>
                {/* <MyServices /> */}
                <div className="myServiceCards">
                  {userDet.services &&
                    userDet.services.map((service) => (
                      <div key={service._id} className="myServiceCard">
                        <Link to={`/service/${service._id}`}>
                          <img
                            src={service.images[0].url}
                            alt="serviceImg"
                            className="imgservice"
                          />
                        </Link>
                        <div className="card-content">
                          <h5 className="nameh5">{service.user[0].fullname}</h5>
                          <Link
                            to={`/service/${service._id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <h2
                              className="titleh2"
                              style={{ lineHeight: "1.6" }}
                            >
                              {service.title}
                            </h2>
                          </Link>
                          <div className="reviewPrice">
                            <div className="ratings">
                              <div className="starRating">
                                <FaStar size="22" color="orange" />

                                <div className="serviceRating">
                                  {service.ratings}
                                </div>
                              </div>
                              <br />
                              <div className="no_of_reviews">
                                {" "}
                                ({service.numOfReviews} Reviews)
                              </div>
                            </div>
                            <h2 className="priceh2">Rs.{service.price}</h2>
                          </div>
                          <div
                            className="cardetailsbtn"
                            style={{ margin: "1rem 0 0.5rem 0" }}
                          >
                            <Link to={`/service/${service._id}`}>
                              <button className="card-btn-detail">
                                View details
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
