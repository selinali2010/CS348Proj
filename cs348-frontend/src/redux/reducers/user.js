import { LOGIN_USER, LOGOUT_USER } from "../actionTypes";

const initialState = {
    userId: "",
    userName: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
      case LOGIN_USER: {
        const {userId, userName} = action.payload;
        return {
          ...state,
          userId: userId,
          userName: userName
        };
      }
      case LOGOUT_USER: {
        return {
          ...state,
          userId: "",
          userName: ""
        };
      }
      default:
        return state;
    }
  }