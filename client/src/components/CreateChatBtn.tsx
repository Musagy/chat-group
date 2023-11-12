import { useDispatch } from "react-redux"
import { PlusIcon } from "../assets/icons"
import { setModal } from "../features/modal/modalSlice"

function CreateChatBtn() {
  const dispatch = useDispatch()
  const btnHandler = () => {
    dispatch(setModal("createChat"))
  }
  return (
    <button
      onClick={btnHandler}
      className="animated w-8 h-8 bg-chat_bg saturate grid place-items-center rounded-lg"
    >
      <PlusIcon />
    </button>
  )
}

export default CreateChatBtn
