import { ADD_RESULTS, LOGIN_USER, LOGOUT_USER, SET_FAVOURITES, 
  SET_FAVOURITES_FILTER, SET_RESULTS_ORDER, SET_RESULTS_ASC, SET_STRICT } from "./actionTypes";

export const addResults = content => ({
  type: ADD_RESULTS,
  payload: {
    results: content
  }
});

export const setResultsOrder = order => ({
  type: SET_RESULTS_ORDER,
  payload: {
    order: order
  }
});

export const setResultsAsc = asc => ({
  type: SET_RESULTS_ASC,
  payload: {
    asc: asc
  }
});

export const setFavourites = content => ({
  type: SET_FAVOURITES,
  payload: {
    favourites: content
  }
});

export const setFavouritesFilter = react => ({
  type: SET_FAVOURITES_FILTER,
  payload: {
    filter: react
  }
});

export const loginUser = (userId, userName) => ({
  type: LOGIN_USER,
  payload: {
      userId: userId,
      userName: userName
  }
});

export const logoutUser = () => ({ 
    type: LOGOUT_USER, 
    payload: {} 
});

export const setStrict = (strict) => ({ 
  type: SET_STRICT, 
  payload: {
    strict: strict
  } 
});
