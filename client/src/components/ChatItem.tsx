import { ChatInfo } from "../models/ChatInfo"
import { getInitials } from "../utils/formatters"

interface Props {
  chat: ChatInfo
  chatHandler: (chat: ChatInfo) => void
  isSelected: boolean
}
const ChatItem = ({ chat, chatHandler, isSelected }: Props) => {
  const { title } = chat
  const pfpChat = getInitials(title)
  const pfpClassStyle =
    "row-start-1 row-end-3 font-semibold h-[42px] w-[42px] grid place-items-center text-lg rounded-lg " +
    (isSelected ? "bg-white text-aside_bg" : "bg-chat_bg text-white")

  return (
    <li
      className="py-3 px-4 hover:bg-chat_bg hover:bg-opacity-60 flex items-center gap-3"
      onClick={() => chatHandler(chat)}
    >
      <picture className={pfpClassStyle}>{pfpChat}</picture>
      <h2>{title.toUpperCase()}</h2>
    </li>
  )
}
export default ChatItem
