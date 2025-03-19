import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

interface Chat {
  id: number,
  userId: number,
  title: String,
  updatedAt: string
}

interface Props {
  toggleSearch: () => void;
}

const SearchModal = ({ toggleSearch }: Props) => {
  const token = Cookies.get("access_token");
  const apiUrl = import.meta.env.VITE_API_URL;

  const [chats, setChats] = useState<Chat[]>([]);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

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
      } else {
        throw new Error(response.status.toString())
      }
    } catch(error) {
      console.log(error);
      setErrorMessage("Failed to fetch chats");
    }
  }

  const searchChats = (prompt: string) => {
    const filtered = chats.filter(chat =>
      chat.title.toLowerCase().includes(prompt.toLowerCase())
    );

    setFilteredChats(filtered);
  }

  useEffect(() => {
      fetchChats();
    }, []);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-49"
    >
      <div 
        className="fixed inset-0 bg-black opacity-30 z-49"
        onClick={toggleSearch}
      />
      <div className="bg-[#2f2f2f] max-w-screen w-[660px] mx-[20px] max-h-screen h-[480px]
        z-50 rounded-[14px]"
      >
        <div className="flex flex-row justify-between my-[18px] mx-[26px]">
          <form 
            className="w-full mr-[26px]"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              searchChats(form.search.value);
            }}
          >
            <input 
              name="search"
              placeholder="Search chats..."
              className="w-full focus:outline-none"
            />
          </form>
          <button 
            className="flex justify-center items-center w-[30px] h-[30px]
              rounded-2xl hover:cursor-pointer hover:bg-[#4d4d4d]"
            onClick={toggleSearch}
          >
            <img
              src={"/close.svg"}
              alt="close"
              className="filter invert opacity-50 w-[16px]"
            />
          </button>
        </div>
        <hr className="border-[#424242]"/>

        <div className="flex max-h-[400px]"> 
          <div className="flex flex-col overflow-y-auto my-[6px]">
            <ul>
              {filteredChats.length > 0
                ? filteredChats.map((chat) => (
                    <Link to={`/chat/${chat.id}`} key={chat.id} onClick={toggleSearch}>
                      <li
                        className="mx-[12px] px-[8px] py-[8px] overflow-hidden whitespace-nowrap text-ellipsis
                          hover:cursor-pointer hover:bg-[#424242] rounded-[8px] active:opacity-80"
                      >
                        {chat.title}
                      </li>
                    </Link>
                ))
                : <p className="ml-[22px] py-[9px] text-[#cccccc]">No chats found</p>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchModal