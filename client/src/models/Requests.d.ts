import { ChatRole, User } from "./User"

// Auth Requests

export interface SignInReq {
  usernameOrEmail: string
  password: string
}
export type Email = `${string}@${string}`

export interface SignUpReq {
  email: Email
  username: string
  password: string
  userAlias: string
}

export interface SignUpAndSignInResponse {
  user: User
  token: string
}

// Chat Requests

export interface CreateChatReq {
  title: string
  description: string
}

export interface AddNewMember {
  username: string
  chatId: number
}

export interface ChangeRole {
  chatUserPK: {
    user: number
    chat: number
  }
  role: ChatRole
}
