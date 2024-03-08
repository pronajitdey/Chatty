import { ReactNode, createContext, useContext, useState } from "react";

type SelectedConversation = {
  id: string,
  email: string,
  firstname: string,
  lastname: string,
  username: string,
  profilePic: string,
}

type ConversationContextType = {
  selectedConversation: SelectedConversation | null,
  setSelectedConversation: React.Dispatch<React.SetStateAction<SelectedConversation | null>>
}

type ConversationContextProviderProps = {
  children: ReactNode
}

export const ConversationContext = createContext<ConversationContextType | null>(null);

export const useConversationContext = () => {
  return useContext<ConversationContextType | null>(ConversationContext);
}

export const ConversationContextProvider = ({ children }: ConversationContextProviderProps) => {
  const [selectedConversation, setSelectedConversation] = useState<SelectedConversation | null>(null);

  return <ConversationContext.Provider value={{ selectedConversation, setSelectedConversation }}>
    { children }
  </ConversationContext.Provider>
}