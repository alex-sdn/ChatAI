import { Tooltip } from "react-tooltip";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  tooltip: string;
}

export default function Button({ children, onClick, tooltip }: Props) {
  return (
    <>
      <button 
        className={`w-9 h-9 flex items-center justify-center mx-[5px] hover:cursor-pointer hover:bg-[#3a3a3a]
        ${children === "user" ? "rounded-[20px] border-gray-600/[0.6] border-[1px] bg-[#2a2a2a]" : "rounded-[6px]"}`}
        data-tooltip-id={children?.toString()}
      >
        <img
          src={`/${children}.svg`}
          alt={`${children} icon`}
          className={`filter invert opacity-50 ${children === "user" ? "w-5" : "w-[26px]"}`}
          onClick={onClick}
        />
      </button>

      <Tooltip 
        id={children?.toString()}
        place="bottom"
        content={tooltip}
        style={{
          backgroundColor: "#141414",
          fontSize: "14px",
          padding: "12px"
        }}
      />
    </>
  )
}
