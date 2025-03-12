import NewPrompt from "../components/NewPrompt"

const DashboardPage = () => {
  return (
    <div className="max-w-full">
      <h1 className="font-semibold text-3xl text-center">
        What can I help with?
      </h1>
      <NewPrompt />
    </div>
  )
}

export default DashboardPage