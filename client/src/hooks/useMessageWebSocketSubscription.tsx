import { useCallback, useEffect, useRef } from "react"
import { APIForWS, getAuthHeader } from "../utils/getItems"
import { CompatClient, Stomp } from "@stomp/stompjs"
import SockJS from "sockjs-client"
import { Message, MsgForSend } from "../models/Message"
import { NavigateFunction } from "react-router-dom"
import { QueryClient } from "@tanstack/react-query"

const onSubscribe = (
  res: { body: string },
  addMessageToList: (message: Message) => void,
  navigate?: NavigateFunction,
  queryClient?: QueryClient
) => {
  const msgContent: Message = JSON.parse(res.body)
  if (msgContent.type === "SEND_MESSAGE") {
    addMessageToList(msgContent)
  } else {
    if (navigate && queryClient) {
      queryClient
        .invalidateQueries({ queryKey: ["chats"] })
        .then(() => navigate("/"))
    }
  }
}

const useMessageWebSocketSubscription = (
  chatId: number | null,
  addMessageToList: (message: Message) => void,
  navigate?: NavigateFunction,
  queryClient?: QueryClient
) => {
  const stompClient = useRef<CompatClient | null>(null)

  const sendMessage = useCallback(
    (message: MsgForSend) => {
      if (!stompClient.current) return

      stompClient.current.send(
        `/send/msgTo/${chatId}`,
        getAuthHeader(),
        JSON.stringify(message)
      )
    },
    [chatId]
  )

  useEffect(() => {
    if (!chatId) return
    const socket = new SockJS(APIForWS)
    stompClient.current = Stomp.over(socket)
    stompClient.current.connect(getAuthHeader(), () => {
      if (!stompClient.current) {
        console.log("No se pudo conectar")
        return
      }

      stompClient.current.subscribe(
        `/topic/${chatId}`,
        res => onSubscribe(res, addMessageToList, navigate, queryClient),
        getAuthHeader()
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId])

  return { sendMessage }
}
export default useMessageWebSocketSubscription
