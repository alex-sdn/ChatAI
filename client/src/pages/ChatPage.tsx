import { useEffect, useRef } from "react"
import NewPrompt from "../components/NewPrompt"

const messages = [
  {
    "id": 1,
    "chatId": 101,
    "sender": "USER",
    "text": "Hello, how are you?",
    "sentAt": "2025-03-12T10:00:00Z"
  },
  {
    "id": 2,
    "chatId": 101,
    "sender": "AI",
    "text": "I'm doing great! How can I assist you today?",
    "sentAt": "2025-03-12T10:00:02Z"
  },
  {
    "id": 3,
    "chatId": 101,
    "sender": "USER",
    "text": "Can you give me a summary of AI history? Second line of text to test padding.",
    "sentAt": "2025-03-12T10:01:15Z"
  },
  {
    "id": 4,
    "chatId": 101,
    "sender": "AI",
    "text": "Of course! AI history dates back to the 1950s when researchers began developing machine learning algorithms. One of the earliest milestones was the creation of the Turing Test by Alan Turing, which proposed a way to determine whether a machine could exhibit intelligent behavior. Over the years, AI has evolved significantly, from rule-based systems to neural networks and deep learning models that power today's chatbots, self-driving cars, and recommendation systems.",
    "sentAt": "2025-03-12T10:01:20Z"
  },
  {
    "id": 5,
    "chatId": 101,
    "sender": "USER",
    "text": "What are some real-world applications of AI?",
    "sentAt": "2025-03-12T10:02:30Z"
  },
  {
    "id": 6,
    "chatId": 101,
    "sender": "AI",
    "text": "AI is widely used across various industries. In healthcare, AI assists in diagnosing diseases and predicting patient outcomes. In finance, AI-powered algorithms detect fraudulent transactions and provide investment recommendations. E-commerce platforms use AI to personalize user experiences and optimize search results. Autonomous vehicles rely on AI for navigation and decision-making. Additionally, AI is used in customer support chatbots, voice assistants like Siri and Alexa, and even in creative fields like music composition and image generation.",
    "sentAt": "2025-03-12T10:02:35Z"
  },
  {
    "id": 7,
    "chatId": 101,
    "sender": "USER",
    "text": "That’s fascinating! What challenges does AI face today? And here is more text so I can test max width styling!!!",
    "sentAt": "2025-03-12T10:03:10Z"
  },
  {
    "id": 8,
    "chatId": 101,
    "sender": "AI",
    "text": "Great question! Despite its rapid advancements, AI still faces several challenges. One major challenge is bias in AI models, which can result from biased training data. Ethical concerns surrounding AI decision-making and privacy are also significant. Another challenge is explainability—many AI models, especially deep learning ones, are seen as 'black boxes,' making it difficult to understand how they arrive at conclusions. Additionally, AI requires massive computational resources, which can be costly and energy-intensive. Researchers are actively working on addressing these challenges to make AI more reliable, fair, and sustainable.",
    "sentAt": "2025-03-12T10:03:15Z"
  }
]

const ChatPage = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  return (
    <div className="flex flex-col w-full h-[calc(800vh-100px)] overflow-hidden">
      <div className="flex overflow-y-auto justify-center">
        <div className="flex flex-col w-full max-w-[740px] px-[10px] mt-5">
          {messages.map((message) => (
            <p
              key={message.id}
              className={`py-[12px] rounded-[20px] px-[20px]
                ${message.sender === "USER" 
                  ? "bg-[#303030] max-w-[80%] mr-2.5 self-end inline-block" 
                  : "pr-[60px] my-[18px] max-w-full"}
              `}
            >
              {message.text}
            </p>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="flex justify-center mt-auto mb-5">
        <NewPrompt />
      </div>
    </div>
  )
}

export default ChatPage