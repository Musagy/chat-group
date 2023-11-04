import { useParams } from "react-router-dom"
import useChangeTitle from "../hooks/useChangeTitle"
import Layout from "../Layouts/Layout"

const Chat = () => {
  const { chatId } = useParams()
  useChangeTitle("Chat " + chatId)
  return (
    <Layout>
      <h1>hola chat {chatId}</h1>
    </Layout>
  )
}

export default Chat
