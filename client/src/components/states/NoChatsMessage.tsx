import CreateChatBtn from "../CreateChatBtn"

const NoChatsMessage = () => (
  <div className="h-full flex flex-col gap-6 justify-center items-center">
    <h1 className="text-center text-2xl max-w-[170px] text-white font-bold">
      No tienes chats.... ¡Aún!
    </h1>
    <CreateChatBtn title />
  </div>
)

export default NoChatsMessage
