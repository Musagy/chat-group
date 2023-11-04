import { Outlet, useLocation } from "react-router-dom"

const RootLayout = () => {
  const { pathname } = useLocation()
  return (
    <main
      className={`grid ${
        !pathname.startsWith("/sign") ? "grid-cols-[20.25rem_1fr] " : ""
      } min-h-screen`}
    >
      <Outlet />
    </main>
  )
}

export default RootLayout
