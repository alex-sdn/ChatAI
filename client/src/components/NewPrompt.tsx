import { useState } from "react";

interface Props {
  onSubmit: (prompt: string) => Promise<void>,
}

export default function NewPrompt({ onSubmit }: Props) {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="max-w-full w-[740px]">
      <form
        className="mx-[16px] pb-[16px] pt-[8px] px-[16px] bg-[#333333] rounded-[14px]"
        onSubmit={(e) => {
          e.preventDefault();
          if (prompt.trim() !== "") {
            onSubmit(prompt);
            setPrompt("");
          }
        }}
      >
        <textarea
          name="prompt"
          value={prompt}
          placeholder="Ask anything..."
          className="w-full resize-none overflow-hidden focus:outline-none"
          rows={1}
          onChange={(e) => setPrompt(e.target.value)}
          onInput={(e) => {
            e.currentTarget.style.height = 'auto';
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (prompt.trim() !== "") {
                onSubmit(prompt);
                setPrompt("");
              }
            }
          }}
        />
        <div className="flex justify-end">
          <button 
            className="w-8 h-8 flex items-center justify-center bg-[#e0e0e0] rounded-2xl
              hover:cursor-pointer hover:bg-[#adadad]"
            onClick={(e) => {
              e.preventDefault();
              if (prompt.trim() !== "") {
                onSubmit(prompt);
                setPrompt("");
              }
            }}
          >
            <img
              src="/send.svg"
              className="w-[22px]"
            />
          </button>
        </div>
      </form>
    </div>
  )
}
