import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  allCategories, // Updated import
  clearErrors,
  deleteCategory, // Updated import
} from "../../actions/categoryActions"; // Updated import
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants"; // Updated import

const CategoriesList = () => {
  // Updated component name
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, categories } = useSelector(
    (state) => state.allCategories
  ); // Updated state variable names
  const { isDeleted } = useSelector((state) => state.category) || {}; // Updated state variable name
  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    dispatch(allCategories()); // Updated action
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      successMsg("Category deleted successfully"); // Updated success message
      navigate("/admin/categories"); // Updated navigation path
      dispatch({ type: DELETE_CATEGORY_RESET }); // Updated reset action type
    }
  }, [dispatch, error, navigate, isDeleted]);

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id)); // Updated action
  };

  const setCategories = () => {
    const data = {
      columns: [
        // {
        //   label: "Category ID", // Updated label
        //   field: "id",
        //   sort: "asc",
        // },
        {
          label: "Name", // Updated label
          field: "name",
          sort: "asc",
        },
        {
          label: "Actions", // Updated label
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    if (categories) {
      categories.forEach((category) => {
        // Updated variable name
        data.rows.push({
          // id: category._id, // Updated variable name
          name: category.name, // Updated variable name
          actions: (
            <Fragment>
              <Link
                to={`/admin/category/${category._id}`} // Updated path
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteCategoryHandler(category._id)} // Updated variable name
              >
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
          ),
        });
      });
    }

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Categories"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="my-5">All Categories</h1> {/* Updated heading */}
              <Link to="/admin/category" className="btn btn-primary">
                {" "}
                {/* Updated path and label */}
                Create Category
              </Link>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setCategories()} // Updated function name
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default CategoriesList; // Updated export
