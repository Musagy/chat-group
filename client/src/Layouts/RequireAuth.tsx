import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffectOnce } from "usehooks-ts"

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken)
  const navigate = useNavigate()

  useEffectOnce(() => {
    if (!token) navigate("/sign-in")
  })

  return <Outlet />
}

export default RequireAuth
