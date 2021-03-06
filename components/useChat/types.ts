import { Dispatch } from "react";
import { OtherUser } from "@/interfaces";

export type ChatActions =
  | {
      type: "ADD_OTHER_USERS";
      payload: { otherUser: OtherUser };
    }
  | { type: "REMOVE_OTHER_USERS" };

export type ChatState = {
  otherUser: OtherUser;
};

export type ChatDispatch = Dispatch<ChatActions>;

export type ChatProviderActions = {
  addOtherUsers: (otherUser: OtherUser) => void;
  removeOtherUsers: () => void;
};
