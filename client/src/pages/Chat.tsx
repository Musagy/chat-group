import { useOutletContext } from "react-router-dom"
import useChangeTitle from "../hooks/useChangeTitle"
import { ChatInfo } from "../models/ChatInfo"
import Loading, { TextLoading } from "../components/states/Loading"
import useReactQuerySubscription from "../hooks/useReactQuerySubcription"
import { useEffect, useState } from "react"
import MessagesCtn from "../components/MessageCtn"
import CreateMessageInput from "../components/CreateMessageInput"
import { Message } from "../models/Message"

const Chat = () => {
  const { chatInfo } = useOutletContext() as { chatInfo?: ChatInfo }
  useChangeTitle(chatInfo?.title || "Cargando..")
  const [newMessages, setNewMessages] = useState<Message[]>([])

  useEffect(() => {
    setNewMessages([])
  }, [chatInfo])

  const { sendMessage } = useReactQuerySubscription(
    chatInfo?.id || null,
    (newMessage: Message) => {
      setNewMessages(preValue => [newMessage, ...preValue])
    }
  )
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
      <section className="h-full grid grid-rows-[1fr_auto] lg:mx-[4.25rem] mx-[1.25rem] pb-10">
        {chatInfo?.id ? (
          <MessagesCtn chatId={chatInfo.id} newMessages={newMessages} />
        ) : (
          <Loading className="w-24 opacity-50" />
        )}
        <CreateMessageInput sendMessage={sendMessage} />
      </section>
    </>
  )
}

export default Chat
