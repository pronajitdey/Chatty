import { useConversationContext } from "@/context/ConversationContext"
import { useSocketContext } from "@/context/SocketContext"


type UserDetailsProps = {
  userDetails: {
    id: string,
    email: string,
    firstname: string,
    lastname: string,
    profilePic: string,
    username: string
  }
}

const UserCard = ({ userDetails }: UserDetailsProps): React.JSX.Element => {

  const { selectedConversation, setSelectedConversation } = useConversationContext()!;
  const isSelected = selectedConversation?.id === userDetails.id;
  const { onlineUsers } = useSocketContext()!;
  const isOnline = onlineUsers.includes(userDetails.id);

  return (
    <main onClick={() => setSelectedConversation(userDetails)} className={`${isSelected ? "bg-[--gray-primary]" : ""} flex gap-2 justify-between cursor-default p-2 rounded-lg`}>
      <div className="flex gap-3">
        <div className="relative">
          {isOnline ? (<div className="absolute bg-green-600 h-3 w-3 border-[3px] border-black rounded-full right-0 bottom-0"></div>) : null}
          <img
            className="w-12 h-12 rounded-full"
            src={userDetails.profilePic}
            alt="avatar"
            />
        </div>
        <div className="flex flex-col justify-center">
          <h3>{userDetails.username}</h3>
          {/* enclosed in div to add last msg text here */}
        </div>
      </div>
      {/* can add another div for time */}
    </main>
  );
}

export default UserCard