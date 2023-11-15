export type Role = "USER" | "ADMIN"

export type ChatRole = "MEMBER" | "ADMIN" | "OWNER"

interface AbstractUser {
  id: number
  username: string
  userAlias: string
}

export interface User extends AbstractUser {
  role: Role
}
export interface Member extends AbstractUser {
  role: ChatRole
}
