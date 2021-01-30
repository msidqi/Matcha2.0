import type { UserState, UserDispatchActions } from "./index";

export const userReducer = (
  state: UserState,
  action: UserDispatchActions
): UserState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload.user, loggedIn: true };
    case "LOGOUT":
      return { ...state, user: undefined, loggedIn: false };
    case "SET_USER":
      return { ...state, user: action.payload.user, loggedIn: true };
    default:
      return state;
  }
};
