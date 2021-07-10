import React, { Fragment, useEffect, useState } from "react";
// import img from "../lowimgs/1.JPG";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import defaultImg from "../LoginandRegister/img/default.png";
import { loadUser, updateUser } from "../redux/user/userAction";
import { USER_PROFILE_UPDATE_RESET } from "../redux/constants/Constants";
import { Loader } from "../layout/Loader";
import MetaData from "../layout/metaData";

export const UpdateForm = () => {
  const history = useHistory();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [place, setPlace] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(defaultImg);
  const { user, loading } = useSelector((state) => state.auth);
  const { isUpdated } = useSelector((state) => state.userUpdate);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFullName(user.fullname);
      setEmail(user.email);
      setBio(user.bio);
      setPlace(user.from);
      setAvatarPreview(user.avatar && user.avatar.url);
    }
    if (isUpdated) {
      dispatch(loadUser());
      history.push("/me");

      dispatch({ type: USER_PROFILE_UPDATE_RESET });
    }
  }, [dispatch, history, user, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("fullname", fullname);
    formData.set("email", email);
    formData.set("bio", bio);
    formData.set("from", place);

    formData.set("avatar", avatar);
    dispatch(updateUser(formData));
  };
  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    // reader.readAsDataURL(e.target.files[0]);
    // console.log("reader:", reader.readAsDataURL);
  };

  return (
    <Fragment>
      <div className="bg">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title={`Update User`} />

            <form onSubmit={submitHandler} encType="multipart/form-data">
              <div className="myprofilebodyupdate">
                <div className="profilecardsleftupdate">
                  <div className="firstprofilecard">
                    <div className="usercredentials">
                      <img
                        src={avatarPreview}
                        alt="ProfileP"
                        style={{
                          height: "100px",
                          width: "100px",
                          borderRadius: "50%",
                          marginBottom: "10%",
                        }}
                      />
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="avatar"
                        className="custom-file-input"
                        id="customFile"
                        accept="image/*"
                        onChange={onChange}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFile"
                        style={{ fontWeight: "bold", fontSize: "14px" }}
                      >
                        Choose Avatar(less then 700kb)
                      </label>
                    </div>
                  </div>
                </div>
                <div className="profilecardsrightupdate">
                  <div className="descriptionprofile">
                    <h4
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        margin: "0 0 3% 0",
                      }}
                    >
                      Update Profile
                    </h4>
                    {/* <form onSubmit={submitHandler} encType="multipart/form-data"> */}
                    <div className="input-container Full Name">
                      <label
                        htmlFor="fullname-field"
                        style={{ fontWeight: "bold", margin: "4% 0" }}
                      >
                        Full Name:
                      </label>
                      <input
                        className="fname"
                        name="fullname"
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullName(e.target.value)}
                      ></input>
                    </div>
                    <div className="input-container email">
                      <label
                        htmlFor="email-field"
                        style={{ fontWeight: "bold", margin: "4% 0" }}
                      >
                        Email:
                      </label>
                      <input
                        className="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                    <div className="input-container email">
                      <label
                        htmlFor="bio-field"
                        style={{ fontWeight: "bold", margin: "4% 0" }}
                      >
                        Bio:
                      </label>
                      <input
                        className="fname"
                        name="bio"
                        type="text"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      ></input>
                    </div>
                    <div className="input-container email">
                      <label
                        htmlFor="from-field"
                        style={{ fontWeight: "bold", margin: "4% 0" }}
                      >
                        From:
                      </label>
                      <input
                        className="fname"
                        name="bio"
                        type="text"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                      ></input>
                    </div>
                    <div
                      className="cardetailsbtn"
                      style={{ margin: "1rem 0 0.5rem 0" }}
                    >
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
                        SAVE
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
