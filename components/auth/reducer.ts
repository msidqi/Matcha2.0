import { UserState, UserDispatchActions } from "./index";

export const userReducer = (
  state: UserState,
  action: UserDispatchActions
): UserState => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        ...{
          user: action.payload.user,
          loggedIn: true,
        },
      };
    case "logout":
      return { ...state, ...{ user: undefined, loggedIn: false } };
    default:
      return state;
  }
};
