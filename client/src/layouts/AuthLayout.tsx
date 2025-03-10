import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div>
      <div>
        <p className="text-[200px] font-bold opacity-40 absolute left-1/2 -translate-x-1/2 mt-[150px] select-none">
          ChatAI
        </p>
      </div>
      <div className="relative flex justify-center items-center min-h-screen">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout