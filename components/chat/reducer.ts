import type { SocketState, IOClientActions } from "./index";

export const socketsReducer = (
  state: SocketState,
  action: IOClientActions
): SocketState => {
  switch (action.type) {
    case "CREATE_CONNECTION":
      return { ...state, io: action.payload.io };
    case "CLOSE_CONNECTION":
      return { ...state, io: undefined };
    default:
      return state;
  }
};
