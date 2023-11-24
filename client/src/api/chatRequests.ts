import { ChatInfoWithMemberRole } from "../models/ChatInfo"
import { AddNewMember, CreateChatReq } from "../models/Requests"
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

export const getChatById = async (
  chatId: number
): Promise<ChatInfoWithMemberRole> => {
  const chat = await fetch(`${API}/chat/${chatId}`, {
    headers: getAuthHeader(),
  }).then(data => data.json())
  return chat
}

export const createNewChat = async (formData: CreateChatReq) => {
  const newChat = await fetch(`${API}/chat/create-chat`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(formData),
    method: "POST",
  }).then(async data => {
    if (data.status === 400) throw new Error(await data.text())
    return data.json()
  })
  return newChat
}

export const getMembersPage = async (
  { pageParam }: { pageParam: number | false },
  chatId: number
) => {
  const chatsPage = await fetch(
    `${API}/chat/get-members/${chatId}?page=${pageParam}`,
    { headers: getAuthHeader() }
  ).then(data => data.json())
  return chatsPage
}

export const addNewMember = async (formData: AddNewMember) => {
  const newChat = await fetch(`${API}/chat/add-member`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(formData),
    method: "POST",
  }).then(async data => {
    if (data.status === 400) throw new Error(await data.text())
    return data.json()
  })
  return newChat
}