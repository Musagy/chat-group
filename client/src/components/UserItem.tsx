import { ReactNode } from "react"
import { AbstractUser } from "../models/User"
import { getInitials } from "../utils/formatters"
interface Props {
  children: ReactNode
  user: AbstractUser
  className: string
}

const UserItem = ({ children, user, className }: Props) => {
  const { username, userAlias } = user
  const name = userAlias || username
  const pfp = getInitials(name)
  return (
    <>
      <picture
        className={`font-bold h-[42px] w-[42px] grid place-items-center text-2xl rounded-lg ${className}`}
      >
        {pfp}
      </picture>
      <section className="flex flex-col grow">
        <h2 className="text-white">{name}</h2>
        <p className="text-msg_placeholder text-xs">@{username}</p>
      </section>
      {children}
    </>
  )
}

export default UserItem
