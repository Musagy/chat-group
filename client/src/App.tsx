import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import Chat from "./pages/Chat"
import RootLayout from "./Layouts/RootLayout"
import AuthForm from "./Layouts/AuthForm"
import RequireAuth from "./Layouts/RequireAuth"
import { useEffectOnce } from "usehooks-ts"
import { setCredentials } from "./features/auth/authSlice"
import { useDispatch } from "react-redux"
import SignUp from "./pages/SignUp"

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
const Router = () => {
  const dispatch = useDispatch()

  useEffectOnce(() => {
    const auth = localStorage.getItem("auth")
    if (auth) dispatch(setCredentials(JSON.parse(auth)))
  })

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<AuthForm />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="chat/:chatId" element={<Chat />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
