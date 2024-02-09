import React, { Fragment, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, clearErrors } from "../../actions/productActions";

const ProductsList = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Claimed":
        return "green";
      case "Restocked":
        return "green";
      case "Deducted":
        return "red";
      default:
        return "black";
    }
  };

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Quantity",
          field: "quantity",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Witnessed By",
          field: "by",
          sort: "asc",
        },
        {
          label: "Created At",
          field: "createdAt",
          sort: "asc",
        },
      ],
      rows: [],
    };

    if (products && products.length > 0) {
      products.forEach((product) => {
        product.stockHistory.forEach((historyEntry) => {
          data.rows.push({
            name: historyEntry.name,
            quantity: historyEntry.quantity,
            status: (
              <span style={{ color: getStatusColor(historyEntry.status) }}>
                {historyEntry.status}
              </span>
            ),
            by: historyEntry.by,
            createdAt: new Date(historyEntry.createdAt).toLocaleString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }
            ),
          });
        });
      });
    } else {
      console.log("Products data is empty or undefined.");
    }

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Products</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
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

export default ProductsList;
