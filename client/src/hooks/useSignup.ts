import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import zod from "zod";
import axios from "axios";

interface FormData {
  [key: string]: string
}

const userSchema = zod.object({
  username: zod.string(),
  password: zod.string().min(6),
  email: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  gender: zod.string()
})

const useSignup = () => {
  const [loading, setIsLoading] = useState(false);

  const { setAuthUser } = useAuthContext()!;

  const signup = async (formData: FormData) => {
    const passwordLength = formData.password.length;
    if (passwordLength < 6) {
      return toast.error("Passwords should be atleast 6 characters long")
    }

    const { success } = userSchema.safeParse(formData);
    if (!success) {
      return toast.error("Invalid Form Details");
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/signup", formData);

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

  return { loading, signup };
}

export default useSignup;