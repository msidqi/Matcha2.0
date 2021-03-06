import { Dispatch } from "react";
import { IOError } from "./errors";
import { Socket } from "socket.io-client";

export type SocketActions =
  | {
      type: "CREATE_CONNECTION";
      payload: { socket: Socket };
    }
  | { type: "CLOSE_CONNECTION" };

export type SocketState =
  | {
      socket: Socket;
      isOnline: true;
      loading: boolean;
      error: IOError | null;
    }
  | {
      socket: undefined;
      isOnline: false;
      loading: boolean;
      error: IOError | null;
    };

export type SocketDispatch = Dispatch<SocketActions>;

export type SocketProviderActions = {};
