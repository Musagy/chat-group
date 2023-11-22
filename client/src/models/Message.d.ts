import { ChatRole } from "./User"

interface MessageAbstract {
  content: string
}
export interface Message extends MessageAbstract {
  id: number
  role: ChatRole
  sentAt: string
  userAlias: string
  username: string
}
export interface MsgForSend extends MessageAbstract {
  senderId?: number
  date?: Date
}
