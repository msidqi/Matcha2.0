import * as React from "react";
import { socketsReducer } from ".";
import type {
  SocketState,
  ActionsAndState,
  ListenOnConnectAction,
} from "./types";
import { IOError } from "./errors";
import { useUser } from "@/components/auth";
import { of, fromEvent } from "rxjs";
import { io } from "socket.io-client";
import { switchMap, map } from "rxjs/operators";

const initialSocketState: SocketState = {
  connect$: undefined,
  socket: undefined,
  isOnline: false,
};

const socketContext = React.createContext<[SocketState, ActionsAndState]>([
  initialSocketState,
  {
    createConnection: async () => {
      return;
    },
    closeConnection: async () => {
      return;
    },
    loading: false,
    error: null,
  },
]);

export const useSocketConnection = (): [SocketState, ActionsAndState] =>
  React.useContext(socketContext);

export const SocketsProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(
    socketsReducer,
    initialSocketState
  );
  const [loading] = React.useState<boolean>(true);
  const [error] = React.useState<IOError | null>(null);
  const [{ user, loggedIn }, { loading: isLoadingUser }] = useUser();

  React.useEffect(() => {
    if (user && loggedIn) {
      const socket = io("/", { auth: { token: user.authorization } });
      const socket$ = of(socket);
      const connect$ = socket$.pipe(
        switchMap((socket) =>
          fromEvent(socket, "connect").pipe(map(() => socket))
        )
      );
      dispatch({ type: "CREATE_CONNECTION", payload: { connect$, socket } });
    } else if (state.connect$) {
      dispatch({ type: "CLOSE_CONNECTION" });
    }

    return () => {};
  }, [user]);

  const listenOnConnect: ListenOnConnectAction = (event: string) => {
    return state.connect$?.pipe(
      switchMap((socket) => fromEvent(socket, event))
    );
  };

  return (
    <socketContext.Provider
      value={[{ ...state }, { listenOnConnect, loading, error }]}
    >
      {children}
    </socketContext.Provider>
  );
};
