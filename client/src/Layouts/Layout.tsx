import { useState } from "react"
import { ChatInfo } from "../models/ChatInfo"
import { useParams } from "react-router-dom"

type Props = {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  const [chatSelected, setChatSelected] = useState<number>(0)
  const [chatInfo, setChatInfo] = useState<ChatInfo>()
  const { chatId } = useParams()
  // console.log(chatId)

  return (
    <>
      <aside className="bg-aside_bg">
        <section>
          <header>
            <h1 className="text-base text-white">Canales</h1>
            <button>+</button>
          </header>
          <main>
            <label htmlFor="search">
              <p>lupa</p>
              <input type="text" id="search" placeholder="Buscar..." />
            </label>
          </main>
          <footer></footer>
        </section>
        {chatId && (
          <section>
            <header>Chat: {chatId}</header>
            <main></main>
            <footer></footer>
          </section>
        )}
      </aside>
      <main className="bg-chat_bg">{children}</main>
    </>
  )
}

export default Layout
