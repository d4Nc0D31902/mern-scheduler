import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";
import { clearCart } from "../../actions/cartActions";

const Payment = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  const [paymentMethod, setPaymentMethod] = useState("Walk-In");
  const [referenceNum, setReferenceNum] = useState(""); // State for Reference #
  const [referenceNumError, setReferenceNumError] = useState(""); // State for Reference # Error

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
    paymentMeth: paymentMethod,
    reference_num: referenceNum, // Include reference number in the order object
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const validateReferenceNum = () => {
    if (paymentMethod === "GCash" && referenceNum.length !== 13) {
      setReferenceNumError("Reference # must be exactly 13 numbers");
      return false;
    } else {
      setReferenceNumError("");
      return true;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;

    // Validate reference number before submitting the form
    if (!validateReferenceNum()) {
      return;
    }

    order.paymentInfo = {
      id: "pi_1DpdYh2eZvKYlo2CYIynhU32",
      status: "succeeded",
    };
    dispatch(createOrder(order));
    dispatch(clearCart());
    navigate("/success");
  };

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label">Select Payment Method:</label>
              <div>
                <input
                  type="radio"
                  id="walkIn"
                  name="paymentMethod"
                  value="Walk-In"
                  checked={paymentMethod === "Walk-In"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="walkIn" className="ml-2 mr-4">
                  Walk-In
                </label>
                <input
                  type="radio"
                  id="gcash"
                  name="paymentMethod"
                  value="GCash"
                  checked={paymentMethod === "GCash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="gcash" className="ml-2">
                  GCash
                </label>
              </div>
              {paymentMethod === "GCash" && (
                <Fragment>
                  <img
                    src="/images/qr.png"
                    alt="Schedule Icon"
                    style={{
                      width: "100%",
                      height: "100%",
                      marginBottom: "10px",
                    }}
                  />
                  <p>
                    <b>
                      *REMINDER! TAKE A SCREENSHOT OF YOUR REFERENCE #. NO
                      SCREENSHOT, NO TRANSACTION.*
                    </b>
                  </p>
                </Fragment>
              )}
            </div>

            {paymentMethod === "GCash" && (
              <div className="mb-3">
                <label htmlFor="referenceNum" className="form-label">
                  Reference #:
                </label>
                <input
                  type="text"
                  id="referenceNum"
                  className={`form-control ${
                    referenceNumError ? "is-invalid" : ""
                  }`}
                  value={referenceNum}
                  onChange={(e) => setReferenceNum(e.target.value)}
                  onBlur={validateReferenceNum}
                  pattern="[0-9]{13}" // Pattern for exactly 13 numeric numbers
                  title="Reference # must be exactly 13 numeric numbers"
                />

                {referenceNumError && (
                  <div className="invalid-feedback">{referenceNumError}</div>
                )}
              </div>
            )}
            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              ORDER {` - ₱${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
