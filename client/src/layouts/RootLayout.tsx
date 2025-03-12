import { Outlet, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import Button from "../components/Button"
import { useState } from "react"
import Sidebar from "../components/Sidebar"

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/sign-in", { replace: true });
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>

      <div className="flex flex-col w-full">
        <header className="flex justify-between my-[12px] mx-[22px]">
          <div className="flex">
            {!isOpen && <Button onClick={toggleSidebar}>sidebar</Button>}
            <p className="font-semibold text-[19px] opacity-60 mt-[3px] ml-1">
              ChatAI
            </p>
          </div>
          <Button onClick={handleLogout}>user</Button>
        </header>

        <div className="flex items-center justify-center flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default RootLayout