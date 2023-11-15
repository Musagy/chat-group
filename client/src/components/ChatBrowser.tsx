import { ChatInfo } from "../models/ChatInfo"
import { Pageable } from "../models/Pageable"
import { SearchIcon } from "../assets/icons"
import { useParams } from "react-router-dom"
import ChatItem from "./ChatItem"
import { PaginatedList } from "./InfiniteList"

interface Props {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  pages: Pageable<ChatInfo>[]
  chatHandler: (chat: ChatInfo) => void
  isFetching: boolean
  fetchNextPage: () => void
}

function ChatBrowser({
  search,
  setSearch,
  pages,
  chatHandler,
  isFetching,
  fetchNextPage,
}: Props) {
  const { chatId } = useParams()
  const loaderOnView = (inView: boolean) => {
    console.log("isFetching: " + isFetching)
    console.log("inView: " + inView)
    if (!isFetching && inView) {
      console.log("cargando post")
      fetchNextPage()
    }
  }
  return (
    <main className="bg-[#33f0] flex flex-col gap-5 px-0 max-h-[calc(100vh-135px)] h-full">
      <label
        htmlFor="search"
        className="flex gap-3 mx-4 bg-msg_input items-center px-3 max-h-12 h-full rounded-lg"
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
      <PaginatedList
        itemRender={(chat: ChatInfo) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            chatHandler={chatHandler}
            isSelected={chatId !== undefined && +chatId == chat.id}
          />
        )}
        loaderOnView={loaderOnView}
        pages={pages}
      />
    </main>
  )
}
export default ChatBrowser
