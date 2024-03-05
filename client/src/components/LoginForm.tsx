import { FormEvent, useState } from "react";
import LoginInputField from "./ui/LoginInputField";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import useLogin from "@/hooks/useLogin";

interface FormData {
  [key: string]: string
}

type Event = FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement | MouseEvent>;

const LoginForm = (): React.JSX.Element => {

  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });

  const { loading, login } = useLogin();

  const handleSubmit = async (ev: Event) => {
    ev.preventDefault();
    await login(formData);
  }

  return (
    <form className="w-full flex flex-col gap-12" action="/">
      <div className="w-full flex flex-col gap-2 md:gap-6">
        <LoginInputField
          labelName="Username"
          fieldName="username"
          formData={formData}
          placeholderText="Enter..."
          fieldType="text"
          setFormData={setFormData}
        />
        <LoginInputField
          labelName="Email"
          fieldName="email"
          formData={formData}
          placeholderText="example@xyz.com"
          fieldType="text"
          setFormData={setFormData}
        />
        <LoginInputField
          labelName="Password"
          fieldName="password"
          formData={formData}
          placeholderText="Enter..."
          fieldType="password"
          setFormData={setFormData}
        />
      </div>

      <Button
        onClick={(ev) => handleSubmit(ev)}
        className="bg-transparent bg-[--blue-secondary] text-[--blue-primary] hover:bg-[--gray-primary] hover:text-[--blue-secondary] hover:border-2 hover:border-[--blue-secondary]  font-bold"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Login"}
      </Button>
    </form>
  );
}

export default LoginForm