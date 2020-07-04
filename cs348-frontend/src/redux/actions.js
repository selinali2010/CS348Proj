import { ADD_RESUlTS, LOGIN_USER, LOGOUT_USER } from "./actionTypes";

export const addResults = content => ({
  type: ADD_RESUlTS,
  payload: {
    results: content
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
