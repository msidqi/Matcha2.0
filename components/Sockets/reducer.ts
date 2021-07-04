import type { SocketState, SocketActions } from "./index";

export const socketsReducer = (
  state: SocketState,
  action: SocketActions
): SocketState => {
  switch (action.type) {
    case "CREATE_CONNECTION":
      return {
        ...state,
        socket: action.payload.socket,
        isOnline: true,
      };
    case "CLOSE_CONNECTION": {
      state.socket?.disconnect();
      console.log('CLOSE_CONNECTION state.socket?.disconnect();', 'socket', !!state.socket)
      return {
        ...state,
        socket: undefined,
        isOnline: false,
      };
    }
    default:
      return state;
  }
};
