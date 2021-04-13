import type { MenuType, MenuDispatchActions } from "./types";

export const menuReducer = (
  state: MenuType,
  action: MenuDispatchActions
): MenuType => {
  switch (action.type) {
    case "HISTORY_PUSH":
      return { ...state, history: [...state.history, action.payload.item] };
    case "HISTORY_POP": {
      return {
        ...state,
        history: state.history.slice(0, state.history.length - 1),
      };
    }
    case "SET_CURRENT":
      return { ...state, current: action.payload.item };
    default:
      return state;
  }
};
