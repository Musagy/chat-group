import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import Chat from "./pages/Chat"
import RootLayout from "./Layouts/RootLayout"
import AuthForm from "./Layouts/AuthForm"
import RequireAuth from "./Layouts/RequireAuth"
import SignUp from "./pages/SignUp"
import Layout from "./Layouts/Layout"

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
const Router = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<AuthForm />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="chat/:chatId" element={<Chat />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
