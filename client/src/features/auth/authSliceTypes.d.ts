import { User } from "../../models/User"

export type ChatHistory = [string, `/chat/${string}`]

export interface Auth {
  user: User | null
  token: string | null
  isStateInitialized: boolean
  chatsHistory: ChatHistory[] | null
  pfpBgColor: number
}

export interface AuthState {
  auth: Auth
}
