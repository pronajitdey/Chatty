import { useAuthContext } from "@/context/AuthContext"
import axios from "axios";
import toast from "react-hot-toast";

const useLogout = () => {
  const { setAuthUser } = useAuthContext()!;

  const logout = async () => {
    try {
      const response = await axios.get("/api/auth/logout");
      const { data } = response;

      if (response.status !== 200 || data.error) {
        return toast.error("Failed to Logout");
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
      return toast.success(data.message);

    } catch (err) {
      toast.error("Internal Server Error");
    }
  }

  return logout;
}

export default useLogout;