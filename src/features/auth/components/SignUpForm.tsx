import { Link } from "react-router-dom";
import AuthInput from "./AuthInput";
import { useSignUpForm } from "../hooks/useSignUpForm";
import PasswordInput from "./PasswordInput";

export default function SignUpForm() {
  const { register, handleSubmit, errors, loading, watch } = useSignUpForm();

  const password = watch("password");


  const selectedValue=watch("userRole");

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 py-15 justify-center items-center"
    >
      <div className="w-100 h-45">
        <img src="/images/medflow-logo.png" alt="Logo" className="w-full" />
      </div>

      <div className="text-white flex flex-col items-center gap-4 ">
        <p className="text-white text-4xl  font-bold ">Create an account</p>
        <div className="flex gap-1">
          <p>Already have account?</p>
          <Link to="/auth/sign-in" className="text-cyan-400 underline">
            Sign in
          </Link>
        </div>
      </div>

      <AuthInput
        label="Full Name"
        type="text"
        {...register("fullName", { required: "Full Name is required" })}
        placeholder="Enter your name"
        error={errors.fullName?.message}
      />

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

      <AuthInput
        label="Phone"
        {...register("phone", {
          required: "Phone is required",
        })}
        placeholder="--- -- --- -- --"
        onChange={(e) => {
          let val = e.target.value.replace(/\D/g, ""); // rəqəm olmayanları sil
          if (val.length > 9) val = val.slice(0, 9); // maksimum 9 rəqəm

          let formatted = "";
          if (val.length > 0) formatted = val.slice(0, 3);
          if (val.length > 3) formatted += "-" + val.slice(3, 6);
          if (val.length > 6) formatted += "-" + val.slice(6, 8);
          if (val.length > 7) formatted += "-" + val.slice(7, 9);

          e.target.value = formatted;
        }}
        error={errors.phone?.message}
      />

      <div className="flex flex-col gap-1 w-[80%]">
        <label className="text-white/90 font-bold">Role</label>

        <select
          {...register("userRole", { required: "Role is required" })}
          defaultValue=""
          className="px-4 py-3 rounded-lg bg-white/90
          text-black text-base font-medium
          placeholder:text-gray-400 placeholder:text-md
          focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:placeholder:text-transparent shadow-xl border border-white/20"
        >
          <option value="" disabled>
            Select role
          </option>
          
          <option value="Receptionist">Receptionist</option>
          <option value="Doctor">Doctor</option>
          <option value="Patient">Patient</option>
        </select>


        {errors.userRole && (
          <p className="text-[#ef4444] text-[20px] text-center">
            {errors.userRole.message}
          </p>
        )}
      </div>
      


      <PasswordInput
        label="Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
        })}
        placeholder="Enter your password"
        error={errors.password?.message}
      />

      <PasswordInput
        label="Confirm Password"
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        })}
        placeholder="Confirm password"
        error={errors.confirmPassword?.message}
      />

      <div className="w-[80%] mt-3">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 transition-colors duration-800 text-white font-semibold rounded-2xl"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
}




