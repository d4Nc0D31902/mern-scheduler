import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  newAnnouncement,
  clearErrors,
} from "../../actions/announcementActions";
import { NEW_ANNOUNCEMENT_RESET } from "../../constants/announcementConstants";

const NewAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.newAnnouncement
  );

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      // Display a success notification
      message("Announcement Posted");

      // Reset the component state
      setTitle("");
      setBody("");
      setImages([]);
      setImagesPreview([]);

      // Navigate to the announcements page or perform any other necessary action
      navigate("/announcements");

      // Reset the success state in the Redux store
      dispatch({ type: NEW_ANNOUNCEMENT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("title", title);
    formData.set("body", body);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newAnnouncement(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);

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

  return (
    <Fragment>
      <MetaData title={"New Announcement"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h3 className="card-title" style={{ fontFamily: "sans-serif", textAlign: "center", marginBottom: "10px", margin: "20px" }}>
                  <img src="/images/tupt_logo.png" style={{ width: "100px", height: "100px", marginRight: "25px" }} alt="Logo" />
                  TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
                </h3>
                <h1 className="mb-4 text-center " style={{ backgroundColor: "maroon", padding: "20px", borderRadius: "20px", color: "white" }}>New Announcement</h1>

                <div className="form-group">
                  <label htmlFor="title_field">Title:</label>
                  <input
                  placeholder="Put title ex.(ACSO WEEK HAPPENINGS) etc."
                    type="text"
                    id="title_field"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="body_field">Caption:</label>
                  <textarea
                  placeholder="Add a caption here"
                    className="form-control"
                    id="body_field"
                    rows="8"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Upload Images</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  POST
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewAnnouncement;
