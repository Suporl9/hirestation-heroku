import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  FETCH_SERVICE_DETAILS_RESET_ERROR,
  UPDATE_SERVICE_CLEAR_ERROR,
  UPDATE_SERVICE_RESET,
} from "../redux/constants/Constants";
import {
  getServiceDetails,
  updateService,
} from "../redux/service/serviceActions";
import { SideBar } from "./SideBar";
import MetaData from "../layout/metaData";
export const UpdateService = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const {
    //    loading,
    service,
    error,
  } = useSelector((state) => state.serviceDetails);
  const {
    isUpdated,
    error: updateError,
    loading,
  } = useSelector((state) => state.deleteOrUpdateService);
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    //if condition because.the id seems to be updating all the time and rerendering..so when id of product  is not equal to the id in state(which will be empty at first) it will call the service details after its equal id doesnot run again and the values are set
    if (service && service._id !== id) {
      dispatch(getServiceDetails(id));
    } else {
      setTitle(service.title);
      setPrice(service.price);
      setDescription(service.description);
      setCategory(service.category);
      setOldImages(service.images);
    }

    if (error) {
      alert.error(error);
      dispatch({ type: FETCH_SERVICE_DETAILS_RESET_ERROR });
    }
    if (updateError) {
      alert.error(updateError);
      dispatch({ type: UPDATE_SERVICE_CLEAR_ERROR });
    }
    if (isUpdated) {
      history.push("/dashboard/services");
      alert.success("Service Updated!!");
      dispatch({ type: UPDATE_SERVICE_RESET });
    }
  }, [service, dispatch, id, alert, error, updateError, isUpdated, history]);

  const Categories = [
    "Graphics-And-Design",
    "Game-Development",
    "Web-Programming",
    "Mobile-Apps",
  ];

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("title", title);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);

    images.forEach((image) => {
      formData.append("images", image); //to not overwrite and push at the end we use append instead of .set
    });

    dispatch(updateService(service._id, formData));
  };
  return (
    <div className="bg">
      <MetaData title={`Update Service`} />

      <div className="sideBarAndDash">
        <SideBar />
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
                  Update Service :
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
                    {oldImages &&
                      oldImages.map((oldImage, i) => (
                        <img
                          key={i}
                          src={oldImage.url}
                          alt="oldImage"
                          width="55"
                          height="52"
                          style={{ marginRight: "2%", borderRadius: "5px" }}
                        />
                      ))}

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
                  UPDATE
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
