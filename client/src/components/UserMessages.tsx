import { PlusCircle, SendHorizonal } from "lucide-react"
import MessageScreen from "./MessageScreen"
import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react"
import useSendMessage from "@/hooks/useSendMessage";


const UserMessages = (): React.JSX.Element => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [message, setUserMessage] = useState("");
  const { sendMessage } = useSendMessage();

  const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
    setUserMessage(ev.target.value);
  }

  const handleSubmit = async (ev: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    if (!message) {
      return;
    }
    await sendMessage(message);
    setUserMessage("");
  }

  return (
    <>
      <MessageScreen />
      <form className="w-full flex gap-5 h-auto items-end bg-[--gray-primary] py-3 px-3 mt-2 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl" action="/">
        <PlusCircle className="text-[--blue-secondary]" />
        <textarea 
          ref={textareaRef} 
          rows={1} 
          className="w-full border-0 bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 resize-none overflow-hidden" 
          placeholder="Message"
          onChange={(ev) => handleChange(ev)}
          value={message}
        />
        <button onClick={(ev) => handleSubmit(ev)}>
          <SendHorizonal className="text-[--blue-secondary]" />
        </button>
      </form>
    </>
  )
}

export default UserMessages