import { FormEvent, useState } from "react";
import InputField from "./ui/InputField";
import Dropdown from "./ui/Dropdown";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import useSignup from "@/hooks/useSignup";
import { Loader2 } from "lucide-react";

interface FormData {
  [key: string]: string
}

type Event = FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>

const SignupForm = (): React.JSX.Element => {

  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    gender: ''
  })

  const { loading, signup } = useSignup();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    await signup(formData);
  }

  return (
    <form className="w-full flex flex-col gap-12" action="/">
      <div className="w-full flex flex-col gap-2 md:gap-6">
        <section className="w-full flex flex-col md:flex-row gap-2">
          <InputField
            labelName="First Name"
            fieldName="firstname"
            formData={formData}
            placeholderText="Enter..."
            fieldType="text"
            setFormData={setFormData}
          />
          <InputField
            labelName="Last Name"
            fieldName="lastname"
            formData={formData}
            placeholderText="Enter..."
            fieldType="text"
            setFormData={setFormData}
          />
        </section>

        <section className="w-full flex flex-col md:flex-row gap-2">
          <InputField
            labelName="Username"
            fieldName="username"
            formData={formData}
            placeholderText="Enter..."
            fieldType="text"
            setFormData={setFormData}
          />
          <InputField
            labelName="Password"
            fieldName="password"
            formData={formData}
            placeholderText="Enter..."
            fieldType="password"
            setFormData={setFormData}
          />
        </section>

        <section className="w-full flex flex-col md:flex-row gap-2">
          <InputField
            labelName="Email"
            fieldName="email"
            formData={formData}
            placeholderText="example@xyz.com"
            fieldType="text"
            setFormData={setFormData}
          />
          <Dropdown
            labelName="Gender"
            fieldName="gender"
            formData={formData}
            setFormData={setFormData}
          />
        </section>

        <section className="flex gap-2">
          <Button className="bg-transparent border-[--white-primary] border-2 text-[--white-primary] hover:bg-[--white-primary] hover:text-[--blue-primary] w-[50%] font-bold">
            <Link to="/">Cancel</Link>
          </Button>
          <Button onClick={(e) => handleSubmit(e)} className="bg-transparent bg-[--blue-secondary] text-[--blue-primary] hover:bg-[--gray-primary] hover:text-[--blue-secondary] hover:border-2 hover:border-[--blue-secondary] w-[50%] font-bold">
            {loading ? <Loader2 className="animate-spin" /> : "Confirm"}
          </Button>
        </section>
      </div>
    </form>
  );
}

export default SignupForm