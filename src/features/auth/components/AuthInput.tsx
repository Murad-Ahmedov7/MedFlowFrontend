type Props = {label: string; error?:string;} & React.InputHTMLAttributes<HTMLInputElement>;

export default function AuthInput({label,error, ...props}: Props) {
  return (
    <div className="flex flex-col gap-1 w-[80%]">
      <label className="text-white/90 font-bold">{label}</label>

      <input
      {...props}
        className="px-4 py-3 rounded-lg bg-white/90
      text-black text-base font-medium
      placeholder:text-gray-400 placeholder:text-md
      focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:placeholder:text-transparent shadow-xl border border-white/20 "
      />
         {error && (
        <p className="text-[#ef4444] text-[20px] text-center"> {error}</p>
      )}
    </div>
  );
}
