import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import MetaData from "./layout/MetaData";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loader from "./layout/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  let { keyword } = useParams();

  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/categories`
        );
        const allCategory = { _id: "", name: "All" }; // Manually include the "All" category
        const filteredCategories = response.data.categories.filter(
          (category) => category.status === "active"
        );
        setCategories([allCategory, ...filteredCategories]); // Add "All" category to the beginning of the array
      } catch (error) {
        notify("Error fetching categories");
        console.error("Error fetching categories:", error);
      }
    };

    if (error) {
      notify(error);
    }

    fetchCategories();
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, error, currentPage, keyword, price, category]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const handleCategoryClick = (clickedCategory) => {
    setCategory((prevCategory) =>
      prevCategory === clickedCategory ? "" : clickedCategory
    );
  };

  let count = productsCount;

  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Schedule Now!"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-6 col-md-3 mt-5 mb-5">
                <div className="px-5">
                  <Range
                    marks={{
                      1: `₱1`,
                      1000: `₱1000`,
                    }}
                    min={1}
                    max={1000}
                    defaultValue={[1, 1000]}
                    tipFormatter={(value) => `$${value}`}
                    tipProps={{
                      placement: "top",
                      visible: true,
                    }}
                    value={price}
                    onChange={(price) => setPrice(price)}
                  />
                  <hr className="my-5" />
                  <div className="mt-5">
                    <h4 className="mb-3">Categories</h4>
                    <ul className="pl-0">
                      {categories.map((categoryItem) => (
                        <li
                          style={{
                            cursor: "pointer",
                            listStyleType: "none",
                          }}
                          key={categoryItem._id}
                          onClick={() => handleCategoryClick(categoryItem.name)}
                        >
                          {categoryItem.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-6 col-md-9">
                <div className="row">
                  {products
                    // .filter(
                    //   (product) =>
                    //     product.stock > 0 && product.status !== "Out of Stock"
                    // )
                    .map((product) => (
                      <Product key={product._id} product={product} col={4} />
                    ))}
                </div>
              </div>
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
