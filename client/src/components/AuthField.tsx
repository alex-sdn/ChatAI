
export default function AuthField({ form, name, label }) {
  return (
    <div className="mt-[14px] w-[210px]">
      <p className="font-[500] ml-1 mb-1">
        {label}
      </p>
      <input 
        type={name === "username" ? "text" : "password"}
        {...form.register(name)}
        className="border-[1px] rounded-[6px] border-[#555555] px-[8px] py-[3px] focus:outline-none w-full"
      />
      {form.formState.errors[name] && (
        <p className="text-red-400 text-[12px] mt-1 ml-1 resize-none overflow-hidden">
          {form.formState.errors[name].message}
        </p>
      )}
    </div>
  )
}
