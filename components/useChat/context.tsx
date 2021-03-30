import * as React from "react";
import { chatReducer } from ".";
import type { ChatState, ChatProviderActions } from "./types";
import { OtherUser } from "@/interfaces";
import { useSocketConnection } from "../Sockets";

export const initialChatState: ChatState = {
  otherUser: {
    userName: "",
    id: -1,
  },
  listRoom: "list",
};

const EVENT_KEY_MESSAGE_SEND = "message";
const EVENT_KEY_MESSAGE_RECIEVE = "message";
const EVENT_KEY_CONNECT = "connect";

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
  // const { socket } = useSocketConnection();

  // React.useEffect(() => {
  //   socket?.on(EVENT_KEY_MESSAGE_RECIEVE, (data: MessageRecievedType[][]) => {
  //     const messages: TextMessage[] = data
  //       .flat()
  //       .filter((elem) => {
  //         console.log("filter", elem.from, otherUser.userName);
  //         return elem.from === otherUser.userName;
  //       })
  //       .map((elem) => ({
  //         content: elem.message,
  //         date: new Date(elem.date),
  //         sender: otherUser.id,
  //         receiver: userData.id,
  //       }));
  //     console.log("new received message", messages);
  //     setMessagesHistoryLocal((prev) => [...prev, ...messages]);
  //     setMessagesGlobalHistoryLocal((prev) =>
  //       addMesageToGlobalUserMessage(prev, messages)
  //     );
  //   });
  // }, [socket]);

  const addOtherUsers = (otherUser: OtherUser) => {
    console.log("addOtherUsers", otherUser.userName);
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
