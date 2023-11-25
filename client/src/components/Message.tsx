import { Message } from "../models/Message"
import { ChatRole } from "../models/User"
import Pfp from "./Pfp"
import moment from "moment/min/moment-with-locales"
import "moment/locale/es-us"
// const moment = require("moment")
// require("moment/locale/es-us")

interface Props {
  message: Message
  isYours: boolean
}

const textColorArray: { [T in ChatRole]: string } = {
  OWNER: "text-[#8343e8]",
  ADMIN: "text-blue",
  MEMBER: "text-msg_placeholder",
}
const Message = ({ message, isYours }: Props) => {
  const { userAlias, username, content, sentAt, role } = message
  const name = userAlias || username
  const sentAtDate = new Date(sentAt)
  moment.locale("es")
  const sentAtFormatted = moment(sentAtDate).calendar()

  return (
    <li
      className={
        "w-full flex gap-7 items-start " + (isYours && "flex-row-reverse")
      }
    >
      <Pfp name={name} className="bg-[#1c1b1f]" />
      <section className="flex flex-col gap-1">
        <section
          className={
            "flex gap-3 items-center " + (isYours && "flex-row-reverse")
          }
        >
          <h2 className={"text-lg font-bold " + textColorArray[role]}>
            {name}
          </h2>
          <span className="text-sm font-medium text-msg_placeholder mt-1">
            {sentAtFormatted}
          </span>
        </section>
        <p
          className={"font-medium text-lg w-full " + (isYours && "text-right")}
        >
          {content}
        </p>
      </section>
    </li>
  )
}

export default Message
