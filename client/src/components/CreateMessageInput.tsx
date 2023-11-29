import { useState } from "react"
import { MsgForSend } from "../models/Message"
import { SendIcon } from "../assets/icons"

interface Props {
  sendMessage: (message: MsgForSend) => void
  disable: boolean
}

export default function CreateMessageInput({ sendMessage, disable }: Props) {
  const [msgContent, setMsgContent] = useState("")
  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMsgContent(e.target.value)

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (msgContent !== "") {
      sendMessage({ content: msgContent, type: "SEND_MESSAGE" })
      setMsgContent("")
    }
  }

  return (
    <form
      onSubmit={formHandler}
      className="bg-msg_input p-[7px] flex gap-2 rounded-lg relative overflow-hidden"
    >
      {disable && (
        <div className="bg-aside_bg bg-opacity-70 w-full h-full absolute top-0 left-0" />
      )}
      <input
        value={msgContent}
        onChange={inputOnChange}
        placeholder="Escribe un mensaje aquí..."
        className="bg-[#0000] w-full px-2"
      />
      <button className="bg-blue w-10 h-10 grid place-items-center p-2 rounded-lg">
        <SendIcon className="w-[18px]" />
      </button>
    </form>
  )
}
