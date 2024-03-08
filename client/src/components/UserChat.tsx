import { useAuthContext } from "@/context/AuthContext"
import { ChevronLeft, PhoneCall } from "lucide-react";
import UserMessages from "./UserMessages";
import { useConversationContext } from "@/context/ConversationContext";

const UserChat = (): React.JSX.Element => {
  const { auth } = useAuthContext()!;
  const { selectedConversation } = useConversationContext()!;

  return (
    <main className="bg-[--blue-primary] w-full h-screen px-8 pb-6 flex flex-col font-0">
      {selectedConversation ? (
        <>
          <div className="flex justify-between sticky py-6 top-0">
            <ChevronLeft className="mt-6"/>
            <div className="flex flex-col items-center gap-1">
              <div>
                {/* here we will actually show selected chat profile*/}
                <img
                  className="w-12 h-12 rounded-full"
                  src={selectedConversation.profilePic}
                  alt="avatar"
                />
                {/* give online indicator here */}
              </div>
              <div className="flex flex-col items-center">
                <h3 className="font-bold">{selectedConversation.username}</h3>
                <p className="font-light text-sm">
                  {selectedConversation.firstname} {selectedConversation.lastname}
                </p>
              </div>
            </div>
            <PhoneCall className="mt-6" />
          </div>

          <UserMessages />
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <h2 className="text-2xl font-bold">Welcome {auth?.username} 👋</h2>
          <p>Select a chat to start messaging</p>
        </div>
      )}
    </main>
  );
}

export default UserChat