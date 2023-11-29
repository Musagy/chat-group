import { useRef, useState } from "react"
import { CreateChatReq } from "../../models/Requests"
import { createChanger } from "../../utils/formatters"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNewChat } from "../../api/chatRequests"
import Loading from "../states/Loading"
import { validateFormField } from "../../utils/validater"
import { useDispatch } from "react-redux"
import { closeModal } from "../../features/modal/modalSlice"

function CreateChatModal() {
  const [formData, setFormData] = useState<CreateChatReq>({
    title: "",
    description: "",
  })

  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const submitHandler: React.FormEventHandler = e => {
    e.preventDefault()
    if (validateFormField(formData)) {
      mutate(formData)
      dispatch(closeModal())
    }
  }

  const { description: descChanger, title: titleChanger } = createChanger(
    formData,
    setFormData,
    {
      description: 255,
      title: 50,
    }
  )

  const { mutate, status } = useMutation({
    mutationFn: createNewChat,
    onError: e => alert(e.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] })
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
      <h2>Nuevo Canal</h2>
      <form onSubmit={submitHandler} className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Nombre del Canal"
          className="py-2 px-4 rounded-lg placeholder:text-msg_placeholder bg-msg_input"
          value={formData.title}
          onChange={titleChanger}
          required
        />
        <TextArea
          placeholder="Descripción del Canal"
          value={formData.description}
          onChange={descChanger}
          className="py-2 px-4 rounded-lg placeholder:text-msg_placeholder bg-msg_input"
        />
        <button className="animate bg-blue saturate-0.5 self-end h-10 px-7 rounded-lg">
          Crear
        </button>
      </form>
    </>
  )
}

const TextArea = ({
  value,
  onChange,
  placeholder,
  className,
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "18px"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }

  return (
    <textarea
      ref={textareaRef}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onInput={resize}
      className={className + " resize-none"}
      required
    />
  )
}

export default CreateChatModal
