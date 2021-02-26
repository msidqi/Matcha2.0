import * as React from "react";
import { socketsReducer } from ".";
import type {
  SocketState,
  ActionsAndState,
  CreateConnectionAction,
  CloseConnectionAction,
} from "./types";
import { IOError } from "./errors";
import { useUser } from "../auth";
import { of } from "rxjs";
import { io } from "socket.io-client";

const initialSocketState: SocketState = {
  io: undefined,
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

export const UserProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(
    socketsReducer,
    initialSocketState
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<IOError | null>(null);
  const [{ user, loggedIn }, { loading: isLoadingUser }] = useUser();

  React.useEffect(() => {
    // (async function fetchUserData() {
    //   try {
    //     setLoading(true);
    //     setError(null);
    //     /* -------- get access token ------- */
    //     dispatch({ type: "CREATE_CONNECTION", payload: { io } });
    //   } catch (e) {
    //     setError(e);
    //     dispatch({ type: "CLOSE_CLIENT" });
    //     console.error(e);
    //   } finally {
    //     setLoading(false);
    //   }
    // })();
    if (user && loggedIn) {
      const socket$ = of(io("/", { auth: { token: user.authorization } }));
      dispatch({ type: "CREATE_CONNECTION", payload: { io: socket$ } });
    }

    return () => {};
  }, [user]);

  const createConnection: CreateConnectionAction = async ({
    io,
  }): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      /* -------- get user data ------- */
      dispatch({ type: "CREATE_CONNECTION", payload: { io } });
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const closeConnection: CloseConnectionAction = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      dispatch({ type: "CLOSE_CONNECTION" });
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <socketContext.Provider
      value={[
        { ...state },
        { createConnection, closeConnection, loading, error },
      ]}
    >
      {children}
    </socketContext.Provider>
  );
};
