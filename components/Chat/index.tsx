import React from "react";
import ChatRoom from "@/components/ChatRoom";
import ChatList from "@/components/ChatList";
import { ChatProvider } from "../useChat";

const Chat = () => (
  <div className="flex h-full w-full">
    <ChatProvider>
      <ChatList />
      <ChatRoom />
    </ChatProvider>
  </div>
);

export default Chat;
