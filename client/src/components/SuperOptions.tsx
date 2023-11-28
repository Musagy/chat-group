import { UseMutateFunction } from "@tanstack/react-query"
import { ChatRole, Member } from "../models/User"

const SuperOptions = ({
  member,
  requesterRole,
  inBottom,
  deleteMemberFn,
  toggleRoleFn,
}: {
  member: Member
  requesterRole: ChatRole
  inBottom: boolean
  deleteMemberFn: UseMutateFunction<void, Error, number, unknown>
  toggleRoleFn: UseMutateFunction<
    void,
    Error,
    { memberId: number; role: ChatRole },
    unknown
  >
}) => {
  const deleteMember = () => {
    deleteMemberFn(member.id)
  }
  const toggleRole = () => {
    toggleRoleFn({
      memberId: member.id,
      role: member.role === "ADMIN" ? "MEMBER" : "ADMIN",
    })
  }
  return (
    <div
      className={
        "bg-chat_bg absolute right-px hidden group-hover/member:flex flex-col p-3 rounded-lg z-[3] items-center decoration shadow-[0px_0px_0px_1px_rgba(60,57,63,1)] " +
        (!inBottom
          ? "bottom-[60px] hidden decoration-top"
          : "top-[60px] decoration-bottom")
      }
    >
      <Btn
        text="Eliminar miembro"
        className="hover:bg-red text-red"
        onClick={deleteMember}
      />
      {requesterRole === "OWNER" && (
        <>
          {member.role === "ADMIN" ? (
            <Btn
              text="Quitar Admin"
              className="hover:bg-msg_input text-msg_input"
              onClick={toggleRole}
            />
          ) : (
            <Btn
              text="Darle Admin"
              className="hover:bg-blue text-blue"
              onClick={toggleRole}
            />
          )}
        </>
      )}
    </div>
  )
}

const Btn = ({
  text,
  className,
  onClick,
}: {
  text: string
  className: string
  onClick?: () => void
}) => (
  <button
    className={
      className +
      " unsaturate rounded-md py-0.5 px-2 w-full after hover:text-white"
    }
    onClick={onClick}
  >
    {text}
  </button>
)

export default SuperOptions
