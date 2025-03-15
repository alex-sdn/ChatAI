import { useNavigate } from "react-router-dom";
import NewPrompt from "../components/NewPrompt"
import Cookies from "js-cookie";

const DashboardPage = () => {
  const token = Cookies.get("access_token");
  const apiUrl = `${import.meta.env.VITE_API_URL}/chat`

  const navigate = useNavigate();

  const startChat = async (prompt: string) => {
    try {
      const response = await fetch(apiUrl, {
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
        const chatId = data.id;

        navigate(`/chat/${chatId}`, { state: { firstPrompt: prompt } });
      }
    } catch(error) {
      console.log(error);
      // display error
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] max-w-full">
      <h1 className="font-semibold text-3xl text-white text-center mb-5">
        What can I help with?
      </h1>
      <NewPrompt onSubmit={startChat} />
    </div>
  )
}

export default DashboardPage