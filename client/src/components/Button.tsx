
interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: Props) {
  return (
    <button className={`w-9 h-9 flex items-center justify-center mx-[5px] hover:cursor-pointer hover:bg-[#3a3a3a]
      ${children === "user" ? "rounded-[20px] border-gray-600/[0.6] border-[1px] bg-[#2a2a2a]" : "rounded-[6px]"}`}
    >
      <img
        src={`/${children}.svg`}
        alt={`{children} icon`}
        className={`filter invert opacity-50 ${children === "user" ? "w-5" : "w-7"}`}
        onClick={onClick}
      />
    </button>
  )
}
