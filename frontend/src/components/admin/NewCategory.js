import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newCategory, clearErrors } from "../../actions/categoryActions"; // Updated import
import { NEW_CATEGORY_RESET } from "../../constants/categoryConstants"; // Updated import

const NewCategory = () => {
  // Updated component name
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newCategory); // Updated state variable name

  const navigate = useNavigate();
  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/categories"); // Updated path
      message("Category created successfully"); // Updated success message
      dispatch({ type: NEW_CATEGORY_RESET }); // Updated reset action type
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const categoryData = {
      // Updated variable name
      name,
    };

    dispatch(newCategory(categoryData)); // Updated action
  };

  return (
    <Fragment>
      <MetaData title={"New Category"} /> {/* Updated title */}
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">New Category</h1> {/* Updated heading */}
                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewCategory; // Updated export
