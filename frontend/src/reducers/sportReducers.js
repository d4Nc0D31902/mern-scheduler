import {
  NEW_SPORT_REQUEST,
  NEW_SPORT_SUCCESS,
  NEW_SPORT_FAIL,
  MY_SPORTS_REQUEST,
  MY_SPORTS_SUCCESS,
  MY_SPORTS_FAIL,
  SPORT_DETAILS_REQUEST,
  SPORT_DETAILS_SUCCESS,
  SPORT_DETAILS_FAIL,
  ALL_SPORTS_REQUEST,
  ALL_SPORTS_SUCCESS,
  ALL_SPORTS_FAIL,
  UPDATE_SPORT_REQUEST,
  UPDATE_SPORT_SUCCESS,
  UPDATE_SPORT_RESET,
  UPDATE_SPORT_FAIL,
  DELETE_SPORT_REQUEST,
  DELETE_SPORT_SUCCESS,
  DELETE_SPORT_RESET,
  DELETE_SPORT_FAIL,
  CLEAR_ERRORS,
  SET_SPORTS,
} from "../constants/sportConstants";

export const newSportReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_SPORT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_SPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        sport: action.payload,
      };

    case NEW_SPORT_FAIL:
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

export const mySportsReducer = (state = { sports: [] }, action) => {
  switch (action.type) {
    case MY_SPORTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SET_SPORTS:
      return {
        ...state,
        sports: action.payload,
      };

    case MY_SPORTS_SUCCESS:
      return {
        ...state,
        loading: false,
        sports: action.payload,
      };

    case MY_SPORTS_FAIL:
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

export const sportDetailsReducer = (state = { sport: {} }, action) => {
  switch (action.type) {
    case SPORT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SPORT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        sport: action.payload,
      };

    case SPORT_DETAILS_FAIL:
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

export const allSportsReducer = (state = { sports: [] }, action) => {
  switch (action.type) {
    case ALL_SPORTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SET_SPORTS:
      return {
        ...state,
        sports: action.payload,
      };

    case ALL_SPORTS_SUCCESS:
      return {
        ...state,
        loading: false,
        sports: action.payload.sports,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_SPORTS_FAIL:
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

export const sportReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SPORT_REQUEST:
    case DELETE_SPORT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_SPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_SPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_SPORT_FAIL:
    case DELETE_SPORT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_SPORT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_SPORT_RESET:
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
