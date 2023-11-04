import { User } from "../../models/User"

export interface Auth {
  user: User | null
  token: string | null
}

export interface AuthState {
  auth: Auth
}
