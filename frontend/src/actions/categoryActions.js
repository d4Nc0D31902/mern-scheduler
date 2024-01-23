import axios from "axios";
import {
  NEW_CATEGORY_REQUEST, // Updated constant
  NEW_CATEGORY_SUCCESS, // Updated constant
  NEW_CATEGORY_FAIL, // Updated constant
  NEW_CATEGORY_RESET, // Updated constant
  MY_CATEGORIES_REQUEST, // Updated constant
  MY_CATEGORIES_SUCCESS, // Updated constant
  MY_CATEGORIES_FAIL, // Updated constant
  CATEGORY_DETAILS_REQUEST, // Updated constant
  CATEGORY_DETAILS_SUCCESS, // Updated constant
  CATEGORY_DETAILS_FAIL, // Updated constant
  ALL_CATEGORIES_REQUEST, // Updated constant
  ALL_CATEGORIES_SUCCESS, // Updated constant
  ALL_CATEGORIES_FAIL, // Updated constant
  UPDATE_CATEGORY_SUCCESS, // Updated constant
  UPDATE_CATEGORY_REQUEST, // Updated constant
  UPDATE_CATEGORY_FAIL, // Updated constant
  DELETE_CATEGORY_REQUEST, // Updated constant
  DELETE_CATEGORY_SUCCESS, // Updated constant
  DELETE_CATEGORY_FAIL, // Updated constant
  CLEAR_ERRORS,
  SET_CATEGORIES, // Updated constant
} from "../constants/categoryConstants"; // Updated import

export const newCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_CATEGORY_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/category/new`, // Updated endpoint
      category,
      config
    );
    dispatch({
      type: NEW_CATEGORY_SUCCESS,
      payload: data,
    });

    // Do not dispatch NEW_CATEGORY_RESET here, leave it to the component
  } catch (error) {
    dispatch({
      type: NEW_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myCategories = () => async (dispatch) => {
  try {
    dispatch({ type: MY_CATEGORIES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/categories/me`, // Updated endpoint
      { withCredentials: true }
    );
    dispatch({
      type: MY_CATEGORIES_SUCCESS,
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: MY_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/category/${id}`, // Updated endpoint
      { withCredentials: true }
    );
    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/categories`, // Updated endpoint
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ALL_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/category/${id}`, // Updated endpoint
      categoryData,
      config
    );
    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/category/${id}`, // Updated endpoint
      { withCredentials: true }
    );
    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
