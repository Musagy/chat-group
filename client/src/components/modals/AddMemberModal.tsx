import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addNewMember } from "../../api/chatRequests"
import Loading from "../states/Loading"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { closeModal } from "../../features/modal/modalSlice"

const AddMemberModal = () => {
  const { chatId = 0 } = useParams() as { chatId?: number }
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const username = form.get("newMember")?.toString() ?? ""
    mutate({ username: username, chatId: chatId })
    dispatch(closeModal())
  }

  const { mutate, status } = useMutation({
    mutationFn: addNewMember,
    onError: e => alert(e.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member", chatId.toString()] })
    },
  })
  return (
    <>
      {status === "pending" && (
        <Loading
          className="w-20 opacity-50"
          ctnClassName="absolute h-full bg-aside_bg bg-opacity-30 top-0 left-0"
        />
      )}
      <h2 className="text-white">Añadir Miembro</h2>
      <p className="font-medium text-msg_placeholder">
        Para agregar un nuevo miembro tiene que agregar su{" "}
        <span className="text-white font-bold bg-chat_bg px-1 rounded-sm">
          Username
        </span>
        , este es su identificador único. Escriba lo en la siguiente linea.
      </p>
      <form className="flex flex-col w-full gap-4" onSubmit={formHandler}>
        <label
          htmlFor="newMember"
          className="flex w-full gap-0.5 bg-msg_input py-1 px-3 rounded"
        >
          <span className="text-white">@</span>
          <input
            id="newMember"
            placeholder="username"
            required
            className="flex-1 bg-[#0000] font-medium placeholder:text-msg_placeholder"
          />
        </label>
        <button className="self-end py-1 px-3 rounded-lg bg-blue text-white">
          Agregar
        </button>
      </form>
    </>
  )
}

export default AddMemberModal
