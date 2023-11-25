import { useNavigate, useOutletContext } from "react-router-dom"
import useChangeTitle from "../hooks/useChangeTitle"
import { ChatInfoWithMemberRole } from "../models/ChatInfo"
import Loading from "../components/states/Loading"
import useReactQuerySubscription from "../hooks/useMessageWebSocketSubscription"
import { useEffect, useState } from "react"
import MessagesCtn from "../components/MessageCtn"
import CreateMessageInput from "../components/CreateMessageInput"
import { Message } from "../models/Message"
import ChatHeader from "../components/ChatHeader"
import { useQueryClient } from "@tanstack/react-query"

const Chat = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { chatInfo } = useOutletContext() as {
    chatInfo?: ChatInfoWithMemberRole
  }
  useChangeTitle(chatInfo?.title || "Cargando..")
  const [newMessages, setNewMessages] = useState<Message[]>([])

  useEffect(() => {
    setNewMessages([])
  }, [chatInfo])

  const { sendMessage } = useReactQuerySubscription(
    chatInfo?.id || null,
    (newMessage: Message) => {
      setNewMessages(preValue => [newMessage, ...preValue])
    },
    navigate,
    queryClient
  )
  return (
    <>
      <ChatHeader chatInfo={chatInfo} />
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
