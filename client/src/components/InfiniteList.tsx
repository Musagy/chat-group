import { Fragment } from "react"
import { Pageable } from "../models/Pageable"
import Loading, { LoadingWithInView } from "./states/Loading"
import { useInfiniteQuery } from "@tanstack/react-query"
import Error from "./states/Error"

interface PaginatedListProps<T> {
  pages: Pageable<T>[]
  itemRender: (item: T, index: number) => React.ReactNode
  loaderOnView: (inView: boolean) => void
}

export function PaginatedList<T>({
  itemRender,
  pages,
  loaderOnView,
}: PaginatedListProps<T>) {
  return (
    <ul className="flex flex-col overflow-y-auto customScroll">
      {pages.map((chatsPage, i) => (
        <Fragment key={i}>
          {chatsPage.content.map(itemRender)}
          {pages.length === i + 1 && !chatsPage.last && (
            <LoadingWithInView
              className="w-20 opacity-50 py-10"
              onView={loaderOnView}
            />
          )}
        </Fragment>
      ))}
    </ul>
  )
}

interface InfiniteQueryListProps<T> {
  queryKey: string[]
  queryFn: (params: { pageParam: number | false }) => Promise<Pageable<T>>
  itemRender: (item: T, index: number) => React.ReactNode
}

export function InfiniteQueryList<T>({
  itemRender,
  queryKey,
  queryFn,
}: InfiniteQueryListProps<T>) {
  const { isFetching, fetchNextPage, data, status, error } = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage: Pageable<T>) =>
      !lastPage.last && lastPage.number + 1,
  })
  const loaderOnView = (inView: boolean) => {
    console.log(queryKey + " -> isFetching: " + isFetching)
    console.log(queryKey + " -> inView: " + inView)
    if (!isFetching && inView) {
      console.log("cargando post")
      fetchNextPage()
    }
  }
  return (
    <>
      {status === "pending" && <Loading className="w-20 opacity-50" />}
      {status === "error" && <Error err={error} />}
      {status === "success" && (
        <PaginatedList
          itemRender={itemRender}
          loaderOnView={loaderOnView}
          pages={data?.pages}
        />
      )}
    </>
  )
}
