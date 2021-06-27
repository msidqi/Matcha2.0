import * as React from "react";
import { chatReducer } from ".";
import type { ChatState, ChatProviderActions } from "./types";
import { OtherUser } from "@/interfaces";
export const initialChatState: ChatState = {
  otherUser: {
    userName: "",
    id: -1,
  },
  listRoom: "list",
};

const chatContext = React.createContext<ChatState & ChatProviderActions>({
  ...initialChatState,
  addOtherUsers: () => {},
  removeOtherUsers: () => {},
  toggleListAndRoom: () => {},
});

export const useChatUsers = (): ChatState & ChatProviderActions =>
  React.useContext(chatContext);

export const ChatProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(chatReducer, initialChatState);

  const addOtherUsers = (otherUser: OtherUser) => {
    dispatch({ type: "ADD_OTHER_USERS", payload: { otherUser } });
  };

  const removeOtherUsers = () => dispatch({ type: "REMOVE_OTHER_USERS" });

  const toggleListAndRoom = (listRoom?: "room" | "list") =>
    dispatch({ type: "TOGGLE_LIST_AND_ROOM", payload: { listRoom } });

  return (
    <chatContext.Provider
      value={{
        ...state,
        addOtherUsers,
        removeOtherUsers,
        toggleListAndRoom,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};
