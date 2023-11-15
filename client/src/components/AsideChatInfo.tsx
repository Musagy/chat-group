import { DownArrowIcon } from "../assets/icons"
import { ChatInfoWithMemberRole } from "../models/ChatInfo"
import { getMembersPage } from "../api/chatRequests"
import { Member } from "../models/User"
import { InfiniteQueryList } from "./InfiniteList"
import UserItem from "./UserItem"
import RoleBox from "./RoleBox"

interface Props {
  chatInfo: ChatInfoWithMemberRole
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AsideChatInfo({ chatInfo, isOpen, setIsOpen }: Props) {
  const { title, description, id, requesterRole } = chatInfo
  return (
    <section
      className={
        "row-start-1 row-end-2 px-4 grid grid-rows-[60px_1fr] bg-aside_bg absolute top-0 w-full h-full " +
        (!isOpen && "-translate-x-full")
      }
    >
      <header className="flex items-center gap-4 ">
        <button onClick={() => setIsOpen(false)}>
          <DownArrowIcon className="rotate-90 w-6" />
        </button>
        <p className="text-lg font-bold">Todos los Canales</p>
      </header>
      <main className="max-h-[135px] h-full flex flex-col gap-9 mt-5">
        <section className="flex flex-col gap-3">
          <h2 className="font-bold text-lg">{title.toUpperCase()}</h2>
          <p className="text-lg">
            <span className="font-bold text-msg_placeholder">
              Descripción:{" "}
            </span>
            {description}
          </p>
          {requesterRole != "MEMBER" && (
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg text-msg_placeholder">Rol:</p>
              <RoleBox role={requesterRole} />
            </div>
          )}
        </section>
        <section>
          <p className="font-bold text-lg mb-5">MIEMBROS</p>
          <InfiniteQueryList
            queryKey={["member", id.toString()]}
            queryFn={e => getMembersPage(e, id)}
            itemRender={(member: Member) => (
              <li className="bg-aside_bg bg-opacity-50 h-[60px] bottom-[-75px] w-full flex items-center gap-5  content-center">
                <UserItem
                  key={member.id}
                  user={member}
                  className="bg-chat_bg text-white"
                >
                  <RoleBox role={member.role} />
                </UserItem>
              </li>
            )}
          />
        </section>
      </main>
    </section>
  )
}
