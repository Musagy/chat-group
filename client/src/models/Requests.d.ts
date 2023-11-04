import { User } from "./User"

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
