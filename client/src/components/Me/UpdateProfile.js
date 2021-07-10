import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import avatarPreview from "../lowimgs/1.JPG";
import { avatarUpdate } from "../redux/user/userAction";

export const UpdateProfile = () => {
  const dispatch = useDispatch();
  const [previewAvatar, setPreviewAvatar] = useState(avatarPreview);
  const [fileInputState, setfileInputState] = useState("");
  // const [avatar, setAvatar] = useState("");
  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      //   console.log(reader.result);
      setPreviewAvatar(reader.result);
      console.log(JSON.stringify(previewAvatar));
    };
    setfileInputState(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(avatarUpdate(JSON.stringify(previewAvatar)));
  };
  return (
    <Fragment>
      <div className="bg">
        <form onSubmit={submitHandler}>
          <div className="input-container password">
            <label htmlFor="Avatar_upload">Avatar</label>
            <div className="avatarsection">
              <img
                src={previewAvatar}
                className="rounded-circle"
                alt="Avatar Preview"
                style={{
                  height: "40px",
                  width: "40px",
                  marginRight: "1rem",
                }}
              />

              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  value={fileInputState}
                  className="custom-file-input"
                  id="customFile"
                  accept="image/*"
                  onChange={onChange}
                />
                <label
                  className="custom-file-label"
                  htmlFor="customFile"
                  style={{ fontWeight: "bold" }}
                >
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>
          <button className="signup-btn" type="submit">
            Update AVATAR
          </button>
        </form>
      </div>
    </Fragment>
  );
};
