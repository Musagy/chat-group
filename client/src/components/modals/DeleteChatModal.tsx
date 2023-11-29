import { useMutation } from "@tanstack/react-query"
import Loading from "../states/Loading"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { deleteChat } from "../../api/chatRequests"
import { closeModal } from "../../features/modal/modalSlice"
import useMessageWebSocketSubscription from "../../hooks/useMessageWebSocketSubscription"

const DeleteChatModal = () => {
  const { chatId = 0 } = useParams() as { chatId?: number }
  const dispatch = useDispatch()

  const { sendMessage } = useMessageWebSocketSubscription(chatId, () => {})
  const confirmText = `Eliminar chat de id ${chatId}`
  const [isConfirm, setIsConfirm] = useState<boolean>(false)

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await mutateAsync(chatId)
    sendMessage({ content: "", type: "DISCONNECT_ALL" })
    dispatch(closeModal())
  }

  const { mutateAsync, status } = useMutation({
    mutationFn: deleteChat,
  })
  return (
    <>
      {status === "pending" && (
        <Loading
          className="w-20 opacity-50"
          ctnClassName="absolute h-full bg-aside_bg bg-opacity-30 top-0 left-0"
        />
      )}
      <h2 className="text-white">Eliminar chat</h2>
      <p className="font-medium text-msg_placeholder">
        Para Eliminar un chat por necesitas escribir:
        <br />
        <span className="text-white font-bold bg-chat_bg px-1 rounded-sm select-none">
          {confirmText}
        </span>
      </p>
      <form className="flex flex-col w-full gap-4" onSubmit={formHandler}>
        <label
          htmlFor="confirm"
          className="flex w-full gap-0.5 bg-msg_input py-1 px-3 rounded"
        >
          <input
            id="confirm"
            placeholder="Acá tu confirmación."
            required
            onChange={e => setIsConfirm(e.currentTarget.value === confirmText)}
            className="flex-1 bg-[#0000] font-medium placeholder:text-msg_placeholder"
          />
        </label>
        <span
          className={
            (!isConfirm && "hidden") + " bg-[#3b1313] px-2 py-1 rounded-lg"
          }
        >
          Recuerda que si presionar ENTER, el chat se eliminara permanentemente
        </span>
        <button
          disabled={!isConfirm}
          className="self-end py-1 px-3 rounded-lg bg-[#cc4f4f] text-white disabled:opacity-50"
        >
          Eliminar
        </button>
      </form>
    </>
  )
}

export default DeleteChatModal
