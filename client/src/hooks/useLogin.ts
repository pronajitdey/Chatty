import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { useContext, useState } from "react";
import zod from "zod";
import axios from "axios";
import toast from "react-hot-toast";

interface FormData {
  [key: string]: string
}

const userLoginSchema = zod.object({
  username: zod.string(),
  password: zod.string().min(6),
  email: zod.string().email()
})

const useLogin = () => {
  const [loading, setIsLoading] = useState(false);

  const { setAuthUser } = useContext<AuthContextType | null>(AuthContext)!;

  const login = async (formData: FormData) => {
    const { success } = userLoginSchema.safeParse(formData);
    if (!success) {
      return toast.error("Invalid Form Details");
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/login", formData);
      
      if (response.status !== 200) {
        return toast.error(response.data.message);
      }

      localStorage.setItem("chat-user", JSON.stringify(response.data.credentials));
      setAuthUser(response.data.credentials);
      return toast.success(response.data.message);

    } catch (err: any) {
      toast.error(err.response.data.message || err.response.data.error);

    } finally {
      setIsLoading(false);
    }
  }

  return { loading, login }
}

export default useLogin