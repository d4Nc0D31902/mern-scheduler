import {
  NEW_CATEGORY_REQUEST, // Updated constant
  NEW_CATEGORY_SUCCESS, // Updated constant
  NEW_CATEGORY_FAIL, // Updated constant
  MY_CATEGORIES_REQUEST, // Updated constant
  MY_CATEGORIES_SUCCESS, // Updated constant
  MY_CATEGORIES_FAIL, // Updated constant
  CATEGORY_DETAILS_REQUEST, // Updated constant
  CATEGORY_DETAILS_SUCCESS, // Updated constant
  CATEGORY_DETAILS_FAIL, // Updated constant
  ALL_CATEGORIES_REQUEST, // Updated constant
  ALL_CATEGORIES_SUCCESS, // Updated constant
  ALL_CATEGORIES_FAIL, // Updated constant
  UPDATE_CATEGORY_REQUEST, // Updated constant
  UPDATE_CATEGORY_SUCCESS, // Updated constant
  UPDATE_CATEGORY_RESET, // Updated constant
  UPDATE_CATEGORY_FAIL, // Updated constant
  DELETE_CATEGORY_REQUEST, // Updated constant
  DELETE_CATEGORY_SUCCESS, // Updated constant
  DELETE_CATEGORY_RESET, // Updated constant
  DELETE_CATEGORY_FAIL, // Updated constant
  CLEAR_ERRORS,
  SET_CATEGORIES, // Updated constant
} from "../constants/categoryConstants"; // Updated import

export const newCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };

    case NEW_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case MY_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case MY_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case MY_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const categoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CATEGORY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };

    case CATEGORY_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_CATEGORY_FAIL:
    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_CATEGORY_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_CATEGORY_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
