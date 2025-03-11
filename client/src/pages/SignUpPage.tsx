import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"
import AuthField from "../components/AuthField"

const AuthFormSchema = () => {
  return z.object({
    username: z.string()
               .min(3, "Must contain least 3 characters")
               .max(20, "Must be at most 20 characters"),
    
    password: z.string()
               .min(8, "Must contain at least 8 characters")
               .max(32, "Must contain at most 32 characters")
               .regex(/^[a-zA-Z0-9_-]*$/, 'Can only contain letters, numbers, hyphens and underscores'),
    
    confirmPassword: z.string()
                      .nonempty("Please confirm the password")
  })
}

const SignUpPage = () => {
  const formSchema = AuthFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      // call api
      console.log(`SENDING TO API: ${values.username} / ${values.password} / ${values.confirmPassword}`)
    } catch(error) {
      console.log(error);
      // set error msg for display
    }
  }


  return (
    <div className="bg-[#333333] rounded-[10px] shadow-lg shadow-black/[0.1]">
      
      <form
        onSubmit={form.handleSubmit(onSubmit)} 
        className="justify-items-center px-[39px] py-[10px]"
      >
        <h1 className="font-semibold text-[30px] mb-1 text-white">
          Sign-Up
        </h1>

        <div className="flex flex-col justify-center">
          <AuthField form={form} name="username" label="Username" />
          <AuthField form={form} name="password" label="Password" />
          <AuthField form={form} name="confirmPassword" label="Confirm Password" />

          <button 
            type="submit"
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