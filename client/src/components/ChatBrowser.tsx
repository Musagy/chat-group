import { ChatInfo } from "../models/ChatInfo"
import { Pageable } from "../models/Pageable"
import { SearchIcon } from "../assets/icons"
import { useParams, useSearchParams } from "react-router-dom"
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
  const [, setParams] = useSearchParams()
  const loaderOnView = (inView: boolean) => {
    if (!isFetching && inView) {
      fetchNextPage()
    }
  }
  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value
    setSearch(newSearch)
    setParams(newSearch !== "" ? { search: newSearch } : {})
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
          value={search || ""}
          onChange={changeSearch}
        />
      </label>
      {!pages[0].empty ? (
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
          className="overflow-y-auto customScroll"
          pages={pages}
        />
      ) : (
        <div className="h-full flex flex-col gap-6 justify-center items-center">
          <h1 className="text-center text-2xl max-w-[170px] text-white font-bold">
            No se a encontrado ninguna coincidencia
          </h1>
        </div>
      )}
    </main>
  )
}
export default ChatBrowser
