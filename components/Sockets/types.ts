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
  | {
      connect$: Observable<Socket>;
      socket: Socket;
      isOnline: true;
      loading: boolean;
      error: IOError | null;
    }
  | {
      connect$: undefined;
      socket: undefined;
      isOnline: false;
      loading: boolean;
      error: IOError | null;
    };

export type SocketDispatch = Dispatch<SocketActions>;

export type ListenOnConnectAction = (
  event: string
) => Observable<unknown> | undefined;

export type EmitOnConnectAction = <T = Record<string, any>>(
  observable$: Observable<T>
) =>
  | Observable<{
      socket: Socket;
      data: T;
    }>
  | undefined;

export type OnEnterEmitMessageAction = (
  input: HTMLInputElement
) => Observable<{
  socket: Socket;
  data: {
    content: string;
  };
}>;

export type SocketProviderActions = {
  listenOnConnect: ListenOnConnectAction;
  emitOnConnect: EmitOnConnectAction;
  onEnterEmitMessage: OnEnterEmitMessageAction;
};
