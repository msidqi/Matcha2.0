import { Dispatch } from "react";
// import { isValidDate } from "@/utils/date";
import { IOError } from "./errors";

class IOClient {}

export type IOClientActions =
  | { type: "CREATE_CONNECTION"; payload: { io: IOClient } }
  | { type: "CLOSE_CONNECTION" };

export type SocketState = { io: undefined } | { io: IOClient };

export type IOClientDispatch = Dispatch<IOClientActions>;

export type CreateConnectionAction = (data: { io: IOClient }) => Promise<void>;

export type CloseConnectionAction = () => Promise<void>;

export type ActionsAndState = {
  createConnection: CreateConnectionAction;
  closeConnection: CloseConnectionAction;
  loading: boolean;
  error: IOError | null;
};
