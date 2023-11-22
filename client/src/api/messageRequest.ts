import { API, getAuthHeader } from "../utils/getItems"

export const getMessagesPage = async (
  { pageParam }: { pageParam: number | false },
  chatId: number,
  since: Date
) => {
  if (chatId === 0) return {}
  const messagesPage = await fetch(
    `${API}/message/get-messages/${chatId}?page=${pageParam}&since=${since.toISOString()}`,
    { headers: getAuthHeader() }
  ).then(data => data.json())
  return messagesPage
}
