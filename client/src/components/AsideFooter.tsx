import { DownArrowIcon } from "../assets/icons"
import { User } from "../models/User"
import { getInitials } from "../utils/formatters"

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
interface Props {
  user: User
}

const AsideFooter = ({ user }: Props) => {
  const { username, userAlias } = user

  const randomIndex = Math.floor(Math.random() * gradients.length)

  const pfp = getInitials(
    username.length === 0 ? username ?? "a" : userAlias ?? "b"
  )

  const bg = gradients[randomIndex]
  return (
    <footer className="bg-aside_bg bg-opacity-50 h-[75px] absolute bottom-[-75px] w-full flex items-center gap-5 px-4 content-center">
      <picture
        className={`row-start-1 row-end-3 bg-gradient-to-tr
            ${bg.from} ${bg.to}
            font-bold h-[42px] w-[42px]
            ${bg.textDark ? "text-chat_bg" : "text-white"}
            grid place-items-center text-2xl rounded-lg 
            `}
      >
        {pfp}
      </picture>
      <section className="flex flex-col grow">
        <h2 className="text-white">{userAlias}</h2>
        <p className="text-msg_placeholder text-xs">@{username}</p>
      </section>
      <DownArrowIcon className="w-5" />
    </footer>
  )
}
export default AsideFooter
