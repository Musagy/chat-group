import { useDispatch } from "react-redux"
import { PlusIcon } from "../assets/icons"
import { setModal } from "../features/modal/modalSlice"

function CreateChatBtn({ title }: { title?: boolean }) {
  const dispatch = useDispatch()
  const btnHandler = () => {
    dispatch(setModal("createChat"))
  }
  return (
    <button
      onClick={btnHandler}
      className="animated px-2 h-8 bg-chat_bg saturate flex justify-center gap-2 items-center rounded-lg"
    >
      {title && <p>Crear Chat</p>}
      <PlusIcon />
    </button>
  )
}

export default CreateChatBtn
