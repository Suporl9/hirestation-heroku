import React, { useEffect, useState } from "react";
import { SideBar } from "./SideBar";
// import imgsrc from "./1.JPG";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router";
import {
  NEW_SERVICE_FAIL_RESET,
  NEW_SERVICE_RESET,
  // NEW_SERVICE_FAIL_RESET,
} from "../redux/constants/Constants";
import { addNewService } from "../redux/service/serviceActions";
import { Button } from "react-bootstrap";
import MetaData from "../layout/metaData";
export const NewService = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.newService);

  const history = useHistory();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: NEW_SERVICE_FAIL_RESET });
    }

    if (success) {
      history.push("/dashboard/services");
      alert.success("Services Created!!");
      dispatch({ type: NEW_SERVICE_RESET });
    }
  }, [alert, error, success, history, dispatch]);

  const Categories = [
    "Graphics-And-Design",
    "Game-Development",
    "Web-Programming",
    "Mobile-Apps",
  ];

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("title", title);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    images.forEach((image) => {
      formData.append("images", image); //not .set because it would overwrite the key/valuepairs and witht append it adds to the existing key/value pairs
    });
    dispatch(addNewService(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    //array.form creates an array froma array-like obj  expected output =[file,file,file]

    setImages([]); //if not emptied  previous array items remain there if user tries to add new images
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prevArray) => [...prevArray, reader.result]); //saving previous image with spread oprator and adding new items in that array

          setImages((prevArray) => [...prevArray, reader.result]);
        }
      };
      reader.readAsDataURL(file); //this gives us the data url of the blod file i.e(image)
    });
  };
  return (
    <div className="bg">
      <MetaData title={`New Service`} />

      <div className="sideBarAndDash">
        <SideBar servicees />
        <div className="tabpanel">
          <div className="dashboardflexnew">
            <div className="newServiceBg">
              <form encType="multipart/form-data" onSubmit={submitHandler}>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "25px",
                    margin: "4% 0 4% 0",
                    textTransform: "uppercase",
                  }}
                >
                  New Service :
                </span>

                <div className="gigtitle">
                  <label htmlFor="title-field" className="labelname">
                    Title
                  </label>
                  <input
                    className="gigtinput"
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="gigtitle pricee">
                  <label htmlFor="price-field" className="labelname">
                    Price
                  </label>
                  <input
                    className="gigpinput"
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label
                    htmlFor="youridhere"
                    className="static-value"
                    style={{ color: "black" }}
                  >
                    Rs.
                  </label>
                </div>
                <div className="gigtitle">
                  <label htmlFor="description-field" className="labelname">
                    Description
                  </label>
                  <textarea
                    id="message"
                    value={description}
                    name="message"
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ backgroundColor: "rgb(210, 216, 216)" }}
                    placeholder="Description"
                  />
                </div>
                <div className="gigtitle1">
                  <label
                    htmlFor="category-field"
                    className="labelname categori"
                  >
                    Category
                  </label>
                  <select
                    className="gigsinput"
                    name="description"
                    type="text"
                    // value={""}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {Categories.map((categori) => (
                      <option key={categori} className="optionc">
                        {categori}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="gigtitle">
                  <label htmlFor="images-field" className="labelname">
                    Images:
                  </label>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="service_images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="customFile"
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        backgroundColor: "rgb(210, 216, 216)",
                      }}
                    >
                      Images(less then 700kb)
                    </label>
                  </div>
                </div>
                <div className="gigtitle">
                  <div className="imgpreviewcontainer">
                    {imagesPreview.map((img, i) => (
                      <img
                        src={img}
                        key={i}
                        alt="ServiceImage"
                        width="55"
                        height="52"
                        style={{ marginRight: "2%", borderRadius: "5px" }}
                      />
                    ))}

                    {/* <img
                      src={imgsrc}
                      alt="ServiceImage[0]"
                      width="55"
                      height="52"
                      style={{ marginRight: "2%", borderRadius: "5px" }}
                    /> */}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="card-btn-det"
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
                  POST SUBMIT
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
