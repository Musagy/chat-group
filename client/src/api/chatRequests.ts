import { ChatInfoWithMemberRole } from "../models/ChatInfo"
import { AddNewMember, CreateChatReq } from "../models/Requests"
import { ChatRole } from "../models/User"
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

export const deleteChat = async (chatId: number) => {
  await fetch(`${API}/chat/${chatId}`, {
    headers: getAuthHeader(),
    method: "DELETE",
  })
}
export const deleteMember = async (memberId: number, chatId: number) => {
  await fetch(`${API}/chat/delete-member`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    method: "DELETE",
    body: JSON.stringify({
      user: memberId,
      chat: chatId,
    }),
  })
}
export const changeRole = async (
  memberId: number,
  chatId: number,
  role: ChatRole
) => {
  await fetch(`${API}/chat/change-role`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    method: "PUT",
    body: JSON.stringify({
      chatUserPK: { user: memberId, chat: chatId },
      role: role,
    }),
  })
}
