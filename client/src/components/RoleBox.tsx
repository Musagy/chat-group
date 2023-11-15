import { ChatRole } from "../models/User"

const bgArray: { [T in ChatRole]?: string } = {
  OWNER: "bg-[#6c44ac]",
  ADMIN: "bg-blue",
}

const RoleBox = ({ role }: { role: ChatRole }) =>
  role !== "MEMBER" && (
    <p className={"px-2 rounded-lg " + bgArray[role]}>{role}</p>
  )

export default RoleBox
