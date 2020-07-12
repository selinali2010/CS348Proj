import { ADD_RESULTS, SET_RESULTS_ORDER, SET_RESULTS_ASC } from "../actionTypes";

const initialState = {
    results: [],
    orderBy: "Closest Match",
    asc: 1
};

export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_RESULTS: {
        const { results} = action.payload;
        return {
          ...state,
          results: results
        };
      }
      case SET_RESULTS_ORDER: {
        const { order }  = action.payload;
        return {
          ...state,
          orderBy: order
        };
      }
      case SET_RESULTS_ASC: {
        const { asc }  = action.payload;
        return {
          ...state,
          asc: asc
        };
      }
      default:
        return state;
    }
  }