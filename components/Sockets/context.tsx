import * as React from "react";
import { socketsReducer } from ".";
import type {
  SocketState,
  SocketProviderActions,
  ListenOnConnectAction,
} from "./types";
import { IOError } from "./errors";
import { useUser } from "@/components/auth";
import { of, fromEvent, Observable } from "rxjs";
import { io, Socket } from "socket.io-client";
import { switchMap, map, filter, tap } from "rxjs/operators";
import { emitOnEnter } from "@/utils/observers/chatObservers";

const initialSocketState: SocketState = {
  connect$: undefined,
  socket: undefined,
  isOnline: false,
  loading: false,
  error: null,
};

const socketContext = React.createContext<SocketState & SocketProviderActions>({
  ...initialSocketState,
  listenOnConnect: async () => {
    return;
  },
  emitOnConnect: async () => {
    return;
  },
  onEnterEmitMessage: async () => {
    return;
  },
});

export const useSocketConnection = (): SocketState & SocketProviderActions =>
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
      const socket = io(":3001", {
        auth: { token: user.authorization },
      });
      const socket$ = of(socket);
      const connect$ = socket$.pipe(
        tap(console.log),
        switchMap((socket) =>
          fromEvent(socket, "connect").pipe(map(() => socket))
        )
      );
      dispatch({ type: "CREATE_CONNECTION", payload: { connect$, socket } });
    } else if (state.isOnline) {
      dispatch({ type: "CLOSE_CONNECTION" });
    }
  }, [user]);

  if (!loggedIn || !user || !state.isOnline) return <>{children}</>;

  const listenOnConnect: ListenOnConnectAction = (event: string) => {
    return state.connect$.pipe(switchMap((socket) => fromEvent(socket, event)));
  };

  const emitOnConnect = <T,>(
    observable$: Observable<T>
  ): Observable<{
    socket: Socket;
    data: T;
  }> => {
    return state.connect$.pipe(
      switchMap((socket) => observable$.pipe(map((data) => ({ socket, data }))))
    );
  };

  const onEnterEmitMessage = (input: HTMLInputElement) => {
    return emitOnConnect(
      emitOnEnter(input).pipe(
        tap(({ content }) => console.log("emitOnEnter2", content))
      )
    ).pipe(
      tap(({ socket, data }) => console.log("message", data))
      // map(({ socket, data }) => socket.emit("message", data))
    );
  };

  return (
    <socketContext.Provider
      value={{
        ...state,
        loading,
        error,
        listenOnConnect,
        emitOnConnect,
        onEnterEmitMessage,
      }}
    >
      {children}
    </socketContext.Provider>
  );
};
