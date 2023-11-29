import { memo, useState } from "react"
import { DownArrowIcon } from "../assets/icons"
import { User } from "../models/User"
import { useDispatch, useSelector } from "react-redux"
import { logOut, selectCurrentUser } from "../features/auth/authSlice"
import UserItem from "./UserItem"
import { OptionsCtn } from "./SuperOptions"
import { useNavigate } from "react-router-dom"

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
  const [isOpenOptions, setIsOpenOptions] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const randomIndex = Math.floor(Math.random() * gradients.length)

  const logoutFn = () => {
    dispatch(logOut())
    navigate("sign-in")
  }

  const bg = gradients[randomIndex]
  return (
    <footer className="row-start-2 bg-aside_bg bg-opacity-50 h-[75px] w-full flex items-center gap-5 px-4 content-center relative">
      <UserItem
        className={`bg-gradient-to-tr ${bg.from} ${bg.to} ${
          bg.textDark ? "text-chat_bg" : "text-white"
        }`}
        user={user}
      >
        <button
          className="z-[4]"
          onClick={() => {
            setIsOpenOptions(preVal => !preVal)
            console.log(isOpenOptions)
          }}
        >
          <DownArrowIcon className="w-5" />
        </button>
        {isOpenOptions && (
          <OptionsCtn className="after:right-1.5 before:right-1.5 right-1.5 ">
            <button
              className={
                " rounded-md py-0.5 px-2 w-full hover:text-white " +
                "hover:bg-red text-red"
              }
              onClick={logoutFn}
            >
              Log out
            </button>
          </OptionsCtn>
        )}
      </UserItem>
    </footer>
  )
})

export default AsideFooter
