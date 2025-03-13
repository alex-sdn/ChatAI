import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button"
import { Link } from "react-router-dom";

const chats = [
  {
    id: 1,
    title: "Getting Started",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Project Discussion",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // yesterday
  },
  {
    id: 3,
    title: "Code Review",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: 4,
    title: "Debugging Session For Long Title",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    id: 5,
    title: "General Inquiry",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
  },
  {
    id: 6,
    title: "Feature Request",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  },
  {
    id: 7,
    title: "Bug Report",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6 days ago
  },
  {
    id: 8,
    title: "Team Meeting",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
  },
  {
    id: 9,
    title: "Client Feedback",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() // 8 days ago
  },
  {
    id: 10,
    title: "Deployment Issues",
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString() // 9 days ago
  }
]

interface Props {
  isOpen: boolean,
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <aside className={`fixed top-0 left-0 bg-[#171717] min-h-screen max-h-screen
      w-3xs text-[15px] px-[15px] transition-transform duration-400 z-50
      ${isOpen ? "translate-x-0 md:relative" : "-translate-x-full"}`}
    >
      <div className="flex flex-col h-full">
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
