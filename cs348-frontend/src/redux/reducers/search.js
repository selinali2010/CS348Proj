import { ADD_RESULTS, SET_RESULTS_ORDER, SET_RESULTS_ASC, SET_STRICT, SET_ING } from "../actionTypes";

const initialState = {
    results: [],
    ingredients: [],
    orderBy: 0,
    asc: 1,
    strict: false
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
      case SET_STRICT: {
        const { strict }  = action.payload;
        return {
          ...state,
          strict: strict
        };
      }
      case SET_ING: {
        const { ingredients }  = action.payload;
        return {
          ...state,
          ingredients: ingredients
        };
      }
      default:
        return state;
    }
  }