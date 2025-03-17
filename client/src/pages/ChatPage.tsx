import { useEffect, useRef, useState } from "react"
import NewPrompt from "../components/NewPrompt"
import Cookies from "js-cookie"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Markdown from "react-markdown";
import eventEmitter from "../utils/eventEmitter";

interface Message {
  sender: "USER" | "AI",
  text: string,
  // sentAt: string
}

const ChatPage = () => {
  const token = Cookies.get("access_token");
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${apiUrl}/chat/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        const data = await response.json();
        
        setMessages(data.history.messages.map((msg: any) => ({
          sender: msg.sender,
          text: msg.text
        })));
      } else {
        navigate("/", { replace: true });
      }
    } catch(error) {
      console.log(error);
      // display error
    }
  };

  const sendMessage = async (prompt: string) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "USER",
        text: prompt,
        // sentAt: new Date().toISOString()
      }
    ]);

    setIsLoading(true);
    
    try {
      const response = await fetch(`${apiUrl}/chat/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          message: prompt
        })
      })

      if (response.status === 201) {
        const data = await response.json();
        const answer = data.response;

        setMessages((prev) => [
          ...prev,
          {
            sender: "AI",
            text: answer,
            // sentAt: new Date().toISOString()
          }
        ]);
      }
    } catch(error) {
      console.log(error);
      // display error
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const initChatPage = async () => {
      const sentFirstPrompt = sessionStorage.getItem(`sentFirstPrompt-${id}`);
  
      if (location.state?.firstPrompt && !sentFirstPrompt) {
        await sendMessage(location.state?.firstPrompt);
        sessionStorage.setItem(`sentFirstPrompt-${id}`, "true");
        eventEmitter.emit("sentFirstPrompt");
      } else {
        fetchMessages();
      }
    }

    initChatPage();
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col w-full h-[calc(800vh-100px)] overflow-hidden">
      <div className="flex overflow-y-auto justify-center pb-10">
        <div className="flex flex-col w-full max-w-[740px] px-[10px] mt-5">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`py-[12px] rounded-[20px] px-[20px]
                ${message.sender === "USER" 
                  ? "bg-[#303030] max-w-[80%] mr-2.5 self-end inline-block" 
                  : "pr-[60px] my-[18px] max-w-full"}
              `}
            >
              {message.sender === "USER"
                ? <p>{message.text}</p>
                : <Markdown
                    children={message.text}
                    components={{
                      code(props) {
                        const {children, className, node, ...rest} = props
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                          <pre className="my-3 bg-[#1e1e1e] px-1 py-[0.1px] rounded-[8px]">
                            <SyntaxHighlighter
                              PreTag="pre"
                              children={String(children).replace(/\n$/, '')}
                              language={match[1]}
                              style={vscDarkPlus}
                            />
                          </pre>
                        ) : (
                          <code {...rest} className={className}>
                            {children}
                          </code>
                        )
                      }
                    }}
                  />
              }
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center my-4">
              <img
                src="/loader.svg"
                alt="loader"
                className="filter invert opacity-50 w-9 animate-spin"
              />
            </div>
          )}
          <div ref={messagesEndRef} className="pt-1" />
        </div>
      </div>
      <div className="flex justify-center mt-auto mb-5">
        <NewPrompt onSubmit={sendMessage} />
      </div>
    </div>
  )
}

export default ChatPage