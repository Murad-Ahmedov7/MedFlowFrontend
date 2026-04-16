import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

type Props = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function PasswordInput({ label, error, ...props }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-[80%]">
      <label className="text-white/90 font-bold">{label}</label>

      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className="px-4 py-3 w-full rounded-lg bg-white/90
           text-black text-base font-medium
           placeholder:text-gray-400 placeholder:text-md
            focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:placeholder:text-transparent shadow-xl border border-white/20 "
        />
        <span
          className=" absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
          onClick={() => setShow(!show)}
        >
          {show ? <FaRegEye /> : <FaRegEyeSlash />}
        </span>
      </div>
      {error && (
        <p className="text-[#ef4444] text-[20px] text-center"> {error}</p>
      )}
    </div>
  );
}
