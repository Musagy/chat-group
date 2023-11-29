import { useEffect, useState } from "react"
import { ChatInfo } from "../models/ChatInfo"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import AsideFooter from "../components/AsideFooter"
import AsidePrincipal from "../components/AsidePrincipal"
import Modal from "../components/Modal"
import { useMutation } from "@tanstack/react-query"
import { getChatById } from "../api/chatRequests"
import AsideChatInfo from "../components/AsideChatInfo"
import { CancelIcon, MenuIcon } from "../assets/icons"

const Layout = () => {
  const { chatId } = useParams() as { chatId: number | undefined }
  const [isOpenChatInfoAside, setIsOpenChatInfoAside] = useState(true)
  const [isOpenAside, setIsOpenAside] = useState(false)
  const navigate = useNavigate()

  const chatHandler = (chat: ChatInfo) => {
    if (chatId == chat.id) {
      setIsOpenChatInfoAside(true)
    } else {
      navigate("/chat/" + chat.id)
    }
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
    if (chatId) {
      mutate(chatId)
      setIsOpenChatInfoAside(true)
      setIsOpenAside(false)
    } else {
      setIsOpenChatInfoAside(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId])

  return (
    <>
      <aside
        className={
          "bg-aside_bg absolute md:relative grid grid-rows-[1fr_75px] h-screen w-[calc(100vw-4rem)] md:w-full " +
          (!isOpenAside && "-translate-x-[calc(100vw-4rem)] md:translate-x-0")
        }
      >
        <AsidePrincipal chatHandler={chatHandler} />
        {status === "success" && (
          <AsideChatInfo
            chatInfo={data}
            isOpen={isOpenChatInfoAside}
            setIsOpen={setIsOpenChatInfoAside}
          />
        )}
        <AsideFooter />
      </aside>
      <button
        className="md:hidden inline absolute w-7 p-1 right-5 top-4 bg-aside_bg rounded-md "
        onClick={() => setIsOpenAside(prev => !prev)}
      >
        {!isOpenAside ? <MenuIcon /> : <CancelIcon />}
      </button>
      <main className="bg-chat_bg grid grid-rows-[auto_1fr]">
        <Outlet context={{ chatInfo: data }} />
      </main>
      <Modal />
    </>
  )
}

export default Layout
