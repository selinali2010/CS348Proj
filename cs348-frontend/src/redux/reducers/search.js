import { ADD_RESULTS } from "../actionTypes";

const initialState = {
    results: []
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
      default:
        return state;
    }
  }