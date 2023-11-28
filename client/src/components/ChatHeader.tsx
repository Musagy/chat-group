import { useDispatch } from "react-redux"
import { AddMember, DeleteIcon } from "../assets/icons"
import { setModal } from "../features/modal/modalSlice"
import { ChatInfoWithMemberRole } from "../models/ChatInfo"
import { TextLoading } from "./states/Loading"

const ChatHeader = ({ chatInfo }: { chatInfo?: ChatInfoWithMemberRole }) => {
  const btnClasses = "py-0.5 pr-3 pl-2 rounded-md flex items-center gap-1 "
  const dispatch = useDispatch()
  return (
    <header className="bg-chat_bg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] h-[3.75rem] flex items-center lg:px-[4.25rem] px-[1.25rem] justify-between">
      {chatInfo ? (
        <>
          <h1 className="font-bold text-lg text-white">
            {chatInfo.title.toUpperCase()}
          </h1>
          {chatInfo.requesterRole !== "MEMBER" && (
            <section className="flex gap-5 mr-[46px] md:mr-0">
              {chatInfo.requesterRole && (
                <button
                  className={btnClasses + "bg-blue"}
                  onClick={() => dispatch(setModal("addMember"))}
                >
                  <AddMember className="w-5 mb-px -mr-0.5 lg:mr-[1.5px]" />
                  <span className="lg:inline hidden">Añadir Miembro</span>
                </button>
              )}
              {(chatInfo.requesterRole === "OWNER" ||
                chatInfo.requesterRole === null) && (
                <button
                  className={btnClasses + "bg-[#cc4f4f]"}
                  onClick={() => dispatch(setModal("deleteChat"))}
                >
                  <DeleteIcon className="w-5 mb-px -mr-0.5 lg:mr-0" />
                  <span className="lg:inline hidden">Eliminar Chat</span>
                </button>
              )}
            </section>
          )}
        </>
      ) : (
        <TextLoading className="w-48 h-6 bg-msg_placeholder" />
      )}
    </header>
  )
}
export default ChatHeader
