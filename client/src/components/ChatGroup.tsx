import { Link, useParams } from "react-router-dom";

interface Chat {
  id: number,
  userId: number,
  title: String,
  updatedAt: string
}

interface Props {
  chats: Chat[];
  group: string;
}

export default function ChatGroup({ chats, group }: Props) {
  const { id } = useParams();

  return (
    <div>
      {chats.length > 0 && (
        <>
          <p className="px-[8px] mt-[14px] mb-[3px] text-[12px] font-semibold">
            {group}
          </p>
          {chats.map(chat => (
            <Link to={`/chat/${chat.id}`} key={chat.id}>
              <li
                className={`px-[8px] py-[8px] overflow-hidden whitespace-nowrap text-ellipsis
                  hover:cursor-pointer hover:bg-[#202020] rounded-[8px] active:opacity-80
                  ${Number(id) === chat.id ? "bg-[#2f2f2f]" : ""}`}
              >
                {chat.title}
              </li>
            </Link>
          ))}
        </>
      )}
    </div>
  )
}
