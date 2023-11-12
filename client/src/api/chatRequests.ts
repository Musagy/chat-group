import { ChatInfo } from "../models/ChatInfo"
import { CreateChatReq } from "../models/Requests"
import { API, getAuthHeader } from "../utils/getItems"

export const getChatsPage = async (
  { pageParam }: { pageParam: number },
  search: string
) => {
  const chatsPage = await fetch(
    `${API}/chat/get-chats?page=${pageParam}${
      search ? "&search=" + search : ""
    }`,
    { headers: getAuthHeader() }
  ).then(data => data.json())
  return chatsPage
}

export const getChatById = async (chatId: number): Promise<ChatInfo> => {
  const chat = await fetch(`${API}/chat/${chatId}`, {
    headers: getAuthHeader(),
  }).then(data => data.json())
  return chat
}

export const getCreateChat = async (formData: CreateChatReq) => {
  const chatsPage = await fetch(`${API}/chat/create-chat`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(formData),
    method: "POST",
  }).then(data => data.json())
  return chatsPage
}
