import type { ChatState, ChatActions } from "./index";
import { initialChatState } from "./context";
export const chatReducer = (
  state: ChatState,
  action: ChatActions
): ChatState => {
  switch (action.type) {
    case "ADD_OTHER_USERS":
      return {
        ...state,
        otherUser: action.payload.otherUser,
      };
    case "REMOVE_OTHER_USERS":
      return { ...initialChatState };
    case "TOGGLE_LIST_AND_ROOM":
      return {
        ...state,
        listRoom:
          action.payload.listRoom ||
          (state.listRoom === "room" ? "list" : "room"),
      };
    default:
      return state;
  }
};
