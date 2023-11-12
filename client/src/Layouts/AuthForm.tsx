import { useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { selectCurrentToken } from "../features/auth/authSlice"
import { useEffectOnce } from "usehooks-ts"

const AuthForm = () => {
  const navigate = useNavigate()
  const token = useSelector(selectCurrentToken)
  const location = useLocation()

  useEffectOnce(() => {
    if (token) {
      const prevPathname = location.state?.from?.pathname || "/"
      navigate(prevPathname)
    }
  })

  return (
    <main
      className="w-full min-h-screen
    flex flex-col justify-center items-center bg-chat_bg gap-2"
    >
      <Outlet />
    </main>
  )
}

export default AuthForm