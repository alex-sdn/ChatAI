
export default function Button({ children }) {
  return (
    <button className="w-9 h-9 flex items-center justify-center rounded-[6px] mx-[5px] hover:cursor-pointer hover:bg-[#3a3a3a]">
      <img
        src={`src/assets/${children}.svg`}
        alt={`{children} icon`}
        className="filter invert opacity-50 w-7 h-7"
      />
    </button>
  )
}
