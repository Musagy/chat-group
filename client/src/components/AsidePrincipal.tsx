import { ChatInfo } from "../models/ChatInfo"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Pageable } from "../models/Pageable"
import { useDebounce } from "usehooks-ts"
import { getChatsPage } from "../api/chatRequests"
import Loading from "./states/Loading"
import Error from "./states/Error"
import NoChatsMessage from "./states/NoChatsMessage"
import ChatBrowser from "./ChatBrowser"
import CreateChatBtn from "./CreateChatBtn"

interface Props {
  chatHandler: (chat: ChatInfo) => void
}

const AsidePrincipal = ({ chatHandler }: Props) => {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce<string>(search, 1000)

  const { data, error, status, refetch, fetchNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["chats"],
      queryFn: e => getChatsPage(e, search),
      initialPageParam: 0,
      getNextPageParam: lastPage => !lastPage.last && lastPage.number + 1,
    })

  useEffect(() => {
    if (debouncedSearch) {
      refetch()
      console.log("se esta refrescando el chat")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <section className="row-start-1 grid grid-rows-[60px_1fr] max-h-[calc(100vh-75px)]">
      <header className="flex justify-between items-center px-4">
        <h1 className="text-[18px] font-bold text-white">Canales</h1>
        <CreateChatBtn />
      </header>
      {status === "pending" && <Loading className="w-20 opacity-50" />}
      {status === "error" && <Error err={error} />}
      {status === "success" && (
        <>
          {!(data.pages[0] as Pageable<ChatInfo>).empty ? (
            <ChatBrowser
              search={search}
              setSearch={setSearch}
              pages={data.pages}
              chatHandler={chatHandler}
              isFetching={isFetching}
              fetchNextPage={fetchNextPage}
            />
          ) : (
            <NoChatsMessage />
          )}
        </>
      )}
    </section>
  )
}
export default AsidePrincipal
