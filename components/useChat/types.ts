import { Dispatch } from "react";
import { OtherUser } from "@/interfaces";

export type ChatActions =
  | {
      type: "ADD_OTHER_USERS";
      payload: { otherUser: OtherUser };
    }
  | { type: "REMOVE_OTHER_USERS" }
  | { type: "TOGGLE_LIST_AND_ROOM"; payload: { listRoom?: "room" | "list" } };

export type ChatState = {
  otherUser: OtherUser;
  listRoom: "room" | "list";
};

export type ChatDispatch = Dispatch<ChatActions>;

export type ChatProviderActions = {
  addOtherUsers: (otherUser: OtherUser) => void;
  removeOtherUsers: () => void;
  toggleListAndRoom: (listRoom?: "list" | "room") => void;
};
