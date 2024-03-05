import LoginForm from "@/components/LoginForm";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const LoginPage = (): React.JSX.Element => {
  return (
    <main className="min-h-screen bg-[--blue-primary] text-[--white-primary] flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <section className="bg-[--gray-primary] p-8 rounded-lg flex flex-col gap-8 mx-4 my-4 overflow-auto sm:w-[400px] w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-center font-medium text-2xl md:text-3xl text-[--blue-secondary]">
            Welcome Back
          </h2>
          <div className="text-center font-normal text-sm md:text-base">
            <p>Glad to see you again 👋</p>
            <p>Login to your account below</p>
          </div>
        </div>

        <LoginForm />

        <p className="font-medium text-sm text-[--white-primary] text-center tracking-tight">
          Don't have an account?{" "}
          <span className="text-[--blue-secondary]">
            <Link to="/signup">Signup</Link>
          </span>
        </p>
      </section>
    </main>
  );
}

export default LoginPage