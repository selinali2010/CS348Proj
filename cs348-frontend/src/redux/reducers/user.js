import { LOGIN_USER, LOGOUT_USER } from "../actionTypes";

const initialState = {
    userId: "",
    userPass: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
      case LOGIN_USER: {
        const { id, pass} = action.payload;
        return {
          ...state,
          userId: id,
          userPass: pass
        };
      }
      case LOGOUT_USER: {
        return {
          ...state,
          userId: "",
          userPass: ""
        };
      }
      default:
        return state;
    }
  }