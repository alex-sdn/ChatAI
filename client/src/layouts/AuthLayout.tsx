import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div>
      <div>
        <p className="text-[120px] lg:text-[200px] font-bold opacity-20 absolute left-1/2 -translate-x-1/2 mt-[100px]
          select-none whitespace-nowrap overflow-hidden max-w-full">
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