import { Link } from "react-router-dom"

const SignUpPage = () => {
  return (
    <div className="bg-[#333333] rounded-[10px] shadow-lg shadow-black/[0.1]">
      <form className="justify-items-center px-[38px] py-[10px]">
        <h1 className="font-semibold text-[30px] mb-1 text-white">
          Sign-Up
        </h1>

        <div className="flex flex-col">
          <div className="mt-[14px]">
            <p className="font-[500] ml-1 mb-1">
              Username
            </p>
            <input 
              type="text" 
              placeholder=""
              className="border-[1px] rounded-[6px] border-[#555555] px-[8px] py-[3px] focus:outline-none"
            />
          </div>
          <div className="mt-[14px]">
            <p className="font-[500] ml-1 mb-1">
              Password
            </p>
            <input 
              type="password" 
              placeholder=""
              className="border-[1px] rounded-[6px] border-[#555555] px-[8px] py-[3px] focus:outline-none"
            />
          </div>
          <div className="mt-[14px]">
            <p className="font-[500] ml-1 mb-1">
              Confirm password
            </p>
            <input 
              type="password" 
              placeholder=""
              className="border-[1px] rounded-[6px] border-[#555555] px-[8px] py-[3px] focus:outline-none"
            />
          </div>

          <button 
            className="self-center text-white my-[20px] bg-[#555555] w-[100px] py-[4px] 
            rounded-[6px] hover:cursor-pointer hover:bg-[#424242]"
          >
            Submit
          </button>
        </div>

        <div className="flex mt-[6px] pb-[6px]">
          <p className="opacity-90">
            Already have an account?
          </p>
          <Link
            to={"/sign-in"}
            className="ml-1 font-medium hover:underline"
          >
            Sign-in
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUpPage