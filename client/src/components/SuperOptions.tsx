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
        "bg-white absolute right-0 hidden group-hover/member:flex flex-col gap-2 p-2 rounded-lg z-[3] items-center decoration " +
        (!inBottom
          ? "bottom-[60px] hidden decoration-top"
          : "top-[60px] decoration-bottom")
      }
    >
      <Btn
        text="Eliminar miembro"
        className="bg-[#cc4f4f]"
        onClick={deleteMember}
      />
      {requesterRole === "OWNER" && (
        <>
          {member.role === "ADMIN" ? (
            <Btn
              text="Quitar Admin"
              className="bg-msg_input"
              onClick={toggleRole}
            />
          ) : (
            <Btn text="Darle Admin" className="bg-blue" onClick={toggleRole} />
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
    className={className + " unsaturate rounded-md py-0.5 px-2 w-full after"}
    onClick={onClick}
  >
    {text}
  </button>
)

export default SuperOptions
