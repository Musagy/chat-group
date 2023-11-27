import { useInfiniteQuery } from "@tanstack/react-query"
import Error from "./states/Error"
import Loading from "./states/Loading"
import { PaginatedList } from "./InfiniteList"
import { Message as MessageType } from "../models/Message"
import Message from "./Message"
import { useMemo } from "react"
import { getMessagesPage } from "../api/messageRequest"

interface Props {
  chatId: number
  newMessages: MessageType[]
}
const MessagesCtn = ({ chatId, newMessages }: Props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const connectionTime: Date = useMemo(() => new Date(), [chatId])

  const { data, error, status, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["message", chatId],
    queryFn: e => getMessagesPage(e, chatId, connectionTime),
    initialPageParam: 0,
    getNextPageParam: lastPage => !lastPage.last && lastPage.number + 1,
  })

  const loaderOnView = (inView: boolean) => {
    if (!isFetching && inView) fetchNextPage()
  }

  return (
    <>
      {status === "pending" && <Loading className="w-24 opacity-50" />}
      {status === "error" && <Error err={error} />}
      {status === "success" && (
        <PaginatedList
          className="flex-col-reverse max-h-[calc(100vh-40px-60px-54px)] py-5 gap-9 pr-4 customScroll-2"
          itemRender={(message: MessageType) => (
            <Message key={message.id} message={message} />
          )}
          loaderOnView={loaderOnView}
          pages={data?.pages}
          newItems={newMessages}
        />
      )}
    </>
  )
}
export default MessagesCtn
