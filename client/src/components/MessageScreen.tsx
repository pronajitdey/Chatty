import { useAuthContext } from "@/context/AuthContext";
import useGetMessages from "@/hooks/useGetMessages";
import useListenMessages from "@/hooks/useListenMessages";
import { MutableRefObject, useRef } from "react";
import { Loader } from "lucide-react";
import { useEffect } from "react";


const MessageScreen = (): React.JSX.Element => {

  const { loading, messages } = useGetMessages();
  useListenMessages();
  const { auth } = useAuthContext()!;
  const lastMessageRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"})
    }, 100);
  }, [messages])

  return (
    <div className="messages flex flex-col gap-4 flex-grow overflow-y-scroll">
      {!loading 
        && messages != undefined
        && messages?.length > 0
        && messages?.map((message) => {
          const fromMe = auth?.id === message.senderId;
          const chatClassname = fromMe ? 'justify-end' : 'justify-start';
          const borderClassname = fromMe ? "rounded-bl-3xl" : "rounded-br-3xl";

          return (
            <div key={message?.messageId} ref={lastMessageRef} className={`flex ${chatClassname}`}>
              <div className={`bg-[--blue-secondary] w-fit max-w-[80%] h-auto text-sm p-3 flex justify-center items-center flex-wrap right-0 rounded-tl-3xl rounded-tr-3xl ${borderClassname} break-words whitespace-normal`}>
                {message.body}
              </div>
            </div>
          )
        })
      }

      {loading && <div className="w-full h-full flex items-center justify-center"><Loader className="animate-spin" /></div>}
      {!loading && (messages?.length == 0 || messages == undefined) && (
        <p className="text-gray-600 text-sm text-center">Send a message to start conversation</p>
      )}
    </div>
  );
}

export default MessageScreen