import { useCallback, useEffect, useRef } from "react"
import { APIForWS, getAuthHeader } from "../utils/getItems"
import { CompatClient, Stomp } from "@stomp/stompjs"
import SockJS from "sockjs-client"
import { Message, MsgForSend } from "../models/Message"

const onSubscribe = (
  res: { body: string },
  addMessageToList: (message: Message) => void
) => {
  const msgContent: Message = JSON.parse(res.body)
  console.log("ejecicion")
  addMessageToList(msgContent)
}

const useMessageWebSocketSubscription = (
  chatId: number | null,
  addMessageToList: (message: Message) => void
) => {
  const stompClient = useRef<CompatClient | null>(null)

  const sendMessage = useCallback(
    (message: MsgForSend) => {
      if (stompClient.current) {
        stompClient.current.send(
          `/send/msgTo/${chatId}`,
          getAuthHeader(),
          JSON.stringify(message)
        )
      }
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
        res => onSubscribe(res, addMessageToList),
        getAuthHeader()
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId])

  return { sendMessage }
}
export default useMessageWebSocketSubscription
