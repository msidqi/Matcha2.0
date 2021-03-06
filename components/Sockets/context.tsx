import * as React from "react";
import { socketsReducer } from ".";
import type { SocketState, SocketProviderActions } from "./types";
import { IOError } from "./errors";
import { useUser } from "@/components/auth";
import { io } from "socket.io-client";

const initialSocketState: SocketState = {
  socket: undefined,
  isOnline: false,
  loading: false,
  error: null,
};

const socketContext = React.createContext<SocketState & SocketProviderActions>({
  ...initialSocketState,
});

export const useSocketConnection = (): SocketState & SocketProviderActions =>
  React.useContext(socketContext);

export const SocketsProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(
    socketsReducer,
    initialSocketState
  );
  const [error] = React.useState<IOError | null>(null);
  const [{ user, loggedIn }, { loading }] = useUser();

  React.useEffect(() => {
    if (user && loggedIn) {
      const socket = io(":3001", {
        auth: { token: user.authorization },
      });
      dispatch({ type: "CREATE_CONNECTION", payload: { socket } });
    } else if (state.isOnline) {
      dispatch({ type: "CLOSE_CONNECTION" });
    }
  }, [user]);

  if (!loggedIn || !user || !state.isOnline) return <>{children}</>;

  return (
    <socketContext.Provider
      value={{
        ...state,
        loading,
        error,
      }}
    >
      {children}
    </socketContext.Provider>
  );
};
