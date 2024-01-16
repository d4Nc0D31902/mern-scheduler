import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducers";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
  customerSalesReducer,
  googleLoginReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderReducer,
} from "./reducers/orderReducers";
import {
  newAppointmentReducer,
  myAppointmentsReducer,
  appointmentDetailsReducer,
  allAppointmentsReducer,
  appointmentReducer,
} from "./reducers/appointmentReducers";
import {
  newLocationReducer,
  myLocationsReducer,
  locationDetailsReducer,
  allLocationsReducer,
  locationReducer,
} from "./reducers/locationReducers";
import {
  newSportReducer,
  mySportsReducer,
  sportDetailsReducer,
  allSportsReducer,
  sportReducer,
} from "./reducers/sportReducers";
import {
  newAnnouncementReducer,
  myAnnouncementsReducer,
  announcementDetailsReducer,
  allAnnouncementsReducer,
  announcementReducer,
} from "./reducers/announcementReducers";
import {
  newEquipmentReducer,
  myEquipmentsReducer,
  equipmentDetailsReducer,
  allEquipmentsReducer,
  equipmentReducer,
} from "./reducers/equipmentReducers";
import {
  salesPerMonthReducer,
  productSalesReducer,
} from "./reducers/chartReducers";

import { settingsReducer } from "./reducers/settingsReducers";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  googleLogin: googleLoginReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  customerSales: customerSalesReducer,
  salesPerMonth: salesPerMonthReducer,
  productSales: productSalesReducer,
  newAppointment: newAppointmentReducer,
  myAppointments: myAppointmentsReducer,
  appointmentDetails: appointmentDetailsReducer,
  allAppointments: allAppointmentsReducer,
  appointment: appointmentReducer,
  newLocation: newLocationReducer,
  myLocations: myLocationsReducer,
  locationDetails: locationDetailsReducer,
  allLocations: allLocationsReducer,
  newSport: newSportReducer,
  mySports: mySportsReducer,
  sportDetails: sportDetailsReducer,
  allSports: allSportsReducer,
  newAnnouncement: newAnnouncementReducer,
  myAnnouncements: myAnnouncementsReducer,
  announcementDetails: announcementDetailsReducer,
  allAnnouncements: allAnnouncementsReducer,
  newEquipment: newEquipmentReducer,
  myEquipments: myEquipmentsReducer,
  equipmentDetails: equipmentDetailsReducer,
  allEquipments: allEquipmentsReducer,
  settings: settingsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
