import { memo, useEffect } from "react"
import { DownArrowIcon } from "../assets/icons"
import { User } from "../models/User"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../features/auth/authSlice"
import UserItem from "./UserItem"

const gradients: { from: string; to: string; textDark: boolean }[] = [
  {
    from: "from-[#A1C4FD]",
    to: "to-[#C2E9FB]",
    textDark: true,
  },
  {
    from: "from-[#FFECD2]",
    to: "to-[#FCB69F]",
    textDark: true,
  },
  {
    from: "from-[#09203F]",
    to: "to-[#537895]",
    textDark: false,
  },
  {
    from: "from-[#93A5CF]",
    to: "to-[#E4EfE9]",
    textDark: true,
  },
  {
    from: "from-[#4E65FF]",
    to: "to-[#92EFFD]",
    textDark: true,
  },
  {
    from: "from-[#FF61D2]",
    to: "to-[#FE9090]",
    textDark: true,
  },
  {
    from: "from-[#2E3192]",
    to: "to-[#1BFFFF]",
    textDark: false,
  },
  {
    from: "from-[#D4145A]",
    to: "to-[#FBB03B]",
    textDark: false,
  },
  {
    from: "from-[#009245]",
    to: "to-[#FCEE21]",
    textDark: false,
  },
  {
    from: "from-[#662D8C]",
    to: "to-[#ED1E79]",
    textDark: false,
  },
]

const AsideFooter = memo(function () {
  const user = useSelector(selectCurrentUser) as User

  const randomIndex = Math.floor(Math.random() * gradients.length)

  const bg = gradients[randomIndex]
  useEffect(() => {
    console.log("hola")
  })
  return (
    <footer className="bg-aside_bg bg-opacity-50 h-[75px] bottom-[-75px] w-full flex items-center gap-5 px-4 content-center">
      <UserItem
        className={`bg-gradient-to-tr ${bg.from} ${bg.to} ${
          bg.textDark ? "text-chat_bg" : "text-white"
        }`}
        user={user}
      >
        <DownArrowIcon className="w-5" />
      </UserItem>
    </footer>
  )
})

export default AsideFooter
