import { Fragment } from "react"
import { ChatInfo } from "../models/ChatInfo"
import { Pageable } from "../models/Pageable"
import { getInitials } from "../utils/formatters"
import { SearchIcon } from "../assets/icons"

interface Props {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  pages: Pageable<ChatInfo>[]
  chatHandler: (chat: ChatInfo) => void
}

function ChatBrowser({ search, setSearch, pages, chatHandler }: Props) {
  return (
    <main className="bg-[#33f0] flex flex-col gap-5 px-0">
      <label
        htmlFor="search"
        className="flex gap-3 mx-4 bg-msg_input items-center p-3 rounded-lg"
      >
        <SearchIcon />
        <input
          type="text"
          id="search"
          className="w-full bg-[#FFF0] outline-none"
          placeholder="Buscar..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </label>
      <ul className="flex flex-col">
        {pages.map((chatsPage: Pageable<ChatInfo>, i) => (
          <Fragment key={i}>
            {chatsPage.content.map(chat => {
              const { title, id } = chat
              const pfpChat = getInitials(title)
              return (
                <li
                  className="py-3 px-4 hover:bg-chat_bg hover:bg-opacity-60 flex items-center gap-3"
                  onClick={() => chatHandler(chat)}
                  key={id}
                >
                  <picture className="row-start-1 row-end-3 bg-chat_bg text-white font-semibold h-[42px] w-[42px] grid place-items-center text-lg rounded-lg">
                    {pfpChat}
                  </picture>
                  <h2>{title.toUpperCase()}</h2>
                </li>
              )
            })}
          </Fragment>
        ))}
      </ul>
    </main>
  )
}
export default ChatBrowser
