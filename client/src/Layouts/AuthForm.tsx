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
      <p className="text-msg_placeholder max-w-[18rem] text-center">
        {location.pathname === "/sign-in" && (
          <>
            Si no te has registrado, hazlo acá:{" "}
            <a
              onClick={() => navigate("/sign-up")}
              className="text-white cursor-pointer"
            >
              Crear cuenta
            </a>
          </>
        )}
        {location.pathname === "/sign-up" && (
          <>
            Si ya tienes cuenta, inicia sección acá:{" "}
            <a
              onClick={() => navigate("/sign-in")}
              className="text-white cursor-pointer"
            >
              Inicio de sección
            </a>
          </>
        )}
      </p>
    </main>
  )
}

export default AuthForm
