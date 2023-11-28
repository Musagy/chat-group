import { useSelector } from "react-redux"
import useChangeTitle from "../hooks/useChangeTitle"
import { selectChatsHistory } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { ChatHistory } from "../features/auth/authSliceTypes"

const Home = () => {
  useChangeTitle("Inicio")
  const chatsHistory = useSelector(selectChatsHistory)
  const navigate = useNavigate()
  const preChatHandler = (ch: ChatHistory) => navigate(ch[1])
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-4 max-h-screen overflow-y-auto">
      <h2
        className={
          "text-7xl font-bold text-white tracking-tighter text-center mx-6 " +
          (chatsHistory.length > 0 && "mt-48")
        }
      >
        Chat Grupal
      </h2>
      <p className="text-3xl font-semibold text-[#666070] max-w-[190px] text-center">
        ¡Para todo!
      </p>
      {chatsHistory.length > 0 && (
        <section className="bg-chat_bg flex flex-col px-5 py-3 rounded-2xl shadow-[10px_10px_20px_#1b1a1e,-10px_-10px_20px_#2f2c34] mt-7 gap-5 mb-10">
          <p className="self-center px-4 text-2xl border-b-[3px] border-b-msg_placeholder">
            Recientes
          </p>
          <ul
            className={
              "grid grid-cols-1 min-w-[230px] gap-2 " +
              (chatsHistory.length > 5 ? "lg:grid-cols-2 lg:min-w-[400px]" : "")
            }
          >
            {chatsHistory.map(ch => (
              <li
                key={ch[1]}
                className="text-[#666070] font-bold text-xl hover:opacity-50 cursor-pointer"
                onClick={() => preChatHandler(ch)}
              >
                - {ch[0]}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

export default Home
