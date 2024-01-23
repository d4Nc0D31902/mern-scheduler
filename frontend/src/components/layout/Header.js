import React, { Fragment } from "react";
import "../../App.css";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img
                src="/images/tupt_logo.png"
                style={{ width: "100px", height: "auto" }}
                alt="Logo"
              />
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              <i className="fa fa-shopping-basket"></i>
              Cart
              <span className="ml-1" id="cart_count">
                {cartItems.length}
              </span>
            </span>
          </Link>

          <Link to="/calendar" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              <i className="fa fa-calendar"></i>
              Calendar
            </span>
          </Link>

          <Link to="/announcements" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              <i className="fa fa-bullhorn"></i>
              Announcements
            </span>
          </Link>

          <Link to="/equipmentz" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              <i className="fa fa-folder-open"></i>
              Equipment
            </span>
          </Link>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>

                <span>{user && user.name}</span>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}

                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>

                <Link className="dropdown-item" to="/appointments/me">
                  Appointments
                </Link>

                <Link className="dropdown-item" to="/equipment/me">
                  Borrowed
                </Link>

                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>

                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
