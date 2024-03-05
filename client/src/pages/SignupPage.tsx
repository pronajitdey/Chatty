import SignupForm from "@/components/SignupForm"
import { Toaster } from "react-hot-toast"
import { Link } from "react-router-dom"

const SignupPage = (): React.JSX.Element => {
  return (
    <main className="min-h-screen bg-[--blue-primary] text-[--white-primary] flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <section className="bg-[--gray-primary] p-8 rounded-lg flex flex-col gap-8 mx-4 my-4 overflow-auto">
        <div className="flex flex-col gap-2">
          <h2 className="text-center font-medium text-2xl md:text-3xl text-[--blue-secondary]">
            Sign Up
          </h2>
          <p className="font-normal text-center text-sm md:text-base">
            Enter your details below to create your account and get started.
          </p>
        </div>

        <SignupForm />

        <p className="font-medium text-sm text-[--white-primary] text-center tracking-tight">
          Already have an account?{" "}
          <span className="text-[--blue-secondary]">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </section>
    </main>
  );
}

export default SignupPage