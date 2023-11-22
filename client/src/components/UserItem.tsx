import { ReactNode } from "react"
import { AbstractUser } from "../models/User"
import Pfp from "./Pfp"

interface Props {
  children: ReactNode
  user: AbstractUser
  className: string
}

const UserItem = ({ children, user, className }: Props) => {
  const { username, userAlias } = user
  const name = userAlias || username
  return (
    <>
      <Pfp name={name} className={className} />
      <section className="flex flex-col grow">
        <h2 className="text-white">{name}</h2>
        <p className="text-msg_placeholder text-xs">@{username}</p>
      </section>
      {children}
    </>
  )
}

export default UserItem
