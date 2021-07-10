import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../layout/Loader";
import {
  addCartItemSession,
  deleteCartItem,
  getCartItems,
} from "../redux/cart/cartActions";
import { ReactComponent as Bin } from "./ntrash.svg";
import { Link, useHistory } from "react-router-dom";
import { CLEAR_MESSAGE } from "../redux/constants/Constants";
import MetaData from "../layout/metaData";
export const MyWishList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, cartItems, cartItemsCount } = useSelector(
    (state) => state.getCart
  );
  const { message, loadingg } = useSelector((state) => state.deleteCartItem);

  const deleteHandler = (id) => {
    dispatch(deleteCartItem(id));
    history.push("/myWishList");
  };

  useEffect(() => {
    dispatch(getCartItems());
    if (message) {
      history.push("/myWishList");
      dispatch({ type: CLEAR_MESSAGE });
    } //clear up the message in state
  }, [dispatch, history, message]);
  const AddItemToSession = (cartItem) => {
    dispatch(addCartItemSession(cartItem));
  };

  return (
    <div className="bg">
      <MetaData title={`My WishList`} />
      <div className="myprofilebodyforspan">
        <span style={{ fontWeight: "bold", fontSize: "30px" }}>
          My WishList:
        </span>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="myprofilebody1">
            {cartItems.length > 0 ? (
              <Fragment>
                <div className="h1andmyitemscardleft">
                  <div className="myitemscardleft">
                    <div className="gigstitleandphoto">
                      {cartItems &&
                        cartItems.map((cartItem) => (
                          <div key={cartItem._id} className="cardleft">
                            <div className="titleandphoto">
                              <Link
                                to={`/service/${
                                  cartItem.service && cartItem.service._id
                                }`}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                <img
                                  src={
                                    cartItem.service &&
                                    cartItem.service.images[0].url
                                  }
                                  alt="gig"
                                  style={{
                                    height: "100px",
                                    width: "120px",
                                    borderRadius: "5px",
                                  }}
                                />
                              </Link>
                              <span className="titlerow">
                                <Link
                                  to={`/service/${
                                    cartItem.service && cartItem.service._id
                                  }`}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  {cartItem.service && cartItem.service.title}
                                </Link>
                              </span>
                              {/* </Link> */}
                            </div>

                            <h2 style={{ marginTop: "20px" }}>
                              Rs.{cartItem.service && cartItem.service.price}
                            </h2>
                            <div className="btns">
                              <button
                                className="binclass"
                                onClick={() => deleteHandler(cartItem._id)}
                                disabled={loadingg ? true : false}
                              >
                                <Bin />
                              </button>
                              <Link
                                to="/order"
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                <button
                                  className="card-btn1"
                                  style={{ marginLeft: "5%" }}
                                  onClick={() => AddItemToSession(cartItem)}
                                >
                                  Order Now!
                                </button>
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="h1andmyitemscardleft">
                  <div className="myitemscardleft">
                    <div className="nogigscart">
                      <h2>WishList is Empty.</h2>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
            <div className="myitemscardright">
              <span style={{ fontWeight: "bold", fontSize: "25px" }}>
                Summary:
              </span>
              <div className="hl" style={{ marginBottom: "10%" }}></div>
              <div className="subtotal">
                <h5 className="h6bold">Subtotal:</h5>
                <h5 className="h6bold">{cartItemsCount}(units)</h5>
              </div>
              <div className="subtotal">
                <h5 className="h6bold">Total Price:</h5>
                <h5 className="h6bold">
                  Rs.
                  {cartItems &&
                    cartItems.reduce(
                      (acc, item) => item.service.price + acc,
                      0
                    )}
                </h5>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
