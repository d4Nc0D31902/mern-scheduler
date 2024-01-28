import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";

import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import store from "./store";

import Calendar from "./components/calendar/Calendar";
import Appointment from "./components/appointment/Appointment";
import AppointmentList from "./components/appointment/AppointmentList";
import UpdateAppointment from "./components/appointment/UpdateAppointment";
import MyAppointment from "./components/appointment/MyAppointment";
// import ProcessAppointment from "./components/admin/ProcessAppointment.js";

import LocationList from "./components/location/LocationList";
import NewLocation from "./components/admin/NewLocation";
import UpdateLocation from "./components/admin/UpdateLocation";

import SportList from "./components/admin/SportList";
import NewSport from "./components/admin/NewSport";
import UpdateSport from "./components/admin/UpdateSport";

import EquipmentList from "./components/admin/EquipmentList";
import NewEquipment from "./components/admin/NewEquipment";
import UpdateEquipment from "./components/admin/UpdateEquipment";

import BorrowList from "./components/admin/BorrowList.js";
import UpdateBorrow from "./components/admin/UpdateBorrow.js";

import Settings from "./components/admin/SettingsComponent.js";

import NewAnnouncement from "./components/admin/NewAnnouncement.js";
import AllAnnouncement from "./components/announcement/AllAnnouncement";
import AnnouncementCard from "./components/announcement/AnnouncementCard";
import UpdateAnnouncement from "./components/admin/UpdateAnnouncement.js";

import EquipmentContainer from "./components/equipment/EquipmentContainer.js";
import EquipmentBorrow from "./components/equipment/EquipmentBorrow.js";
import MyBorrow from "./components/equipment/MyBorrow.js";

import CategoryList from "./components/admin/CategoryList.js";
import NewCategory from "./components/admin/NewCategory.js";
import UpdateCategory from "./components/admin/UpdateCategory.js";


import HomePage from "./components/homepage/HomePage.js";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/store" element={<Home />} exact="true" />
        <Route path="/" element={<HomePage />} exact="true" />
        <Route path="/product/:id" element={<ProductDetails />} exact="true" />
        <Route
          path="/equipmentz"
          element={<EquipmentContainer />}
          exact="true"
        />
        <Route
          path="/equipment/borrow"
          element={<EquipmentBorrow />}
          exact="true"
        />
        <Route path="/search/:keyword" element={<Home />} exact="true" />
        <Route path="/login" element={<Login />} exact="true" />
        <Route path="/register" element={<Register />} exact="true" />
        <Route
          path="/password/forgot"
          element={<ForgotPassword />}
          exact="true"
        />
        <Route
          path="/password/reset/:token"
          element={<NewPassword />}
          exact="true"
        />
        <Route path="/cart" element={<Cart />} exact="true" />
        <Route path="/" element={<Home />} exact="true" />
        <Route path="/calendar" element={<Calendar />} exact="true" />
        <Route path="/request" element={<Appointment />} exact="true" />

        <Route
          path="/appointments/me"
          element={
            <ProtectedRoute>
              <MyAppointment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/equipment/me"
          element={
            <ProtectedRoute>
              <MyBorrow />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/appointments/"
          element={
            <ProtectedRoute isAdmin={true}>
              <AppointmentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/borrows/"
          element={
            <ProtectedRoute isAdmin={true}>
              <BorrowList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/equipments/"
          element={
            <ProtectedRoute isAdmin={true}>
              <EquipmentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/6581a5b1466cfcabab4cc84f"
          element={
            <ProtectedRoute isAdmin={true}>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/locations/"
          element={
            <ProtectedRoute isAdmin={true}>
              <LocationList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/location"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewLocation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/equipment"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewEquipment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/equipment/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateEquipment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/borrow/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateBorrow />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/sport"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewSport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/category"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/sports"
          element={
            <ProtectedRoute isAdmin={true}>
              <SportList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute isAdmin={true}>
              <CategoryList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/announcement"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewAnnouncement />
            </ProtectedRoute>
          }
        />
        <Route path="/announcements" element={<AllAnnouncement />} />

        <Route
          path="/admin/appointment/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateAppointment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/announcement/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateAnnouncement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/location/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateLocation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/sport/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateSport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/category/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/location"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewLocation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
          exact="true"
        />

        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
          exact="true"
        />

        <Route
          path="/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/me"
          element={
            <ProtectedRoute>
              <ListOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrdersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductReviews />
            </ProtectedRoute>
          }
        />



      </Routes>
      {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}
    </div>
  );
}

export default App;
