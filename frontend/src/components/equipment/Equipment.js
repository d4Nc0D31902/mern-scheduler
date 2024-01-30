import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Remove 'useHistory'
import "../../Equipment.css";

const Equipment = ({ equipment }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) =>
      equipment.stock > 0
        ? Math.min(prevQuantity + 1, equipment.stock)
        : prevQuantity
    );
  };

  const handleBorrowClick = () => {
    // Navigate to the borrow page and pass state using useNavigate
    navigate("/equipment/borrow", {
      state: {
        equipment: equipment,
        stock: quantity, // Update the key here
      },
    });
  };

  return (
    <div
      className="card col-lg-12 col-md-12"
      style={{ maxWidth: "450px", marginBottom: "125px" }}
    >
      <img
        src={equipment.images[0].url}
        className="card-img-top"
        alt={equipment.name}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{equipment.name}</h5>
        <p className="card-text">{equipment.description}</p>
        <p className="card-stock">
          <small className="text-muted">
            Available Stock: {equipment.stock}
          </small>
        </p>
        <p className="card-stock">
          <small className="text-muted">Quantity</small>
        </p>
        <div className="quantity-control">
          <button
            className="btn btn-outline-secondary"
            onClick={decreaseQuantity}
            disabled={quantity === 1 || equipment.stock === 0}
          >
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button
            className="btn btn-outline-secondary"
            onClick={increaseQuantity}
            disabled={quantity === equipment.stock || equipment.stock === 0}
          >
            +
          </button>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleBorrowClick}
          disabled={equipment.stock === 0}
        >
          Borrow
        </button>
      </div>
    </div>
  );
};

export default Equipment;
