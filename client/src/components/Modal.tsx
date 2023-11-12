import { useDispatch, useSelector } from "react-redux"
import { closeModal, selectCurrentModal } from "../features/modal/modalSlice"
import CreateChatModal from "./modals/CreateChatModal"

const Modal = () => {
  const currentModal = useSelector(selectCurrentModal)
  const dispatch = useDispatch()
  const bgHandler = () => {
    dispatch(closeModal())
  }
  return (
    currentModal && (
      <div className="absolute w-full h-full grid place-items-center">
        <div
          onClick={bgHandler}
          className="absolute bg-[rgb(18,15,19)] bg-opacity-50 w-full h-full"
        />
        <div className="absolute bg-aside_bg px-11 py-8 rounded-3xl flex flex-col gap-6 max-w-[36rem] w-full font-bold text-lg">
          {currentModal == "createChat" && <CreateChatModal />}
        </div>
      </div>
    )
  )
}

export default Modal
