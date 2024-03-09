import { CircleUserRound, Dot, Loader2, LogOut, MessageCircleMore, PhoneCall, Search } from "lucide-react";
import UserCard from "../UserCard";
import useGetConversations from "@/hooks/useGetConversations";
import { useConversationContext } from "@/context/ConversationContext";
import useLogout from "@/hooks/useLogout";


const UsersDashboard = (): React.JSX.Element => {
  const { loading, users } = useGetConversations();
  const { selectedConversation } = useConversationContext()!;
  const logout = useLogout();

  let visibleClass = selectedConversation ? "hidden md:flex" : "flex";

  return (
    <main className={`relative bg-[--blue-primary] w-screen w-screen md:max-w-[425px] h-screen ${visibleClass} flex-col justify-start items-start px-8`}>
      <div className="flex justify-between w-full pt-10 pb-8 sticky top-0 bg-[--blue-primary]">
        <h2 className="font-bold text-3xl">Messages</h2>
        <button>
          <Search />
        </button>
      </div>
      <div className="users flex flex-col gap-5 overflow-y-auto scroll-smooth pb-24 w-full">
        {users && users.map((user) => {
          return <UserCard key={user.id} userDetails={user} />;
        })}
        {loading ? <div className="w-full h-full flex justify-center items-center"><Loader2 className="animate-spin" /></div> : null}
      </div>
      <nav className="bg-[--blue-primary] py-3 flex justify-around w-full absolute left-0 bottom-0">
        <div>
          <a>
            <LogOut onClick={() => logout()} className="cursor-pointer hover:text-[--blue-secondary]"/>
          </a>
          <span>
            <Dot className="invisible" />
          </span>
        </div>
        <div>
          <a>
            <CircleUserRound />
          </a>
          <span>
            <Dot className="invisible" />
          </span>
        </div>
        <div>
          <a>
            <PhoneCall />
          </a>
          <span>
            <Dot className="invisible" />
          </span>
        </div>
        <div>
          <a>
            <MessageCircleMore className="text-[--blue-secondary]" />
          </a>
          <span>
            <Dot className="text-[--blue-secondary]" />
          </span>
        </div>
      </nav>
    </main>
  );
};

export default UsersDashboard