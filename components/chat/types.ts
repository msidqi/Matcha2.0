import { Dispatch } from "react";
// import { isValidDate } from "@/utils/date";
import { IOError } from "./errors";
import { Socket } from "socket.io-client";
import { Observable } from "rxjs";

export type SocketActions =
  | {
      type: "CREATE_CONNECTION";
      payload: { socket: Socket; connect$: Observable<Socket> };
    }
  | { type: "CLOSE_CONNECTION" };

export type SocketState =
  | { connect$: Observable<Socket>; socket: Socket; isOnline: true }
  | { connect$: undefined; socket: undefined; isOnline: false };

export type SocketDispatch = Dispatch<SocketActions>;

export type ListenOnConnectAction = (
  event: string
) => Observable<unknown> | undefined;

export type ActionsAndState = {
  listenOnConnect: ListenOnConnectAction;
  loading: boolean;
  error: IOError | null;
};
