import UserChat from "@/components/UserChat";
import UsersDashboard from "@/components/ui/UsersDashboard"
import { Toaster } from "react-hot-toast";

const ChatPage = (): React.JSX.Element => {
  return (
    <div className="bg-[--gray-primary] w-full min-h-screen flex justify-start items-center text-[--white-primary] gap-1">
      <Toaster position="top-center" reverseOrder={false} />
      <UsersDashboard />
      <UserChat />
    </div>
  );
}

export default ChatPage