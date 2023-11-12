import { useDispatch, useSelector } from "react-redux"
import {
  logOut,
  selectCurrentToken,
  updateToken,
} from "../features/auth/authSlice"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { tokenValidate } from "../api/authRequest"
import { useEffectOnce } from "usehooks-ts"
// import { useEffectOnce } from "usehooks-ts"

const RequireAuth = () => {
  const location = useLocation()
  const token = useSelector(selectCurrentToken)
  const dispatch = useDispatch()

  const { mutate } = useMutation({
    mutationFn: tokenValidate,
    onError: () => dispatch(logOut()),
    onSuccess: data => {
      dispatch(updateToken(data))
    },
  })
  useEffectOnce(() => mutate())
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" replace state={{ from: location }} />
  )
}

export default RequireAuth
