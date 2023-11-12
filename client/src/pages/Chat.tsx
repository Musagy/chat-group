import { useOutletContext, useParams } from "react-router-dom"
import useChangeTitle from "../hooks/useChangeTitle"
import { ChatInfo } from "../models/ChatInfo"
import { SendIcon } from "../assets/icons"
import { useEffect } from "react"
import Loading, { TextLoading } from "../components/states/Loading"

function CreateMessageInput() {
  return (
    <label
      htmlFor="msgInput flex-none"
      className="bg-msg_input p-[7px] flex gap-2 rounded-lg"
    >
      <input
        type="text"
        id="msgInput"
        placeholder="Escribe un mensaje aquí..."
        className="bg-[#0000] w-full px-2"
      />
      <button className="bg-blue w-10 h-10 grid place-items-center p-2 rounded-lg">
        <SendIcon className="w-[18px]" />
      </button>
    </label>
  )
}

const Chat = () => {
  const { chatInfo } = useOutletContext() as { chatInfo: ChatInfo }
  const { chatId } = useParams()
  useChangeTitle("Chat " + chatId)
  useEffect(() => {
    console.log(chatInfo)
  }, [chatInfo])
  return (
    <>
      <section className="bg-chat_bg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] h-[3.75rem] flex items-center px-[4.25rem]">
        {chatInfo ? (
          <h1 className="font-bold text-lg text-white">
            {chatInfo.title.toUpperCase()}
          </h1>
        ) : (
          <TextLoading className="w-48 h-6 bg-msg_placeholder" />
        )}
      </section>
      <section className="h-full grid grid-rows-[1fr_auto] mx-[4.25rem] pb-10">
        <Loading className="w-24 opacity-50" />
        <CreateMessageInput />
      </section>
    </>
  )
}

export default Chat
