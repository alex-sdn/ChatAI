import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import Cookies from "js-cookie";
import AuthField from "../components/AuthField"
import { useState } from "react"

type FormType = "sign-in" | "sign-up"

const AuthFormSchema = (type: FormType) => {
  return z.object({
    username: z.string()
               .min(3, "Must contain least 3 characters")
               .max(20, "Must be at most 20 characters"),
    
    password: z.string()
               .min(8, "Must contain at least 8 characters")
               .max(32, "Must contain at most 32 characters")
               .regex(/^[a-zA-Z0-9_-]*$/, "Can only contain letters, numbers, hyphens and underscores"),
    
    confirmPassword: type === "sign-up"
                      ? z.string().nonempty("Please confirm the password")
                      : z.string().optional()
  })
}

const AuthPage = ({ type }: {type: FormType}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = `${import.meta.env.VITE_API_URL}${type === "sign-up"
                  ? "/auth/signup"
                  : "/auth/signin"}`;
  const navigate = useNavigate();
  const formSchema = AuthFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setErrorMessage("");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          confirmPassword: values.confirmPassword
        }),
      });

      const data = await response.json();

      if (response.status === 201 && data.access_token) {
        Cookies.set("access_token", data.access_token, { 
          expires: 1,
          // secure: true,  // for prod if https
          sameSite: "Strict"
        });

        navigate("/")
      } else {
        setErrorMessage(`Error: ${data.message || "request failed"}`);
      }
    } catch(error) {
      console.log(error);
      setErrorMessage("Error: request failed");
    }
  }

  return (
    <div className="bg-[#333333] rounded-[10px] shadow-lg shadow-black/[0.1]">
      
      <form
        onSubmit={form.handleSubmit(onSubmit)} 
        className="justify-items-center px-[39px] py-[10px]"
      >
        <h1 className="font-semibold text-[30px] mb-1 text-white">
          {type === "sign-up"
            ? "Sign-Up"
            : "Sign-In"
          }
        </h1>

        <div className="flex flex-col justify-center">
          <AuthField form={form} name="username" label="Username" />
          <AuthField form={form} name="password" label="Password" />
          {type === "sign-up"
            ? <AuthField form={form} name="confirmPassword" label="Confirm Password" />
            : ""
          }

          <button 
            type="submit"
            className="self-center text-white mt-[20px] mb-[5px] bg-[#555555] w-[100px] py-[4px] 
            rounded-[6px] hover:cursor-pointer hover:bg-[#424242]"
          >
            Submit
          </button>
        </div>

        {errorMessage && (
          <p className="text-red-400 text-[15px] mt-1 ml-1 resize-none overflow-hidden">
            {errorMessage}
          </p>
        )}

        <hr className="border-[1px] border-white opacity-20 mt-4 w-[200px]" />

        <div className="flex mt-[8px] pb-[6px]">
          <p className="opacity-90">
            {type === "sign-up"
              ? "Already have an account?"
              : "Don't have an account?"
            }
          </p>
          <Link
            to={type === "sign-up" ? "/sign-in" : "/sign-up"} 
            className="ml-1 font-medium hover:underline"
          >
            {type === "sign-up" ? "Sign-in" : "Sign-Up"}
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AuthPage