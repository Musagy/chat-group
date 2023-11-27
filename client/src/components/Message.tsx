import { Message as MessageType } from "../models/Message"
import { ChatRole } from "../models/User"
import Pfp from "./Pfp"
import moment from "moment/min/moment-with-locales"
import "moment/locale/es-us"
import { useWindowSize } from "usehooks-ts"

moment.locale("es")

interface Props {
  message: MessageType
}

const textColorArray: { [T in ChatRole]: string } = {
  OWNER: "text-[#8343e8]",
  ADMIN: "text-blue",
  MEMBER: "text-msg_placeholder",
}
const Message = ({ message }: Props) => {
  const { userAlias, username, content, sentAt, role } = message
  const { width } = useWindowSize()
  const name = userAlias || username
  const sentAtDate = new Date(sentAt)
  const sentAtFormatted = moment(sentAtDate).fromNow()
  const sentAtFormattedSmall = moment(sentAtDate).format("hh:mm")

  // Verificar si han pasado más de 24 horas
  const moreThanADay = moment().diff(sentAtDate, "hours") <= 24

  // Verificar el tamaño de la pantalla
  const isSmallScreen = width < 768

  return (
    <li className="w-full flex md:gap-7 gap-3 items-start">
      <Pfp name={name} className="bg-[#1c1b1f]" />
      <section className="flex flex-col gap-1">
        <section className={"flex gap-3 items-center "}>
          <h2 className={"text-lg font-bold " + textColorArray[role]}>
            {name}
          </h2>
          <span className="text-sm font-medium text-msg_placeholder mt-1">
            {moreThanADay && isSmallScreen
              ? sentAtFormattedSmall
              : sentAtFormatted}
          </span>
        </section>
        <p className={"font-medium text-lg w-full"}>{content}</p>
      </section>
    </li>
  )
}

export default Message
