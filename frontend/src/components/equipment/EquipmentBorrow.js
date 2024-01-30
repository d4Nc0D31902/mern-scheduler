import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newBorrow, clearErrors } from "../../actions/borrowActions";
import { NEW_BORROW_RESET } from "../../constants/borrowConstants";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const EquipmentBorrow = () => {
  const [equipment, setEquipment] = useState({ name: "" });
  const [quantity, setQuantity] = useState(1);
  const [reasonBorrow, setReasonBorrow] = useState("");
  const [dateBorrow, setDateBorrow] = useState(formatDate(new Date()));
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newBorrow);

  const navigate = useNavigate();
  const location = useLocation();
  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    const stateEquipment = location.state?.equipment || { name: "" };
    const stateStock = location.state?.stock || 1;

    setEquipment(stateEquipment);
    setQuantity(stateStock);
  }, [location.state]);

  function formatDate(date) {
    const isoString = date.toISOString();
    return isoString.slice(0, isoString.length - 8);
  }

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      setErrors({ serverError: error });
    }

    if (success) {
      navigate("/admin/borrows");
      message("Borrow created successfully");
      dispatch({ type: NEW_BORROW_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors({});

    const errors = {};

    if (quantity <= 0) {
      errors.quantity = "Quantity must be greater than 0";
    }

    if (!reasonBorrow) {
      errors.reasonBorrow = "Please select a reason for borrowing";
    }

    if (!dateBorrow) {
      errors.dateBorrow = "Please select a date for borrowing";
    }

    if (Object.keys(errors).length === 0) {
      if (equipment.status === "Pending") {
        toast.info("Borrow request is still pending approval", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        return;
      }

      setShowModal(true);
    } else {
      setErrors(errors);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (agreeChecked) {
      const borrowData = {
        equipment: equipment.name,
        quantity,
        reason_borrow: reasonBorrow,
        date_borrow: dateBorrow,
        reason_status: "N/A", // Replace with the actual reason_status value
      };

      dispatch(newBorrow(borrowData))
        .then(() => {
          navigate("/equipmentz");
          message("Borrow Request Successful");
        })
        .catch((error) => {
          console.error("Error creating borrow:", error);
        });
    }
  };

  return (
    <Fragment>
      <MetaData title={"New Borrow"} />
      <div className="row">
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h3
                  className="card-title"
                  style={{
                    fontFamily: "sans-serif",
                    textAlign: "center",
                    marginBottom: "10px",
                    margin: "20px",
                  }}
                >
                  <img
                    src="/images/tupt_logo.png"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginRight: "25px",
                    }}
                    alt="Logo"
                  />
                  TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
                </h3>
                <h1
                  className="mb-4 text-center"
                  style={{
                    backgroundColor: "maroon",
                    padding: "20px",
                    borderRadius: "20px",
                    color: "white",
                  }}
                >
                  Borrowing Form
                </h1>
                <div className="form-group">
                  <label htmlFor="equipment_field">Equipment</label>
                  <input
                    type="text"
                    id="equipment_field"
                    className="form-control"
                    value={equipment.name}
                    onChange={(e) => setEquipment({ name: e.target.value })}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity_field">Quantity</label>
                  <input
                    type="number"
                    id="quantity_field"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  {errors.quantity && (
                    <div className="text-danger">{errors.quantity}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="reason_borrow_field">Reason for Borrow</label>
                  <select
                    id="reason_borrow_field"
                    className="form-control"
                    value={reasonBorrow}
                    onChange={(e) => setReasonBorrow(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a Reason
                    </option>
                    <option value="PE Class">PE Class</option>
                    <option value="For Play">For Play</option>
                    <option value="For Event">For Event</option>
                  </select>
                  {errors.reasonBorrow && (
                    <div className="text-danger">{errors.reasonBorrow}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="date_borrow_field">Date of Borrow</label>
                  <input
                    type="datetime-local"
                    id="date_borrow_field"
                    className="form-control"
                    value={dateBorrow}
                    onChange={(e) => setDateBorrow(e.target.value)}
                  />
                  {errors.dateBorrow && (
                    <div className="text-danger">{errors.dateBorrow}</div>
                  )}
                </div>
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  BORROW
                </button>
                {errors.serverError && (
                  <div className="text-danger">{errors.serverError}</div>
                )}
              </form>
            </div>
          </Fragment>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This is the content of the Terms and Conditions.</p>
          <Form.Check
            type="checkbox"
            label="I agree to the Terms and Conditions"
            checked={agreeChecked}
            onChange={(e) => setAgreeChecked(e.target.checked)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleCloseModal}
            disabled={!agreeChecked}
          >
            Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EquipmentBorrow;
