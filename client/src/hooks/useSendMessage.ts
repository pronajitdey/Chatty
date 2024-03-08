import { useConversationContext } from "@/context/ConversationContext";
import { useMessagesContext } from "@/context/MessagesContext";
import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";

const useSendMessage = () => {

  const [loading, setIsLoading] = useState(false);
  const { selectedConversation } = useConversationContext()!;
  const { setMessages } = useMessagesContext()!;

  const sendMessage = async (message: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`api/messages/send/${selectedConversation?.id}`, {
        message: message
      });

      if (response.status !== 200) {
        return toast.error("Cannot send message");
      }

      const { data } = response;
      setMessages(data.messages)

    } catch (err) {
      toast.error("Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  }

  return { loading, sendMessage };
}

export default useSendMessage;