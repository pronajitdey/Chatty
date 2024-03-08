import { useConversationContext } from "@/context/ConversationContext";
import { useMessagesContext } from "@/context/MessagesContext";
import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setIsLoading] = useState(false);
  const { selectedConversation } = useConversationContext()!;
  const { messages, setMessages } = useMessagesContext()!;

  const getMessages = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`/api/messages/${selectedConversation?.id}`);
      const { data } = response;
      setMessages(data.messages.messages);
      
    } catch (err) {
      return toast.error("Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (selectedConversation?.id) {
      getMessages();
    }
  }, [selectedConversation?.id])

  return { loading, messages };
}

export default useGetMessages;