/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { NEW_REVIEW_RESET } from "../redux/constants/Constants";
import { clearErrors, newReview } from "../redux/service/serviceActions";

export const PopUp = ({ handleClose, id }) => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.newReview);
  const alert = useAlert();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  // const history = useHistory();
  const reviewSubmitHandler = () => {
    if (comment === "" || rating === null) {
      return alert.error("please enter all fields!");
    }
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("serviceId", id);

    dispatch(newReview(formData));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Updated");
      // history.push(`/service/${id}`);
      dispatch({ type: NEW_REVIEW_RESET });
      handleClose();
    }
  }, [error, alert, dispatch, id, handleClose, success]);
  return (
    <Fragment>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={handleClose}>
            x
          </span>
          <div className="starRatings">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar
                    className="star"
                    color={
                      ratingValue <= (hover || rating) ? "orange" : "#ffffff"
                    }
                    size={50}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
          <div className="starRaings">
            <textarea
              id="message"
              value={comment}
              name="message"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="cardbtn3">
            <button className="card-btn3" onClick={reviewSubmitHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
