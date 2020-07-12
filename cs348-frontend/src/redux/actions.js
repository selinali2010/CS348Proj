import { ADD_RESULTS, LOGIN_USER, LOGOUT_USER, SET_FAVOURITES } from "./actionTypes";

export const addResults = content => ({
  type: ADD_RESULTS,
  payload: {
    results: content
  }
});

export const setFavourites = content => ({
  type: SET_FAVOURITES,
  payload: {
    favourites: content
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
