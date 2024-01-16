import {
  NEW_EQUIPMENT_REQUEST,
  NEW_EQUIPMENT_SUCCESS,
  NEW_EQUIPMENT_FAIL,
  MY_EQUIPMENTS_REQUEST,
  MY_EQUIPMENTS_SUCCESS,
  MY_EQUIPMENTS_FAIL,
  EQUIPMENT_DETAILS_REQUEST,
  EQUIPMENT_DETAILS_SUCCESS,
  EQUIPMENT_DETAILS_FAIL,
  ALL_EQUIPMENTS_REQUEST,
  ALL_EQUIPMENTS_SUCCESS,
  ALL_EQUIPMENTS_FAIL,
  UPDATE_EQUIPMENT_REQUEST,
  UPDATE_EQUIPMENT_SUCCESS,
  UPDATE_EQUIPMENT_RESET,
  UPDATE_EQUIPMENT_FAIL,
  DELETE_EQUIPMENT_REQUEST,
  DELETE_EQUIPMENT_SUCCESS,
  DELETE_EQUIPMENT_RESET,
  DELETE_EQUIPMENT_FAIL,
  CLEAR_ERRORS,
  SET_EQUIPMENTS,
} from "../constants/equipmentConstants";

export const newEquipmentReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_EQUIPMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        equipment: action.payload,
      };
    case SET_EQUIPMENTS: // Add this case
      return {
        ...state,
        equipments: action.payload,
      };
    case NEW_EQUIPMENT_FAIL:
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

export const myEquipmentsReducer = (state = { equipments: [] }, action) => {
  switch (action.type) {
    case MY_EQUIPMENTS_REQUEST:
      return {
        loading: true,
      };
    case SET_EQUIPMENTS: // Add this case
      return {
        ...state,
        equipments: action.payload,
      };

    case MY_EQUIPMENTS_SUCCESS:
      return {
        loading: false,
        equipments: action.payload,
      };

    case MY_EQUIPMENTS_FAIL:
      return {
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

export const equipmentDetailsReducer = (state = { equipment: {} }, action) => {
  switch (action.type) {
    case EQUIPMENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case EQUIPMENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        equipment: action.payload,
      };

    case EQUIPMENT_DETAILS_FAIL:
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

export const allEquipmentsReducer = (state = { equipments: [] }, action) => {
  switch (action.type) {
    case ALL_EQUIPMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SET_EQUIPMENTS: // Add this case
      return {
        ...state,
        equipments: action.payload,
      };

    case ALL_EQUIPMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        equipments: action.payload.equipments,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_EQUIPMENTS_FAIL:
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

export const equipmentReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EQUIPMENT_REQUEST:
    case DELETE_EQUIPMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_EQUIPMENT_FAIL:
    case DELETE_EQUIPMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_EQUIPMENT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_EQUIPMENT_RESET:
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
