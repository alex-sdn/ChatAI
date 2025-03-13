import NewPrompt from "../components/NewPrompt"

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] max-w-full">
      <h1 className="font-semibold text-3xl text-white text-center mb-5">
        What can I help with?
      </h1>
      <NewPrompt />
    </div>
  )
}

export default DashboardPage