import { UseMutateFunction } from "@tanstack/react-query"
import { ChatRole, Member } from "../models/User"
import { ReactNode } from "react"

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
    <OptionsCtn
      inBottom={inBottom}
      className="hidden group-hover/member:flex right-px "
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
    </OptionsCtn>
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
    className={className + " rounded-md py-0.5 px-2 w-full hover:text-white"}
    onClick={onClick}
  >
    {text}
  </button>
)

export const OptionsCtn = ({
  inBottom,
  children,
  className,
}: {
  className?: string
  inBottom?: boolean
  children: ReactNode
}) => {
  return (
    <div
      className={
        (!inBottom
          ? "bottom-[60px] decoration-top"
          : "top-[60px] decoration-bottom") +
        " bg-chat_bg absolute flex-col p-3 rounded-lg z-[3] items-center decoration shadow-[0px_0px_0px_1px_rgba(60,57,63,1)] " +
        className
      }
    >
      {children}
    </div>
  )
}

export default SuperOptions
