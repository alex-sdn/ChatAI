import { useNavigate } from "react-router-dom";
import NewPrompt from "../components/NewPrompt"
import Cookies from "js-cookie";
import { useState } from "react";

const DashboardPage = () => {
  const token = Cookies.get("access_token");
  const apiUrl = `${import.meta.env.VITE_API_URL}/chat`

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

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
      setErrorMessage("Failed to create new chat");
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] max-w-full">
      {errorMessage && (
        <div className={`top-5 left-10 right-10 bg-red-500 text-white text-center
          p-2 z-50 mx-5 rounded-[30px] text-[14px] transition-all duration-200 ease-in-out 
          ${showError ? 'top-5 opacity-100' : '-top-10 opacity-0'}`}>
          {errorMessage}
        </div>
      )}
      <h1 className="font-semibold text-3xl text-white text-center mb-5">
        What can I help with?
      </h1>
      <NewPrompt onSubmit={startChat} />
    </div>
  )
}

export default DashboardPage