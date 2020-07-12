import { ADD_RESULTS, SET_RESULTS_ORDER } from "../actionTypes";

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
        const {order, asc}  = action.payload;
        return {
          ...state,
          orderBy: order,
          asc: asc
        };
      }
      default:
        return state;
    }
  }