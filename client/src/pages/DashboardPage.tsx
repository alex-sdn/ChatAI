
const DashboardPage = () => {
  return (
    <div className="max-w-full">
      <h1 className="font-semibold text-3xl text-center">
        What can I help with?
      </h1>
      <div className="max-w-full w-[740px]">
        <form className="mt-[20px] mx-[16px] pb-[30px] pt-[8px] px-[16px] bg-[#333333] rounded-[14px]">
          <textarea
            name="prompt"
            placeholder="Ask anything..."
            className="w-full resize-none overflow-hidden focus:outline-none"
            rows={1}
            onInput={(e) => {
              e.currentTarget.style.height = 'auto';
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />
        </form>
      </div>
    </div>
  )
}

export default DashboardPage