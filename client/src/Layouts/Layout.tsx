import { useEffect, useState } from "react"
import { ChatInfo } from "../models/ChatInfo"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../features/auth/authSlice"
import { User } from "../models/User"
import AsideFooter from "../components/AsideFooter"
import AsidePrincipal from "../components/AsidePrincipal"
import Modal from "../components/Modal"
import { useMutation } from "@tanstack/react-query"
import { getChatById } from "../api/chatRequests"
import { DownArrowIcon } from "../assets/icons"

function AsideChatInfo({
  chatInfo,
  isOpen,
  setIsOpen,
}: {
  chatInfo: ChatInfo
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { title } = chatInfo
  // const closeAside = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   setIsOpen(false)
  // }
  return (
    <section
      className={
        "px-4 grid grid-rows-[60px_1fr] bg-aside_bg absolute top-0 w-full h-full animated " +
        (!isOpen && "-translate-x-full")
      }
    >
      <header className="flex items-center gap-4 ">
        <button onClick={() => setIsOpen(false)}>
          <DownArrowIcon className="rotate-90 w-6" />
        </button>
        <h2 className="text-lg font-bold">{title}</h2>
      </header>
      <main className="">hola</main>
    </section>
  )
}

const Layout = () => {
  const { chatId } = useParams() as { chatId: number | undefined }
  const [isOpenChatInfoAside, setIsOpenChatInfoAside] = useState(true)
  const navigate = useNavigate()

  const user = useSelector(selectCurrentUser) as User

  const chatHandler = (chat: ChatInfo) => {
    console.log(chatId, chat.id)
    console.log(chatId == chat.id)
    console.log(chatId === chat.id)
    if (chatId == chat.id) {
      setIsOpenChatInfoAside(true)
    } else navigate("/chat/" + chat.id)
  }

  const chatInfoMutable = useMutation({
    mutationFn: getChatById,
    onError: () => {
      alert("No tienes permiso para ingresar a este chat.")
      navigate("/")
    },
  })
  const { status, mutate, data } = chatInfoMutable

  useEffect(() => {
    if (chatId) mutate(chatId)
    console.log(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, mutate])

  return (
    <>
      <aside className="bg-aside_bg relative mb-[75px]">
        <AsidePrincipal chatHandler={chatHandler} />
        {status === "success" && (
          <AsideChatInfo
            chatInfo={data}
            isOpen={isOpenChatInfoAside}
            setIsOpen={setIsOpenChatInfoAside}
          />
        )}
        <AsideFooter user={user} />
      </aside>
      <main className="bg-chat_bg grid grid-rows-[auto_1fr]">
        <Outlet context={{ chatInfo: data }} />
      </main>
      <Modal />
    </>
  )
}

export default Layout
