

import AuthInput from "./AuthInput";
import { Link } from "react-router-dom";
import { useSignInForm } from "../hooks/useSignInForm";
import PasswordInput from "./PasswordInput";

export default function SignInForm() {
  const {  register, handleSubmit, errors, loading, watch  } = useSignInForm();


  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-9 py-15 justify-center items-center ">
     <div className="w-100 h-45">
        <img src="/images/medflow-logo.png" alt="Logo" className="w-full" />
      </div>

      <div className="text-white flex flex-col items-center gap-4 ">
        <p className="text-white text-4xl  font-bold ">Sign In Now!</p>
        <p className="text-white text-[18px]">
          Welcome back! Please enter your details
        </p>
      </div>

      <AuthInput
        label="Email"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        })}
        placeholder="Enter your email"
        error={errors.email?.message}
      />
      <PasswordInput
        label="Password"
        {...register("password", {
          required: "Password is required",
        })}
        placeholder="Enter your password"
        error={errors.password?.message}
      />

      <div className=" w-[80%] ">
        <button
          type="submit"
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 transition-colors duration-800 text-white font-semibold rounded-2xl"
          
        >
            {loading ? "Loading..." : "Sign In"}
        </button>
      </div>

      <div className="text-white text-lg flex gap-2 ">
        Don't have an account?
        <Link to="/auth/sign-up" className="text-cyan-400 underline">
          Sign Up
        </Link>
      </div>
    </form>
  );
}
