import { User } from "../../models/User"

export interface Auth {
  user: User | null
  token: string | null
  isStateInitialized: boolean
}

export interface AuthState {
  auth: Auth
}
