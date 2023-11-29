import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"
import {
  loadAuthSaved,
  selectIsStateInitialized,
} from "../features/auth/authSlice"
import { useEffectOnce } from "usehooks-ts"
import { LoadingApp } from "../components/states/Loading"

const RootLayout = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const isStateInitialized = useSelector(selectIsStateInitialized)

  useEffectOnce(() => {
    dispatch(loadAuthSaved())
  })

  return (
    <main
      className={`grid ${
        !pathname.startsWith("/sign") ? "md:grid-cols-[20.25rem_1fr] " : ""
      } min-h-screen max-h-screen h-full`}
    >
      <LoadingApp visible={!isStateInitialized} />
      {isStateInitialized && <Outlet />}
    </main>
  )
}

export default RootLayout
