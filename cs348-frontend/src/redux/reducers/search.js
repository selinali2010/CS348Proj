import { ADD_RESUlTS } from "../actionTypes";

const initialState = {
    results: []
};

export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_RESUlTS: {
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