import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


const HomePage = (): React.JSX.Element => {
  return (
    <main className="bg-[--blue-primary] text-[--white-primary] h-screen flex flex-col justify-center items-center px-10 gap-10">
      <h1 className="font-medium text-5xl tracking-wide">Chatty</h1>

      <p className="text-l text-center">
        The next-gen. realtime chat app created using React, TypeScript, Prisma,
        Socket.io and MongoDB.
      </p>

      <div className="buttons flex gap-5">
        <Link to="/signup">
          <Button className="bg-transparent border-[--white-primary] border-2 text-[--white-primary] hover:bg-[--white-primary] hover:text-[--blue-primary] min-w-[100px]">
            Sign Up
          </Button>
        </Link>
        <Link to="/login">
          <Button className="bg-transparent border-[--white-primary] border-2 text-[--white-primary] hover:bg-[--white-primary] hover:text-[--blue-primary] min-w-[100px]">
            Login
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default HomePage