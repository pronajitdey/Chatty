import { useUsersContext } from "@/context/UsersContext";
import axios from "axios";
import { useState, useEffect } from "react"
import toast from "react-hot-toast";


const useGetConversations = () => {
  const [loading, setIsLoading] = useState(false);
  const { users, setUsers } = useUsersContext()!;

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get("/api/users");
        const conversations = response.data;
        setUsers(conversations.message);

      } catch (err: any) {
        toast.error(err.response.data.message ? err.response.data.message : "Internal Server Error");
        localStorage.removeItem("chat-user");
        setUsers(null);

      } finally {
        setIsLoading(false);
      }
    }
    fetchConversations();
  }, [])

  return { loading, users };
}

export default useGetConversations;