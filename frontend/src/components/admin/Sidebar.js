import React from "react";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/admin/announcement">
              <i className="fa fa-bullhorn"></i> Announcement
            </Link>
          </li>
          <li>
            <a
              href="#appointmentSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-calendar"></i> Appointments
            </a>

            <ul className="collapse list-unstyled" id="appointmentSubmenu">
              <li>
                <Link to="/admin/appointments">
                  <i className="fa fa-clipboard"></i> All
                </Link>
              </li>
              <li>
                <Link to="/admin/locations">
                  <i className="fa fa-thumb-tack"></i> Location
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/admin/borrows">
              <i className="fa fa-bullhorn"></i> Borrow Requests
            </Link>
          </li>
          {/* <li>
            <Link to="/admin/equipments">
              <i className="fa fa-archive"></i> Equipment
            </Link>
          </li> */}
          <li>
            <a
              href="#equipmentSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-archive"></i> Equipments
            </a>

            <ul className="collapse list-unstyled" id="equipmentSubmenu">
              <li>
                <Link to="/admin/equipments">
                  <i className="fa fa-clipboard"></i> All
                </Link>
              </li>
              <li>
                <Link to="/admin/sports">
                  <i className="fa fa-thumb-tack"></i> Sport
                </Link>
              </li>
            </ul>
          </li>

          {/* <li>
            <Link to="/admin/sports">
              <i className="fa fa-dribbble"></i> Sport
            </Link>
          </li> */}

          <li>
            <Link to="/dashboard">
              <i className="fa fa-tachometer"></i> Merch Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>
          <li>
            <a
              href="#productSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-product-hunt"></i> Products
            </a>

            <ul className="collapse list-unstyled" id="productSubmenu">
              <li>
                <Link to="/admin/products">
                  <i className="fa fa-clipboard"></i> All
                </Link>
              </li>
              <li>
                <Link to="/admin/product">
                  <i className="fa fa-plus"></i> Create
                </Link>
              </li>
              <li>
                <Link to="/admin/categories">
                  <i className="fa fa-plus"></i> Categories
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/admin/reviews">
              <i className="fa fa-star"></i> Reviews
            </Link>
          </li>
          <li>
            <Link to="/settings/6581a5b1466cfcabab4cc84f">
              <i className="fa fa-gear"></i> Settings
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>

          {/* <li>
            <Link to="/admin/appointments">
              <i className="fa fa-calendar"></i> Appointments
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
