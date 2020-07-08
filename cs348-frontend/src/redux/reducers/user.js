import { LOGIN_USER, LOGOUT_USER, SET_FAVOURITES } from "../actionTypes";

const initialState = {
    userId: "",
    userName: "",
    favourites: []
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
      case SET_FAVOURITES: {
        const { favourites} = action.payload;
        return {
          ...state,
          favourites: favourites
        };
      }
      default:
        return state;
    }
  }