import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button"
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import eventEmitter from "../utils/eventEmitter";

interface Chat {
  id: number,
  userId: number,
  title: String,
  updatedAt: string
} 

interface Props {
  isOpen: boolean,
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: Props) {
  const token = Cookies.get("access_token");
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const { id } = useParams();

  const [chats, setChats] = useState<Chat[]>([]);

  const fetchChats = async () => {
    try {
      const response = await fetch(`${apiUrl}/chat/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        const data = await response.json();
        setChats(data.chats)
      }
    } catch(error) {
      console.log(error);
      // display error
    }
  }

  useEffect(() => {
    fetchChats();
  }, [id]);

  useEffect(() => {
    const handleFirstPrompt = () => {
      fetchChats();
    };

    eventEmitter.on("sentFirstPrompt", handleFirstPrompt);

    return () => {
      eventEmitter.off("sentFirstPrompt", handleFirstPrompt);
    }
  }, []);

  return (
    <aside className={`fixed top-0 left-0 bg-[#171717] min-h-screen max-h-screen
      w-[256px] text-[15px] px-[15px] transition-transform duration-400 z-50
      ${isOpen ? "translate-x-0 md:relative" : "-translate-x-full"}`}
    >
      <div className="flex flex-col h-full w-[226px]">
        <header className="my-[10px]">
          <div className="flex justify-between text-2xl">
            <div>
              <Button onClick={toggleSidebar} tooltip="Close sidebar">sidebar</Button>
            </div>
            <div className="flex">
              <Button onClick={() => {}} tooltip="Search chats">search</Button>
              <Button onClick={() => {navigate("/")}} tooltip="New chat">newChat</Button>
            </div>
          </div>
        </header>

        <h1 className="py-[10px] text-center font-semibold">
          My Chats
        </h1>
        <hr className="border-[#3a3a3a]"/>

        <div className="mt-[14px] flex-grow overflow-y-scroll overflow-x-hidden">
          <ul>
            {chats.map(chat => (
              <Link to={`/chat/${chat.id}`}>
                <li 
                  key={chat.id}
                  className={`px-[8px] py-[8px] overflow-hidden whitespace-nowrap text-ellipsis
                    hover:cursor-pointer hover:bg-[#202020] rounded-[8px] active:opacity-80
                    ${Number(id) === chat.id ? "bg-[#2f2f2f]" : ""}  
                  `}
                >
                  {chat.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <footer className="py-[10px]">
          <p className="text-[14px]">Upgrade plan</p>
          <p className="text-[13px] opacity-60">More access to the best models</p>
        </footer>
      </div>
    </aside>
  )
}
