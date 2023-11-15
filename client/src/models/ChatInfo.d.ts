import { ChatRole } from "./User"

export interface ChatInfo {
  id: number
  title: string
  description: string
  ownerId: number
}
export interface ChatInfoWithMemberRole extends ChatInfo {
  requesterRole: ChatRole
}
