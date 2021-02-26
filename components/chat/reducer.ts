import type { SocketState, SocketActions } from "./index";

export const socketsReducer = (
  state: SocketState,
  action: SocketActions
): SocketState => {
  switch (action.type) {
    case "CREATE_CONNECTION":
      return {
        ...state,
        connect$: action.payload.connect$,
        socket: action.payload.socket,
        isOnline: true,
      };
    case "CLOSE_CONNECTION":
      return {
        ...state,
        connect$: undefined,
        socket: undefined,
        isOnline: false,
      };
    default:
      return state;
  }
};
