import axios from "axios";
import {
  NEW_BORROW_REQUEST,
  NEW_BORROW_SUCCESS,
  NEW_BORROW_FAIL,
  NEW_BORROW_RESET,
  MY_BORROWS_REQUEST,
  MY_BORROWS_SUCCESS,
  MY_BORROWS_FAIL,
  BORROW_DETAILS_REQUEST,
  BORROW_DETAILS_SUCCESS,
  BORROW_DETAILS_FAIL,
  ALL_BORROWS_REQUEST,
  ALL_BORROWS_SUCCESS,
  ALL_BORROWS_FAIL,
  UPDATE_BORROW_SUCCESS,
  UPDATE_BORROW_REQUEST,
  UPDATE_BORROW_FAIL,
  DELETE_BORROW_REQUEST,
  DELETE_BORROW_SUCCESS,
  DELETE_BORROW_FAIL,
  CLEAR_ERRORS,
  SET_BORROWS,
} from "../constants/borrowConstants.js";

export const newBorrow = (borrow) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_BORROW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/borrow/new`,
      borrow,
      config
    );
    dispatch({
      type: NEW_BORROW_SUCCESS,
      payload: data,
    });

    // Do not dispatch NEW_BORROW_RESET here, leave it to the component
  } catch (error) {
    dispatch({
      type: NEW_BORROW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myBorrows = () => async (dispatch) => {
  try {
    dispatch({ type: MY_BORROWS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/borrows/me`,
      { withCredentials: true }
    );
    dispatch({
      type: MY_BORROWS_SUCCESS,
      payload: data.borrows,
    });
  } catch (error) {
    dispatch({
      type: MY_BORROWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getBorrowDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BORROW_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/borrow/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: BORROW_DETAILS_SUCCESS,
      payload: data.borrow,
    });
  } catch (error) {
    dispatch({
      type: BORROW_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allBorrows = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BORROWS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/borrows`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ALL_BORROWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_BORROWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateBorrow =
  (id, borrowData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_BORROW_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/admin/borrow/${id}`,
        borrowData,
        config
      );
      dispatch({
        type: UPDATE_BORROW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_BORROW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteBorrow = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BORROW_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/borrow/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: DELETE_BORROW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BORROW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const setBorrows = (borrows) => ({
  type: SET_BORROWS,
  payload: borrows,
});

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
