import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import eventEmitter from "../utils/eventEmitter";
import ChatGroup from "./ChatGroup";

interface Chat {
  id: number,
  userId: number,
  title: String,
  updatedAt: string
} 

interface Props {
  isSidebarOpen: boolean,
  toggleSidebar: () => void;
  toggleSearch: () => void;
}

export default function Sidebar({ isSidebarOpen, toggleSidebar, toggleSearch }: Props) {
  const token = Cookies.get("access_token");
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const { id } = useParams();

  const [chats, setChats] = useState<Chat[]>([]);
  const [todayChats, setTodayChats] = useState<Chat[]>([]);
  const [yesterdayChats, setYesterdayChats] = useState<Chat[]>([]);
  const [earlierChats, setEarlierChats] = useState<Chat[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

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
        setChats(data.chats);
        setErrorMessage("");
        setShowError(false);
      } else {
        throw new Error(response.status.toString())
      }
    } catch(error) {
      console.log(error);
      setErrorMessage("Failed to fetch chats");
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
    }
  }

  const sortChats = () => {
    const today: Chat[] = [];
    const yesterday: Chat[] = [];
    const earlier: Chat[] = [];


    const now = new Date();
    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(todayDate.getDate() - 1);

    chats.forEach(chat => {
      const chatDate = new Date(chat.updatedAt);

      if (chatDate >= todayDate) {
        today.push(chat);
      } else if (chatDate >= yesterdayDate) {
        yesterday.push(chat);
      } else {
        earlier.push(chat);
      }
    })

    setTodayChats(today);
    setYesterdayChats(yesterday);
    setEarlierChats(earlier);
  }

  useEffect(() => {
    fetchChats();
  }, [id]);

  useEffect(() => {
    sortChats();
  }, [chats]);

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
      w-[256px] text-[15px] transition-transform duration-400 z-48
      ${isSidebarOpen ? "translate-x-0 md:relative" : "-translate-x-full"}`}
    >
      {errorMessage && (
        <div className={`fixed top-5 left-0 right-0 bg-red-500 text-white text-center
          p-2 z-48 mx-5 rounded-[30px] text-[14px] transition-transform duration-250 transform 
          ${showError ? 'translate-y-0' : '-translate-y-20'}`}>
          {errorMessage}
        </div>
      )}
      <div className="flex flex-col h-full w-[256px] min-h-screen">
        <header className="my-[10px] px-[15px]">
          <div className="flex justify-between text-2xl">
            <div>
              <Button onClick={toggleSidebar} tooltip="Close sidebar">sidebar</Button>
            </div>
            <div className="flex">
              <Button onClick={toggleSearch} tooltip="Search chats">search</Button>
              <Button onClick={() => {navigate("/")}} tooltip="New chat">newChat</Button>
            </div>
          </div>
        </header>

        <div className="px-[15px]">
          <h1 className="py-[10px] text-center font-semibold">
            My Chats
          </h1>
          <hr className="border-[#3a3a3a]"/>
        </div>

        <div className="mt-[14px] px-[15px] flex-grow overflow-y-scroll overflow-x-hidden max-h-[calc(100vh-172px)]">
          <ul>
            {chats.length > 0
              ? <>
                  <ChatGroup chats={todayChats} group="Today"/>
                  <ChatGroup chats={yesterdayChats} group="Yesterday"/>
                  <ChatGroup chats={earlierChats} group="Earlier"/>
                </>
              : <p className="text-center opacity-90 italic">No chats found</p>
            }
          </ul>
        </div>

        <footer className="py-[8px] px-[15px]">
          <div 
            className="flex flex-row items-center rounded-[10px] py-1 px-1.5
              hover:cursor-pointer hover:bg-[#1e1e1e]"
            onClick={() => {
              window.open("https://github.com/alex-sdn/ChatAI");
            }}
          >
            <div className="w-9 h-9 flex items-center justify-center rounded-3xl
              mr-[10px] border-[1px] border-[#555555]/[0.6]"
            >
              <img
                src="/github.svg"
                alt="github icon"
                className="filter invert opacity-40 w-[20px]"
              />
            </div>
            <div>
              <p className="text-[14px]">On Github</p>
              <p className="text-[13px] opacity-60">See the code for this project</p>
            </div>
          </div>
        </footer>
      </div>
    </aside>
  )
}
