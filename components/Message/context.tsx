import React, { useContext, createContext, FC } from "react";

type MessageContext = {
  message?: string;
};

export const initialMessage: MessageContext = {
  message: undefined,
};

const messageContext = createContext<MessageContext>(initialMessage);

export const useMessage = (): MessageContext =>
  useContext<MessageContext>(messageContext);

export const MessageProvider: FC = ({ children }): JSX.Element => (
  <messageContext.Provider value={initialMessage}>
    {children}
  </messageContext.Provider>
);
