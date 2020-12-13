import { useContext, createContext, FC } from 'react'

type MessageContext = {
    message?: string
}

export const initialMessage: MessageContext = {
    message: undefined,
}

const messageContext = createContext<MessageContext>(initialMessage);

export const useMessage = () => useContext(messageContext);

export const MessageProvider: FC = ({children}) => <messageContext.Provider value={initialMessage}>{children}</messageContext.Provider>;
