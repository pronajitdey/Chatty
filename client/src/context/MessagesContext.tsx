import { ReactNode, createContext, useContext, useState } from "react";

type Messages = {
  messageId: string,
  body: string,
  senderId: string,
  receiverId: string,
  conversationId: Array<unknown>
  createdAt: string,
}[]

export type MessagesContextType = {
  messages: Messages | null,
  setMessages: React.Dispatch<React.SetStateAction<Messages | null>>
}

type MessagesContextProviderProps = {
  children: ReactNode
}

export const MessagesContext = createContext<MessagesContextType | null>(null);

export const useMessagesContext = () => {
  return useContext<MessagesContextType | null>(MessagesContext);
}

export const MessagesContextProvider = ({ children }: MessagesContextProviderProps) => {

  const [messages, setMessages] = useState<Messages | null>(null);

  return <MessagesContext.Provider value={{ messages, setMessages }}>
    { children }
  </MessagesContext.Provider>
}