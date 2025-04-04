import { Outlet, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import Button from "../components/Button"
import { useState } from "react"
import Sidebar from "../components/Sidebar"
import SearchModal from "../components/SearchModal"

const RootLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/sign-in", { replace: true });
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  }

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  }

  return (
    <div className="flex h-[100dvh]">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        toggleSearch={toggleSearch}
      />

      {isSearchOpen && (
        <SearchModal toggleSearch={toggleSearch} />
      )}

      <div className="flex flex-col w-full min-w-0">
        <header className="flex justify-between py-[12px] px-[22px] border-b-1 border-[#323232]">
          <div className="flex">
            {!isSidebarOpen &&
              <Button onClick={toggleSidebar} tooltip="Open sidebar">sidebar</Button>
            }
            <p className="font-semibold text-[19px] opacity-60 mt-[3px] ml-1">
              ChatAI
            </p>
          </div>
          <Button onClick={handleLogout} tooltip="Logout">user_x</Button>
        </header>

        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout